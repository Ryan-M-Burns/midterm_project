const toggleTipBox = () => {
  console.log(this)
  const $tipBox = $("#custom-tip-box");
  $tipBox.toggle("fast", "linear");
};

const customTip = (e) => {

  if (e.keyCode == 13) {
    e.preventDefault();
    const tip = parseFloat($('#custom-tip').val());
    addTip(tip/100);
    return toggleTipBox();
  }
};

const addTip = (tip) => {
  const subtotal = $('#order-subtotal').text().replace('$', '');
  const tipAmount = parseFloat(subtotal) * tip;
  $('#order-tip').empty();
  $('#order-tip').append(`$${tipAmount.toFixed(2)}`);
}

const addTip10 = () => addTip(.1);
const addTip15 = () => addTip(.15);
const addTip20 = () => addTip(.20);
