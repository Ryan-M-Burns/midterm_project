const addToCart = (e) => {
  const user_id = (document.cookie).replace('user_id=', '');
  const menu_id = Number($('.hidden-values').attr('id'));
  const quantity = Number($(".order-quantity").text());
  const preferences = $('#preferences-text').val();
  const postData = { quantity, menu_id, preferences, user_id };
  $.post(`/cart/${user_id}`, postData, renderCart);
};

const renderCart = () => {
  const user_id = (document.cookie).replace('user_id=', '');
  $.get(`/cart/${user_id}`, generateCart);
};

const generateCart = (data) => {
  const $orderSummary = $('.order-summary');
  $orderSummary.empty();
  for (const item of data.cart) {
    const menuItem = generateCartItems(item);
    $orderSummary.append(menuItem);
  }

  $('.popout-section').css("visibility", "hidden");
};
//Works
const generateCartItems = (infoInput) => {
  console.log(infoInput);
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
        <button type="button" class="remove-item" id=${infoInput.cart_id}>
        <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>`;
};

const deleteCartItem = (e) => {
  const cart_id = $(e.target).closest(".remove-item").attr('id');
  const user_id = (document.cookie).replace('user_id=', '');
  $.post(`/cart/${user_id}/delete`, { cart_id }, () => renderCart());
};

renderCart();
