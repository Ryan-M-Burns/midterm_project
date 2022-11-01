const addToCart = (e) => {
  const user_id = (document.cookie).replace('user_id=', '');
  const menu_item_id = $('.hidden-values').attr('id');
  const quantity = $(".order-quantity").text();
  const preferences = $('#preferences-text').val();
  const postData = { quantity, menu_item_id, preferences, user_id };
  $.post(`/cart/${user_id}`, postData, renderCart);
};


const renderCart = () => {
  const user_id = (document.cookie).replace('user_id=', '');
  $.get(`/cart/${user_id}`, generateCart);
};


const generateCart = (data) => {
  const $orderSummary = $('.order-summary');
  let subtotal = 0;
  let numberOfItems = 0;

  $orderSummary.empty();

  for (const item of data.cart) {
    const menuItem = generateCartItems(item);
    $orderSummary.append(menuItem);

    numberOfItems += item.quantity;

    subtotal += generateSubtotal(item);
  }

  $('.item-count').empty().append(`${numberOfItems} <i class="fa-solid fa-cart-shopping"></i>`);
  $('.go-to-checkout').empty().append(`<p>Checkout: $${(subtotal / 100).toFixed(2)}</p>`);

  $('.modal-section').css("visibility", "hidden");
};


const generateSubtotal = (data) => (data.price * data.quantity);


const generateCartItems = (infoInput) => {
  console.log('generateCartItems', infoInput)
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
        <button type="button" class="remove-item" id="${infoInput.id}">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>`;

};


const deleteCartItem = (e) => {

  const id = $(e.target).closest(".remove-item").attr("id");
  const user_id = (document.cookie).replace('user_id=', '');

  $.post(`/cart/${user_id}/delete`, { id }, () => renderCart());
};

// Initial page load render
renderCart();
