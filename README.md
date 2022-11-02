# Omit The Plates - LHL Midterm Project

## Luke Li and Ryan Burns

Omit The Plates is a food ordering app that we designed to have SPA functionality. We pushed ourselves to produce the best product possible in the time alloted. We did our best to create a thoroughly populated database and strong website functinality such as dynamically rendered menu carousels. This was a challenging undertaking as only one of the two 2 person groups. We also intentionally left the login functionality out of our project since we have already had practice with this in past projects.

Overall we are very happy with our final product and wish we had a bit more time to flush out some of the other functionalities such as map integration, credit card payment authorization, and a restaurant confirmation page in a tablet style design. We had a lot of fun creating the styling and HTML from scratch which gave us an opportunity to dive into the functionality of certain webpage elements that we normally take for granted. Also, the webpage looks pretty good for the dark mode users as well!

## Screenshots

!["Restaurant View"](https://github.com/Ryan-M-Burns/midterm_project/blob/main/public/images/Screenshots/Restaurant%20Home%20Page.png)

!["Dark Mode Restaurant View"](https://github.com/Ryan-M-Burns/midterm_project/blob/main/public/images/Screenshots/Restaurant%20View%20Dark%20Mode.png)

!["Menu Carousels"](https://github.com/Ryan-M-Burns/midterm_project/blob/main/public/images/Screenshots/Menu%20Carousels.png)

!["Order Summary"](https://github.com/Ryan-M-Burns/midterm_project/blob/main/public/images/Screenshots/Order%20Summary.png)

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/login/1`

Twilio functionality is currently disabled. 

###To enable Twilio

1. Uncomment file and Insert phone number into ./server/routes/twilio.js 
2. Uncomment the two lines in ./server/routes/order.js
3. Enter twilio account SID and Auth Token into .env file

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Cookie-Parser 1.4.6
- Express
- Path
- PG
- Sass
- Serve-Favicon
- Twilio

## Dev Dependencies

- nodemon
