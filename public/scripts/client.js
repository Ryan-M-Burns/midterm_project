// client interface

$(() => {
  const $header = $('header');
  const $cartButton = $('.cart-nav-button');
  $header.on('click', '#BTR', goToHome);
  $header.on('click', '#BTR', renderCart);
  $cartButton.on('click', goToCheckout);
  $cartButton.on('click', renderCheckoutCart);
  $cartButton.on('click', () => $(window).scrollTop(0));

  const $checkoutButton = $('.go-to-checkout');
  $checkoutButton.on('click', goToCheckout);
  $checkoutButton.on('click', renderCheckoutCart);

  const $carousel = $('.dynamic-menu');
  $carousel.on('click', '.scroll-left', leftScroll);
  $carousel.on('click', '.scroll-right', rightScroll);
  $carousel.on('click', '.expand-food', renderModal);

  const $modal = $('.modal');
  $modal.on('click', '.toggle-less', decreaseQuantity);
  $modal.on('click', '.toggle-more', increaseQuantity);
  $modal.on('click', '.add-to-order-button', addToCart);
  $modal.on('click', '.close', () => $modal.parent().css('visibility', 'hidden'));

  const $orderSummary = $('.order-summary');
  $orderSummary.on('click', '.remove-item', deleteCartItem);
  $orderSummary.on('click', '.remove-item', renderCart);

  const $checkoutOrderSummary = $('.checkout-order-summary');
  $checkoutOrderSummary.on('click', '.remove-checkout-item', deleteCheckoutItem);
  $checkoutOrderSummary.on('click', '.remove-checkout-item', renderCheckoutCart);

  $('.place-order').on('click', placeOrder);

  $('#custom-tip-box').hide();
  $('#tip-button1').on('click', addTip10);
  $('#tip-button2').on('click', addTip15);
  $('#tip-button3').on('click', addTip20);
  $('#tip-button4').on('click', toggleTipBox);
  $('#custom-tip').on('keypress', customTip);

});
