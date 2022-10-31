
const goToCheckout = () => {

  $('#display1').css("display", "none");
  $('#display2').css("display", "flex");
  $('#BTR-text').empty().append('<i class="fa-solid fa-arrow-left"></i> Back to Restaurant');
  $('#BTRS').attr('id', 'BTR');

};


const goToHome = () => {

  $('#display1').css("display", "flex");
  $('#display2').css("display", "none");
  $('#BTR-text').empty().append('<i class="fa-solid fa-arrow-left"></i> Back to Restaurants');
  $('#BTR').attr('id', 'BTRS');

};
