import { Router } from 'express'
import { User, Post, Comment } from '../../models/Index.js'

export const commentRoutes = Router()

commentRoutes.get('/', async (req, res) => {
    //Gets all comments
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
          ]})
  
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
  
commentRoutes.get('/:id', async (req, res) => {
    //Gets one comment by ID
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
          ]})
  
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
  
commentRoutes.post('/:post_id', async (req, res) => {
    // create a new comment
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
  
commentRoutes.put('/:id', async (req, res) => {
    // update a comment's data by its `id` value
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
  
commentRoutes.delete('/:id', async (req, res) => {
    // deletes comment by its `id` value
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