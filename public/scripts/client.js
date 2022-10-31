// client interface

// Document ready
$(() => {
  const $popout = $('.popout-section');
  const $carousel = $('.dynamic-menu');
  const $display1 = $('#display1');
  const $header = $('header');

  // tip handlers
  $("#custom-tip-box").hide();
  $('#tip-button1').on('click', addTip10);
  $('#tip-button2').on('click', addTip15);
  $('#tip-button3').on('click', addTip20);
  $('#tip-button4').on('click', toggleTipBox);
  $('#custom-tip').on('keypress', customTip);

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
  $header.on('click', '#BTR', goToHome);

});
