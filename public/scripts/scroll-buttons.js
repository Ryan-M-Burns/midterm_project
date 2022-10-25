const leftScroll = (e) => {
  const $carousel = $(e.target).closest('.carousel');
  const $menu = $carousel.find('.menu-items');
  $menu.animate({ scrollLeft: '-=200' }, 1000);
};

const rightScroll = (e) => {
  const $carousel = $(e.target).closest('.carousel');
  const $menu = $carousel.find('.menu-items');
  $menu.animate({ scrollLeft: '+=200' }, 1000);
};
