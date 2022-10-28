//client interface

// Document ready
$(() => {
  const $body = $('body');
  const $popout = $('.popout-section');
  const $carousel = $('.dynamic-menu');
  const $checkout = $('.order-section');
  const $display1 = $('#display1');
  const $display2 = $('#display2');
  // events go here
  $carousel.on('click', '.scroll-left', leftScroll);
  $carousel.on('click', '.scroll-right', rightScroll);
  $carousel.on('click', '.expand-food', renderPopout);
  $popout.on('click', '.toggle-less', decreaseQuantity);
  $popout.on('click', '.toggle-more', increaseQuantity);
  $popout.on('click', '.add-to-order-button', addToCart);

  // display change events
  $popout.on('click', '.close', () => $popout.css("visibility", "hidden"));
  $display1.on('click', '.checkout', goToCheckout);
  $display2.on('click', '.back-to-homepage', goToHome);

});
// research nodemon docs
