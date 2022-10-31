const renderCheckoutCart = () => {
  const user_id = (document.cookie).replace('user_id=', '');
  $.get(`/cart/${user_id}`, generateCheckoutCart);
};

const generateCheckoutCart = (data) => {
  const $checkoutSummary = $('.checkout-order-summary');
  let subtotal = 0;
  $checkoutSummary.empty();

  for (const item of data.cart) {
    const menuItem = generateCheckoutItem(item);
    $checkoutSummary.append(menuItem);
    subtotal += generateSubtotal(item);
  }

  renderPrice(subtotal/100);
};





const generateCheckoutItem = (infoInput) => {

  return `
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

};


const deleteCheckoutItem = (e) => {
  const cart_id = $(e.target).closest(".remove-item").attr('id');
  const user_id = (document.cookie).replace('user_id=', '');

  $.post(`/cart/${user_id}/delete`, { cart_id }, () => renderCheckoutCart());
};


const customTip = (e) => {

  if (e.keyCode == 13) {
    e.preventDefault();
    const tip = parseFloat($('#custom-tip').val());

    addTip(tip / 100);

    return toggleTipBox();
  }

};


const generateSubtotal = (data) => (data.price * data.quantity);


const addTip = (tip) => {
  const $tip = $('#order-tip');
  const subtotal = Number($('#order-subtotal').text().replace('$', ''));
  const tipAmount = subtotal * tip;

  $tip.empty();
  $tip.append(`$${tipAmount.toFixed(2)}`);

  renderPrice(subtotal);
};


const renderPrice = (subtotal) => {
  const $subtotal = $("#order-subtotal");
  const $tax = $("#order-tax");
  const $total = $("#order-total");
  const tip = $("#order-tip").text().replace('$', '');
  const tax = (subtotal * 0.12).toFixed(2);

  $subtotal.empty();
  $subtotal.append(`$${subtotal.toFixed(2)}`);

  $tax.empty();
  $tax.append(`$${tax}`);

  $total.empty();
  $total.append(`$${(Number(tip) + Number(subtotal) + Number(tax)).toFixed(2)}`);
};


const placeOrder = () => {
  const user_id = (document.cookie).replace('user_id=', '');
  $.post('/order', { 'val': user_id }, () => alert("message will be sent to your contact_phone!"))
}

const toggleTipBox = () => $("#custom-tip-box").toggle("fast", "linear");

const addTip10 = () => addTip(.1);
const addTip15 = () => addTip(.15);
const addTip20 = () => addTip(.20);
