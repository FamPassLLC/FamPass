//current webpage
const link = window.location.href;
//service urls we currently work for
const serviceLinks = {
  'https://www.netflix.com/login': true,
}
const hidePasswordLinks = {
  'https://www.netflix.com/browse': true,
}

//if we are currently on a service login page
if (serviceLinks[link]) {
//request data
  chrome.runtime.sendMessage({type: 'requestInfo', service: link}, (response) => {
    //if loggedin, request username/password data
    if (response.loginStatus === true) {
      //going to have to hard code each response as they are different
      if (link.indexOf('netflix') !== -1){
        console.log(response)
        document.getElementById('id_userLoginId').value = response.username;
        document.getElementById('id_password').value = response.password;
        document.getElementsByClassName('login-form')[1].submit();
      }
    }
  })
}

//check if we need to kill tab and reopen same tab
if (hidePasswordLinks[link]) {
chrome.runtime.sendMessage({type: 'hidePassword', link}, (response) => {
})
}
