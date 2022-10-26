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
