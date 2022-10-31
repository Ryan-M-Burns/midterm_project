// client interface

$(() => {

  $('header').on('click', '#BTR', goToHome);

  const $display1 = $('#display1');
  $display1.on('click', '.checkout', goToCheckout);
  $display1.on('click', '.checkout', renderCheckoutCart);

  const $carousel = $('.dynamic-menu');
  $carousel.on('click', '.scroll-left', leftScroll);
  $carousel.on('click', '.scroll-right', rightScroll);
  $carousel.on('click', '.expand-food', renderPopout);

  const $popout = $('.popout-section');
  $popout.on('click', '.toggle-less', decreaseQuantity);
  $popout.on('click', '.toggle-more', increaseQuantity);
  $popout.on('click', '.add-to-order-button', addToCart);
  $popout.on('click', '.close', () => $popout.css('visibility', 'hidden'));

  const $cart = $('.cart-container');
  $cart.on('click', '.remove-item', deleteCartItem);
  $cart.on('click', '.remove-item', renderCart);

  const $checkout = $('.checkout-cart-container');
  $checkout.on('click', '.remove-item', deleteCheckoutItem);
  $checkout.on('click', '.remove-item', renderCheckoutCart);

  $('.place-order').on('click', placeOrder);

  $('#tip-button1').on('click', addTip10);
  $('#tip-button2').on('click', addTip15);
  $('#tip-button3').on('click', addTip20);
  $('#tip-button4').on('click', toggleTipBox);
  $('#custom-tip').on('keypress', customTip);

});

