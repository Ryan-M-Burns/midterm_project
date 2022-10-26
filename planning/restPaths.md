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


INSERT INTO order_items (order_id, quantity, menu_item_id) SELECT cart_id, quantity, menu_item_id FROM cart_items WHERE cart_items.id =1
INSERT INTO order_items (creation_time, accepted_time, )
INSERT INTO orders (cart_id, note, price) SELECT carts.id, note, price FROM carts WHERE carts.id = 1;

