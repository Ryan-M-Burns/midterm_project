const leftScroll = (e) => {
  const $carousel = $(e.target).closest('.carousel');
  const $menu = $carousel.find('.menu-items');
  $menu.animate({ scrollLeft: '-=486' }, 500);
};

const rightScroll = (e) => {
  const $carousel = $(e.target).closest('.carousel');
  const $menu = $carousel.find('.menu-items');
  $menu.animate({ scrollLeft: '+=486' }, 500);
};

const decreaseQuantity = (e) => {
  const $textArea = $(e.currentTarget).find('.order-quantity').text();
  const amount = $textArea.val;
  console.log('amount', amount, '$textArea', $textArea)
};

const increaseQuantity = (e) => {
  const $textArea = $(e.currentTarget).find('.order-quantity').text();
  console.log("$textArea", $textArea);
};
