//Imports API routers and utilities
import { Router } from 'express'
import { User, Post, Comment } from '../../models/Index.js'

//Router instance
export const commentRoutes = Router()

//Gets all comments
commentRoutes.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({ 
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Post,
          attributes: ['title', 'author_id'],
          include: [
            {
              model: User,
              attributes: ['username'],
            }
          ]
        },
      ]
    })
  
    if (!commentData) {
      res.status(404).json({ message: 'No comments found!' })
      return
    }
  
    res.status(200).json(commentData)
  
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})
  
//Gets one comment by ID
commentRoutes.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, { 
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Post,
          attributes: ['title', 'author_id'],
          include: [
            {
              model: User,
              attributes: ['username'],
            }
          ]
        },
      ]
    })

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' })
      return
    }
  
    res.status(200).json(commentData)
  
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

// create a new comment
commentRoutes.post('/:post_id', async (req, res) => {
  try {
    const newcomment = {
      author_id: req.session.user_id,
      ...req.body,
      on_post: req.params.post_id
    }
  
    await Comment.create(newcomment)
    
    res.status(200).json(newcomment)
  
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})
  
// update a comment's data by its `id` value
commentRoutes.put('/:id', async (req, res) => {
  try {
    const updatedcomment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      }
    })
  
    if (!updatedcomment) {
      res.status(404).json({ message: 'No comment found with this id!' })
      return
    }
      
    res.status(200).json(updatedcomment)
  
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }  
})
  
// deletes comment by its `id` value
commentRoutes.delete('/:id', async (req, res) => {
  try {
    const deletedcomment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    })
  
    if (!deletedcomment) {
      res.status(404).json({ message: 'No comment found with this id!' })
      return
    }
  
    res.status(200).json(`${deletedcomment} comment deleted!`)
  
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})