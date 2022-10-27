//client interface

// Document ready
$(() => {
  // events go here
  $('.scroll-left').on('click', leftScroll);
  $('.scroll-right').on('click', rightScroll);
  $('.expand-food').on('click', renderPopout);
  $('.close').on('click', () => $('.popout-section').css("visibility", "hidden"));
  $('.checkout').on('submit', checkout);
});
// research nodemon docs
