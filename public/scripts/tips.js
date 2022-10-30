const toggleTipBox = () => {
  const $tipBox = $("#custom-tip-box");
  $tipBox.toggle("fast", "linear");
};

const customTip = (e) => {

  if (e.keyCode == 13) {
    e.preventDefault();
    const tip = parseFloat($('#custom-tip').val());
    return addTip(tip/100);
  }

};
const addTip = (tip) => {
  const subtotal = $('#order-subtotal').text().replace('$', '');
  const tipAmount = parseFloat(subtotal) * tip;
  toggleTipBox();
  $('#order-tip').empty();
  $('#order-tip').append(`$${tipAmount.toFixed(2)}`);
}


