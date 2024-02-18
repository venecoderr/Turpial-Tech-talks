import $ from "./utils/jQuery.js"

const commentBtn = $('.add-comment-btn')
const loggedIn = $('#app').attr('data-logged-in')

const newCommentHandler = async (event) => {
    const commentText = $(event.target).parent().find('#input-comment').val()
    const postToComment = $(event.target).attr('data-post-id')
    const newComment = {
        text: commentText
    }

    if (commentText && loggedIn) {
        const response = await fetch(`api/comments/${postToComment}`, {
          method: 'POST',
          body: JSON.stringify(newComment),
          headers: { 'Content-Type': 'application/json' },
        })
    
        if (response.ok) {
          document.location.reload()
        } else {
          alert(response.statusText)
        }
    }else{
      document.location.replace('/login')
    }
}

commentBtn.on('click', newCommentHandler)