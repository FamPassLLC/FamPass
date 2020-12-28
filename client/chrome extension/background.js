let username = null;
let password = null;
let hidePassword = false;

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
          username = request.username.toLowerCase()
          password = request.password
          sendResponse({loggedIn: true})
          return true;
        }
        else {
          sendResponse({loggedIn: false})
          return true;
        }
      })
  }
  //login status for popup.js
  if (request.type === 'loginStatus') {
    if (username !== null) {
      sendResponse({loggedIn: true})
    }
    else {
      sendResponse({loggedIn: false})
    }
  }
  //login request from content.js
  if (request.type === 'requestInfo') {
    if (username !== null) {
      fetch('http://localhost:8080/api/services/loginInfoExt', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password})
      })
      .then((data) => {
        data.json()
        .then(res => {
          hidePassword = true;
          sendResponse({loginStatus: true, username: res.username, password: res.password})
        })
      })
    }
    else {
      sendResponse({loginStatus: false})
    }
  }
  if (request.type === 'hidePassword') {
    if (hidePassword) {
      hidePassword = false; 
      chrome.tabs.remove(sender.tab.id);
      chrome.tabs.create({ url: request.link })
    }
  }
  return true;
});