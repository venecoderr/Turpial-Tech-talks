import $ from "./utils/jQuery.js"

const newBtn = $('#new-post-btn')
const updateBtn = $('.update-post-btn')
const deleteBtn = $('.delete-post-btn')
const postForm = $('#new-post-form')
const updateForm = $('.update-post-form')

const newPostHandler = async (event) => {
  event.preventDefault()

  const postTitle = $('#post-title').val()
  const postText = $('#post-text-input').val()

  if (postTitle && postText) {
    const newPost = {
      title: postTitle,
      text: postText
    }
    
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      document.location.replace('/')
    } else {
      alert(response.statusText)
    }
  }

}

const updatePostHandler = async (event) => {
  event.preventDefault()

  const updatedPostTitle = $(event.target).find('.updated-post-title').val()
  const updatedPostText = $(event.target).find('.updated-post-text-input').val()
  const postToUpdate = $(event.target).find('.update-it-btn').attr('data-post-id')

  if (updatedPostTitle && updatedPostText) {
    const updatedPost = {
      title: updatedPostTitle,
      text: updatedPostText
    }
    
    const response = await fetch(`/api/posts/${postToUpdate}`, {
      method: 'PUT',
      body: JSON.stringify(updatedPost),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      document.location.replace('/')
    } else {
      alert(response.statusText)
    }
  }

}

const deletePostHandler = async (event) => {
  const postToDelete = $(event.target).attr('data-post-id')

  if (postToDelete) {
    const response = await fetch(`/api/posts/${postToDelete}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      document.location.replace('/')
    } else {
      alert(response.statusText)
    }
  }

}

const toggleNewForm = (event) => {
  $(postForm).toggleClass('d-flex d-none')
  if($(newBtn).text() === 'New Post'){
    $(newBtn).text('Cancel')
  }else{
    $(newBtn).text('New Post')
  }
}

const toggleUpdateForm = (event) => {
  $(event.target).parent().find('.update-post-form').toggleClass('d-flex d-none')
  if($(event.target).text() === 'Update Post'){
    $(event.target).text('Cancel')
    $(event.target).parent().find('.updated-post-text-input').text($(event.target).parent().find('.original-text').text())
  }else{
    $(event.target).text('Update Post')
    $(event.target).parent().find('.updated-post-text-input').text('')
  }
}

newBtn.on('click', toggleNewForm)
updateBtn.on('click', toggleUpdateForm)
deleteBtn.on('click', deletePostHandler)
postForm.on('submit', newPostHandler)
updateForm.on('submit', updatePostHandler)