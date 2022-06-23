# Trailoholic

## Team members:
- Cynthia(Yue) Cheng
- Skylar(Zhuohang) Li

## Update & Progress
itertion2 
**Division of work**
In the second iteration, we finish developing our web app with MongoDB database and using Mapbox API. We develop CRUD modules that contail the main
function of our application.

### Cynthia(Yue) cheng
Use Mapbox API and develope addTrail function. Connect application with database.
#### June17 - June 18
1. Add map on Explore page to show all the locations corresponding to different filter.
2. Add map on trail details to show corresponding location on map.
3. Start AddTrail function, when user input a place name, the location will show on the map.


#### June19
1. Add submit function in AddTrail function.
2. When user input a starting and ending postion, the map will show the best route according to Mapbox API.

#### June20
1. Finish AddTrail function. When user enter a starting and ending postion, the map will add the trail
details into database.

#### June21
1. Add responsive design to AddTrail page.
2. Finalize AddTrail function.

#### June22
1. Fix map bugs and edit home style.
2. Deploy on Heroku.

### Skylar(Zhuohang) Li
Finish Search, Filter function and decorate all pages.
#### June 17 - June 18
1. Search function on Home page and Explore page.
2. Add filter on Explore page to show different results when user clicks different mode of trail.
3. Add search result page with css code.

#### June 20
1. Add to List button dynamically updates.
2. Modify Trails page layout, TrailDetail page and UserList page's CSS and layout.

#### June 21
1. Edit codes according to new data's structure on all pages.

#### June 22
1. Fix bugs on UserList page, TrailDetail page and Trails page.
2. Write README file.

## Navigate Trailoholic
please visit [https://trailoholic-app.herokuapp.com/](https://trailoholic-app.herokuapp.com/)


### Home
- Home page is under construction

### Login / Signup
- User can simply signup an account using the email, or login using the existing social network accounts.


### Explore
- Browse the the trails infomation, all the trails data stored in MongoDB database are shown on the map.
- Click the marked trail position on the map, the information of the trail will pop up.
- Click "view trail details" button to see the details of the trail


### Trail Details
- User can add the trail to user's collection (login required)
- User can view all the detailed information of the trails, including the mode, difficulty, start and end location, 
trail duration, trail distance and detailed instruction of trail from starting to ending point.  


### User Profile (login required)
- User can see the profile
- User can edit the "about me" field in the profile

### User List (login required)
- User can see the collection of trails
- User can edit delete trail from the collection
- User can click "View Trail Details" to see the information of the trail.

### Add Trail
- User can add the custom trails into database. 
- User can select the trail type and difficulty, enter the starting and destination place and then click "Find Trail". 
![AddTrailPage1](/client/public/images/AddTrail_1.png)
- While entering the position, the location will be shown on the map to user. If this trail has been stored in database,the trail detail will be shown. If not, the pop up window will say "No recommended route found. Still save this trail?".
![AddTrailPage1](/client/public/images/AddTrail_2.png)
- If the user clicks "OK", a new trail will be added to the trail database(User can also input the estimated duration and distance).
![AddTrailPage1](/client/public/images/AddTrail_3.png)
- Then it will redirect to this new trail's detail page.
![AddTrailPage1](/client/public/images/AddTrail_4.png)

# Run Trailoholic Locally
Clone this repository to local, and pull from the remote **iteration1**

## Start the Server
### Open a terminal, in the project directory, you can run:

Change the directory to server folder:
### `cd server`

Install the dependencies:
### `npm install`

Run the srver:
### `node server.js`


Open [http://localhost:5000](http://localhost:5000) to view the server in your browser.

some routes you might use:
- http://localhost:5000/api/users
- http://localhost:5000/api/trails


## To Run the Client
### Open another terminal, in the project directory, you can run:

Change the directory to client folder
### `cd client`

Install the dependencies:
### `npm install`

Run the react app:
### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.
