FamPass

Summary
In this scratch-project, FamPass allows users to share accounts from a centralized website without exposing their real passwords.

How to use
Load the google chrome extension, and connect the DB model to this url "[postgres://ywpebare:hE4WAGTj0qfMUbhdLWW-ysotmzDRduM7@suleiman.db.elephantsql.com:5432/ywpebare](url)"
Start the server, and create a user. From there either create a family or join a family by inputting  family’s unique name and password. Add services by using the plus service icon, etc.

Technologies used: 
React, react-router, react Hooks
Bootstrap
Axios
SQL
Express
Authentication: encoding, b-crypt
Chrome extension


*Bugs to fix/Future optimizations*

Backend
Edit back-end queries to filter through data more specifically before passing to front-end, via POST requests rather than GET requests
Add route to permit addition of members to families of which user is already a member without providing family password and modify frontend accordingly

*Future features*
Session storage to allow the user to remain logged for an extended period of time
App will be able to access more service providers beyond Netflix such as Hulu or Spotify
Add the ability to control how many users are using each service at a time to stop owner from being unable to use their own service
FamilyPage: 
Drop down menu for adding/deleting members within each family
Sidebar component: track and render profile icons for all users in one user account
User to be able to go from page-to-page without needing to refresh after each CRUD operation by allowing for real time updating of information displayed through the use of websockets
ServicesPage:
add/delete service based on which user is sharing said service


