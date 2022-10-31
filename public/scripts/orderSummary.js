$(document).ready(function() {
  $(".checkout-order-summary").empty();
  $.get('/order', function(infoReceived) {
    const datas = infoReceived['infoReceived']; // object key infoReceived : array that stores objects
    const orderSummary = order(datas);
    const orderTotalToShow = ordertotal(datas);
    $(".checkout-order-summary").append(orderSummary);
    $(".full-price").append(orderTotalToShow);
  });
  $(document).on("click", ".orderPLaced", function() {
    const user_id = document.cookie.split("=")[1];
    $.post('/order', { 'val': user_id }, function() {
      alert("message will be sent to your contact_phone!");
    });
  });
});

//helper function
const order = (infoInputs) => {
  let order_section = ``;
  for (const infoInput of infoInputs) {
    const orderItem = `
    <div class="order-items">
    <div class="quantity-item">
      <div>
        <span>${infoInput.quantity}</span><span>x</span>
      </div>
      <p class=food-name-incart>${infoInput.name}</p>
    </div>
    <div class="foodpic-div">
      <img src="${infoInput.image_url}" alt="food" class="food-picture-incart">
    </div>
    <div class="price-delete">

    <span>$${(infoInput.quantity * infoInput.price / 100).toFixed(2)}</span>
      <button type="button" class="remove-item">
      <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  </div>`;
    order_section += orderItem;
  }
  return order_section;
};


const toggleTipBox = () => {
  const $tipBox = $("#custom-tip-box");
  $tipBox.toggle("fast", "linear");
};

const customTip = (e) => {

  if (e.keyCode == 13) {
    e.preventDefault();
    const tip = parseFloat($('#custom-tip').val());
    addTip(tip / 100);
    return toggleTipBox();
  }
};

const addTip = (tip) => {
  const $tip = $('#order-tip');
  const subtotal = Number($('#order-subtotal').text().replace('$', '').toFixed(2));
  const tipAmount = subtotal * tip;

  $tip.empty();
  $tip.append(`$${tipAmount.toFixed(2)}`);
  renderPrice(subtotal);
};

const ordertotal = (infoInputs) => {
  let totalSubPrice = 0;
  for (const infoInput of infoInputs) {
    const valuecheck = infoInput['price'] * infoInput['quantity'];
    totalSubPrice += valuecheck;
  }
  subtotal = Number((totalSubPrice / 100).toFixed(2));

  renderPrice(subtotal);
};

const renderPrice = (subtotal) => {
  const $subtotal = $("#order-subtotal");

  const $tax = $("#order-tax");
  const $total = $("#order-total");10011
  const tip = $("#order-tip").text().replace('$', '');
  const tax = (subtotal * 0.12).toFixed(2);


  $subtotal.empty();
  $subtotal.append(`$${subtotal.toFixed(2)}`);

  $tax.empty();
  $tax.append(`$${tax}`);

  $total.empty();
  $total.append(`$${(Number(tip) + Number(subtotal) + Number(tax)).toFixed(2)}`);
};

const addTip10 = () => addTip(.1);
const addTip15 = () => addTip(.15);
const addTip20 = () => addTip(.20);
