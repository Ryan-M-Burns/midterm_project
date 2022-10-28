//client interface

// Document ready
$(() => {
  const $popout = $('.popout-section');
  const $carousel = $('.dynamic-menu');
  const $checkout = $('.order-section');
  const $header = $('header');
  console.log("alert client");

  // events go here
  $header.on('click', '.back-to-homepage', backToRestaurant);
  $carousel.on('click', '.scroll-left', leftScroll);
  $carousel.on('click', '.scroll-right', rightScroll);
  $carousel.on('click', '.expand-food', renderPopout);
  $popout.on('click', '.toggle-less', decreaseQuantity);
  $popout.on('click', '.toggle-more', increaseQuantity);
  $popout.on('click', '.add-to-order-button', addToCart);
  $popout.on('click', '.close', () => $popout.css("visibility", "hidden"));
  // $checkout.on("click", '.remove-item', deleteItem);
  $checkout.on('submit', checkout);
});
// research nodemon docs
