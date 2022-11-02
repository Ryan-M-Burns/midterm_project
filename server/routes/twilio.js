require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendOrderPlaced = () => {
  client.messages
  .create(
    {
      body: 'Your omitThePlates order has been placed! Waiting for the restaraunt to confirm',
      from: '++13608452813',
      to: // Insert Phone Number Here
    }
    )
client.messages
  .create(
    {
     body: 'There is a new order! Please prepare!',
     from: '++13608452813',
     to: // Insert Phone Number Here
   }
   )
  .then((message) => console.log(message));
  };

const sendOrderConfirmed = () => {
  client.messages
    .create({
      body: 'The restaurant has received the order and is preparing!',
      from: '++13608452813',
      to: // Insert Phone Number Here
    })
    .then((message) => console.log(message));
};

const sendOrderReady = () => {
  client.messages
    .create({
       body: 'Your omitThePlates order has been placed! Waiting for the restaraunt to confirm',
       from: '++13608452813',
       to: // Insert Phone Number Here
     })
    .then((message) => console.log(message));
};

const sendOrderPickup = () => {
  client.messages
    .create({
       body: 'Your order has been pickup! Thank you for your order and enjoy!',
       from: '++13608452813',
       to: // Insert Phone Number Here
     })
    .then((message) => console.log(message));
};

module.exports = { sendOrderPlaced, sendOrderConfirmed, sendOrderReady, sendOrderPickup}
