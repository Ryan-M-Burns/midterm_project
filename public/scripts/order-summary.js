

$(document).ready(function(){
  $(".checkout-order-summary").empty();
  $(".full-price").empty();
  $.get('/order', function(infoReceived) {
    const datas = infoReceived['infoReceived']; // object key infoReceived : array that stores objects
    const orderSummary = order(datas);
    const orderTotalToShow = ordertotal(datas);
    $(".checkout-order-summary").append(orderSummary);
    $(".full-price").append(orderTotalToShow);
  });
})



//helper function
const order = (infoInputs) => {
  let order_section = ``;
  for(const infoInput of infoInputs) {
    const orderItem = `
      <div class="order-items">
        <div class="quantity-item">
          <div>
            <span>${infoInput['quantity']}</span><span>x</span>
        </div>
          <p>${infoInput['name']}</p>
        </div>
        <div class="price-delete">
        <span>$${(infoInput['price'] * infoInput['quantity'] / 100).toFixed(2)}</span>
        <button type="button" class="remove-item">
          <i class="fa-solid fa-trash-can"></i>
        </button>
        </div>
      </div> `;
    order_section += orderItem;
  }
  return order_section;
}

const ordertotal = (infoInputs) => {
  let orderTotalSection = ``;
  let totalSubPrice = 0;
  for (const infoInput of infoInputs) {
    const valuecheck = infoInput['price'] * infoInput['quantity'];
    totalSubPrice += valuecheck;
  }
  totalSubPrice = (totalSubPrice / 100).toFixed(2);
  totalPrice = (Number(totalSubPrice) + Number((totalSubPrice * 0.12)));
  orderTotalSection += `
  <h3>Tip the Restaurant?</h3>
    <div >
      <button type="button" class="tip-button1"><p>10%</p></button>
      <button type="button" class="tip-button2"><p>15%</p></button>
      <button type="button" class="tip-button3"><p>20%</p></button>
      <button type="button" class="tip-button4"><p>Other</p></button>
    </div>
    <textarea name="custom-tip" id="custom-tip" placeholder="Please enter tip % amount"></textarea>
    <div class="label-price">
      <p>Tip</p>
      <p class="currency" class="order-tips">$0.00</p>
    </div>
    <div class="label-price">
      <p>Subtotal</p>
      <p class="currency" class="order-subtotal">$${totalSubPrice}</p>
    </div>
    <div class="label-price">
      <p>Taxes</p>
      <p class="currency" class="order-tax">$${(totalSubPrice * 0.12).toFixed(2)}</p>
    </div>
    <div class="label-price-total">
      <p>Total</p>
      <p class="currency" class="order-total">$${totalPrice.toFixed(2)}</p>
    </div>
  </div>
  `;
  return orderTotalSection;
}
