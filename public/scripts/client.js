//client interface

// Document ready
$(() => {
  // events go here
  $('.scroll-left').on('click', leftScroll);
  $('.scroll-right').on('click', rightScroll);
  $('.checkout').on('submit', checkout);
});
// research nodemon docs
