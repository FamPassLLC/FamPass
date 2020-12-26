document.addEventListener('DOMContentLoaded', function() {
    let button = document.getElementById('button');
    button.addEventListener('click', verifyUser);

})

//verify if username and password exist in database
    // if yes, save username and password in an obj in background.js
    // if not, inform user to enter valid username and password
function verifyUser() {
    const username = document.getElementById('inputUsername').value;
    const password = document.getElementById('inputPassword').value;
    
    if (username.length && password.length) {
        const payload ={
          "username": username,
          "password": password,
        };
        console.log(payload)
        fetch('http://localhost:8080/api/users/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        })
          .then(res => {
            if (res.status === 200) {
              chrome.runtime.sendMessage({'Content-Type': 'Login', username, password})
            } else {
              const errorMessage = document.createElement('div');
              errorMessage.innerHTML = 'Invalid username and password.';
              document.getElementById('inputPassword').appendChild(errorMessage);  
            }
          });
      };
      
};