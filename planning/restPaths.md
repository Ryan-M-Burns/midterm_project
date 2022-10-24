## REST

Browse GET   /restaurants
Read   GET   /restaurants/:id
Edit   POST  /restaurants/:id
Add    POST  /restaurants
Delete POST  /restaurants/:id/delete

addToCart 
take in an item 
item should include user_id, menu_item_id(s) order_id

user checkout
user remove 
user clear
route

route 
post cart/
post cart/delete
post cart/checkout res.redirect
cart info:
price total
food picture_url/quantity + 1

{"infoReceived":
SELECT SUM(price) as item_price, COUNT(*) as item_quantity, menu_item_id FROM cart_items JOIN carts ON cart_id = carts.id WHERE carts.id = 1 GROUP BY menu_item_id;
