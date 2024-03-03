//Imports
import $ from "./utils/jQuery.js"

//Selectors
let logOutBtn = $('#logout')

//Handles logout button
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

//Event listeners
logOutBtn.on('click', logout);
