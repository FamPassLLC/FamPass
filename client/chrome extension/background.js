let username = null;
let password = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "login") {
    fetch('http://localhost:8080/api/users/signin', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: request.username, password: request.password})
      })
      .then((res) => {
        console.log('hello there')
        if (res.status === 200) {
          sendResponse({loggedIn: true})
          return true;
        }
        else {
          sendResponse({loggedIn: false})
          return true;
        }
      })
  }
  return true;
});