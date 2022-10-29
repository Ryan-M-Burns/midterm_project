const addToCart = (e) => {
  const user_id = (document.cookie).replace('user_id=', '');
  const menu_id = $(e.currentTarget).closest('.add-to-order-button').find('.hidden-values').attr('id');
  const quantity = $(".order-quantity").val().trim();
  const preferences = $('#preferences-text').val();
  const postData = { quantity, menu_id, preferences, user_id };
  console.log(postData);
  $.post(`/cart/${user_id}`, postData, renderCart(user_id));
};

const renderCart = (id) => $.get(`/cart/${id}`, generateCart);

const generateCart = (data) => {
  console.log('infoInput', data);
  const $orderSummary = $('.order-summary');
  $orderSummary.empty();

  for (const item of data) {
    const menuItem = generateCartItems(item);
    $orderSummary.append(menuItem);
  }

  $('.popout-section').css("visibility", "hidden");
};

const generateCartItems = (infoInput) => {

    return `<div class="order-items">
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
