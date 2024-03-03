//Imports for Models, Router and utilities
import { Router } from 'express'
import { User } from '../../models/Index.js'
import { withAuth } from '../../utils/auth.js'

//Router instance
export const userRoutes = Router()

//Gets all users
userRoutes.get('/',  withAuth,  async (req, res) => {

  try {
    const userData = await User.findAll({attributes: {exclude: ['password']}})

    if (!userData) {
      res.status(404).json({ message: 'No users found!' })
      return
    }

    res.status(200).json(userData)

  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

//Gets one user by ID
userRoutes.get('/:id', withAuth, async (req, res) => {

  try {
    const userData = await User.findByPk(req.params.id, {attributes: {exclude: ['password']}})

    if (!userData) {
      res.status(404).json({ message: 'No user found with this ID!' })
      return
    }

    res.status(200).json(userData)

  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

//Creates new user
userRoutes.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body)

    req.session.save(() => {
      req.session.user_id = userData.id
      req.session.logged_in = true
      res.status(200).json(userData)
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

//Logs user in
userRoutes.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } })

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' })
      return
    }

    const validPassword = await userData.checkPassword(req.body.password)

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' })
      return
    }

    req.session.save(() => {
      req.session.user_id = userData.id
      req.session.logged_in = true
      res.json({ user: userData, message: 'You are now logged in!' })
    })

  } catch (err) {
    res.status(500).json(err)
  }
})

//Logs user out
userRoutes.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
})

// update a user's data by its `id` value
userRoutes.put('/:id', withAuth, async (req, res) => {

  try {
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.id,
      }
    })

    if (!updatedUser) {
      res.status(404).json({ message: 'No user found with this id!' })
      return
    }
    
    res.status(200).json(updatedUser)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }  
})

// deletes user by its `id` value
userRoutes.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    })

    if (!deletedUser) {
      res.status(404).json({ message: 'No user found with this id!' })
      return
    }

    res.status(200).json(`${deletedUser} User deleted!`)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})