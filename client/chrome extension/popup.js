document.addEventListener('DOMContentLoaded', () => {
    let button = document.getElementById('button');
    button.addEventListener('click', verifyUser);
    chrome.runtime.sendMessage( {type: 'loginStatus'} , (response) => {
      if (response.loggedIn) {
        const usernameField = document.getElementById('inputUsername')
        const passwordField = document.getElementById('inputPassword')
        usernameField.style.visibility = "hidden";
        passwordField.style.visibility = "hidden";
      }
    })

})

//verify if username and password exist in database
// if yes, save username and password in an obj in background.js
// if not, inform user to enter valid username and password
function verifyUser() {
  const usernameField = document.getElementById('inputUsername');
  const passwordField = document.getElementById('inputPassword');
  const username = usernameField.value;
  const password = passwordField.value;
  chrome.runtime.sendMessage(
    { type: 'login', username, password },
    function (response) {
      if (response.loggedIn === true) {
        usernameField.style.visibility = 'hidden';
        passwordField.style.visibility = 'hidden';
      }
      //add something for else
    }
  );
}
