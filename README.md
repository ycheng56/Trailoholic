# Trailoholic

## Team members:
- Cynthia(Yue) Cheng
- Skylar(Zhuohang) Li

## Navigate Trailoholic
please visit [https://trailoholic-app.herokuapp.com/](https://trailoholic-app.herokuapp.com/)

## Demo

[Youtube: Trailoholic Demo](https://www.youtube.com/watch?v=k0raPb8tlRQ)

### Home
- Browse trail collections
- Search trail

### Login / Signup
- User can simply signup an account using the email, or login using the existing social network accounts.


### Explore
- Browse the the trails infomation on the map.
- Click the marker on the map, the route and information of the trail will pop up.
- Click any trail to see the details


### Trail Details
- User can view all the detailed information of the trails, including the mode, difficulty, start and end location, trail duration, trail distance and detailed instruction of trail from starting to ending point. 
- User can add the trail to user's collection (login required)
- User can write review to this trail (login required)

 
### User Profile (login required)
- User can see the profile
- User can edit the "about me" and "nickname" fields in the profile

### User List (login required)
- User can see the collection of trails
- User can edit delete trail from the collection

### Add Trail
- User can post custom trail to the website.
- User can select the trail type and difficulty, enter the starting and destination place and then click "Find Trail". 

- If an mateched trail is available, trail detail will be shown. If not, user can enter the distance and the length of the trail manually.



## Update & Progress
### itertion1
**Division of work**
In the first iteration, we set up the frame of our application. We use dummy data in json file to develop CRUD operations.
### Cynthia(Yue) cheng
Routes, links and basic CRUD operations on both server and client side.

### Zhuohang(Skylar) Li
Overall structure of our web application. Add components and pages.

### itertion2 
**Division of work**
In the second iteration, we finish connecting the server to MongoDB Database, and visualizing the geographic data using the Mapbox API.


### Cynthia(Yue) cheng
Use Mapbox API and develop addTrail function. Connect application with database.
#### June17 - June 18
1. Add map on Explore page to show all the locations of trails.
2. Add map on trail details to show corresponding location on map.
3. Work on adding new trail features. Utilizing the Mapbox Geocoder API, design search inputs that enable users to search place on the map.


#### June19
Add features: when user input the starting point and destination, calling the Mapbox Matching API to find best matched route for this trail.


#### June20
Design a form to submit the new trail infomation to database. 


#### June21
1. Add responsive design to AddTrail page.
2. Finalize AddTrail function.

#### June22
1. Fix map bugs and edit home style.
2. Deploy on Heroku.

#### June23
1. Add search page. Search trails near input place.
2. Add search api and function.

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


### itertion3 

#### June 23
1. Add Search Page.

#### June 24
1. Beautify home page, add responsive design.
2. Add slick to home page.
3. Add map in trail detail page.

#### June 25
1. Add route line on TrailMap
2. Add review panel
3. Beautify user list page

#### June 27
1. Beautify user profile page
2. add user's collection to home page


#### June 28
1. Trouble shooting. Fix bugs.

#### June 29
1. clean code
2. add test


# Run Trailoholic Locally
Clone this repository to local

## Start the Server
### Open a terminal, in the project directory, you can run:

Change the directory to server folder:
### `cd server`

Install the dependencies:
### `npm install`

Run the srver:
### `node server.js`


Open [http://localhost:5000](http://localhost:5000) to view the server in your browser.


## To Run the Client
### Open another terminal, in the project directory, you can run:

Change the directory to client folder
### `cd client`

Install the dependencies:
### `npm install`

Run the react app:
### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.
