let username = null;
let password = null;
let hidePassword = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //if popup is trying to login
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
  //when popup.js opens it checks it's logged in status
  if (request.type === 'loginStatus') {
    if (username !== null) {
      sendResponse({loggedIn: true})
    }
    else {
      sendResponse({loggedIn: false})
    }
  }
  //service username/password request from content.js
  if (request.type === 'requestInfo') {
    if (username !== null) {
      fetch('http://localhost:8080/api/services/loginInfoExt', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password, service: request.service})
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
  //if the website should be opened and closed quickly to delete save password prompt from google chrome
  if (request.type === 'hidePassword') {
    if (hidePassword) {
      hidePassword = false; 
      chrome.tabs.remove(sender.tab.id);
      chrome.tabs.create({ url: request.link })
    }
  }
  return true;
});