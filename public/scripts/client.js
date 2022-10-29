
//client interface

// Document ready
$(() => {
  const $body = $('body');
  const $popout = $('.popout-section');
  const $carousel = $('.dynamic-menu');
  const $checkout = $('.order-section');
  const $display1 = $('#display1');
  const $display2 = $('#display2');
  const $header = $('header');
  // events go here
  $carousel.on('click', '.scroll-left', leftScroll);
  $carousel.on('click', '.scroll-right', rightScroll);
  $carousel.on('click', '.expand-food', renderPopout);
  $popout.on('click', '.toggle-less', decreaseQuantity);
  $popout.on('click', '.toggle-more', increaseQuantity);
  $popout.on('click', '.add-to-order-button', addToCart);

  //$checkout.on("reset", () => $("#tweet-text").val("").trigger("input"));
  // display change events
  $('#tip-button4').on('click', toggleTipBox);
  $popout.on('click', '.close', () => $popout.css("visibility", "hidden"));
  $display1.on('click', '.checkout', goToCheckout);
  $header.on('click', '#BTR', goToHome);

});
// research nodemon docs
