import $ from "./utils/jQuery.js"

let logInForm = $('#login-form')
let signUpForm = $('#sign-up-form')

const loginFormHandler = async (event) => {
  event.preventDefault()

  const email = $('#email-login').val()
  const password = $('#password-login').val()

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      document.location.replace('/profile')
    } else {
      alert(response.statusText)
    }
  }
}

const signupFormHandler = async (event) => {
  event.preventDefault()

  const username = $('#username-signup').val()
  const email = $('#email-signup').val()
  const password = $('#password-signup').val()

  if (username && email && password) {
    let newUser = {
      username: username,
      email: email,
      password: password,
    }
    
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      document.location.replace('/profile')
    } else {
      alert(response.statusText)
    }
  }
}


logInForm.on('submit', loginFormHandler)
signUpForm.on('submit', signupFormHandler)