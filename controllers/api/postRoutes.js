import { Router } from 'express'
import { User, Post, Comment } from '../../models/Index.js'
import { withAuth } from '../../utils/auth.js'

export const postRoutes = Router()

postRoutes.get('/', async (req, res) => {
  //Gets all posts
  try {
    const postData = await Post.findAll({ 
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ]})

    if (!postData) {
      res.status(404).json({ message: 'No posts found!' })
      return
    }

    res.status(200).json(postData)

  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

postRoutes.get('/:id', async (req, res) => {
  //Gets one post by ID
  try {
    const postData = await Post.findByPk(req.params.id, { 
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ]})

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' })
      return
    }

    res.status(200).json(postData)

  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

postRoutes.post('/', withAuth, async (req, res) => {
  // create a new post
  try {
    const newPost = {
        author_id: req.session.user_id,
        ...req.body,
    }

    await Post.create(newPost)

    res.status(200).json(newPost)

  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

postRoutes.put('/:id', withAuth, async (req, res) => {
  // update a post's data by its `id` value
  try {
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
      }
    })

    if (!updatedPost) {
      res.status(404).json({ message: 'No post found with this id!' })
      return
    }
    
    res.status(200).json(updatedPost)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }  
})

postRoutes.delete('/:id', withAuth, async (req, res) => {
  // deletes post by its `id` value
  try {
    const deletedComments = await Comment.destroy({
      where: {
        on_post: req.params.id,
      },
    })
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    })

    if (!deletedPost && deletedComments) {
      res.status(404).json({ message: 'No post found with this id!' })
      return
    }

    res.status(200).json(`${deletedPost} post deleted!`)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
