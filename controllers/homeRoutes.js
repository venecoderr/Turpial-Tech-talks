import { Router } from 'express'
import { User, Post } from '../models/Index.js'
import { withAuth } from '../utils/auth.js'

export const homeRoutes = Router()

homeRoutes.get('/', async (req, res) => {
  const postData = await Post.findAll({ 
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ]})

  const posts = postData.map((i) => i.get({plain: true}))
  
  res.render('homepage', {
    posts,
    logged_in: req.session.logged_in
  })
})

// homeRoutes.get('/projects/:id', withAuth, async (req, res) => {
//   try {
//     const projectData = await Project.findByPk(req.params.id, { 
//     include: [
//       {
//         model: User,
//         as: 'supervisor',
//         attributes: ['first_name', 'last_name'],
//       },
//       {
//         model: User,
//         as: 'manager',
//         attributes: ['first_name', 'last_name'],
//       },
//       {
//         model: Phase,
//         attributes: ['phase_name'],
//       },
//     ]})

//     const project = projectData.get({ plain: true })

//     res.render('project', {
//       ...project,
//       ...req.session.auth,
//       logged_in: req.session.logged_in
//     })
//   } catch (err) {
//     res.status(500).json(err)
//   }
// })

homeRoutes.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    })

    const user = userData.get({ plain: true })

    const postData = await Post.findAll({
      where: {
        author_id: req.session.user_id
      }, 
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ]})

    const posts = postData.map((i) => i.get({plain: true}))
    
    res.render('profile', {
      ...user,
      posts,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

homeRoutes.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile')
    return
  }else{
    res.render('login')
  }
})

homeRoutes.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile')
    return
  }else{
    res.render('login')
  }
})