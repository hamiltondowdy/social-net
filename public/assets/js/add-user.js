// const { response } = require("express");

const $newUserForm = document.querySelector('#new-user-form');

const handleNewUserForm = event => {
  event.preventDefault();

  const username = $newUserForm.querySelector('#username-signup').value;
  const email = $newUserForm.querySelector('#email-signup').value;

  const formData = { username, email };

  fetch('/api/users', {
      method: 'POST',
      headers: {
          Accept: 'application.json',
          'Content-Type': 'application.json'
      },
      body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(postResponse => {
      alert('User created success');
      console.log(postResponse);
  })
  .catch(err => {
      console.log(err);
      saveRecord(formData);
  });

};


$newUserForm.addEventListener('submit', handleNewUserSubmit);
