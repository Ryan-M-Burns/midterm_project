
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
  const $tipArea = $("#custom-tip-box");

  // tip handlers
  $tipArea.hide();
  $('#tip-button1').on('click', addTip(0.1));
  $('#tip-button2').on('click', addTip(0.15));
  $('#tip-button3').on('click', addTip(0.2));
  $('#tip-button4').on('click', toggleTipBox);
  $('#custom-tip').on('keypress', customTip);

  // events go here
  $carousel.on('click', '.scroll-left', leftScroll);
  $carousel.on('click', '.scroll-right', rightScroll);
  $carousel.on('click', '.expand-food', renderPopout);
  $popout.on('click', '.toggle-less', decreaseQuantity);
  $popout.on('click', '.toggle-more', increaseQuantity);
  $popout.on('click', '.add-to-order-button', addToCart);

  //$checkout.on("reset", () => $("#tweet-text").val("").trigger("input"));
  // display change events
  $popout.on('click', '.close', () => $popout.css("visibility", "hidden"));
  $display1.on('click', '.checkout', goToCheckout);
  $header.on('click', '#BTR', goToHome);

});
// research nodemon docs
