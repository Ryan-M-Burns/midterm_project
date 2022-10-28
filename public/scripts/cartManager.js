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

const generateCart = (infoInputs) => {
  console.log('infoInput', infoInputs);
  const $cartContainer = $('.order-summary');
  $cartContainer.empty();
};
const generateCartItems = (infoInput) => {
  const $cartContainer = $('.order-summary');
  const cartItem = `
    <div class="order-items">
      <div class="quantity-item">
        <div>
          <span>${infoInput.quantity}</span><span>x</span>
        </div>
        <p>${infoInput.name}</p>
      </div>
      <div class="foodpic-div">
        <img src="${infoInput.image_url}" alt="food" class="food-picture">
      </div>
      <div class="price-delete">

      <span>$${(infoInput.quantity * infoInput.price / 100).toFixed(2)}</span>
        <button type="button" class="remove-item">
        <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>`;
  $cartContainer.append(cartItem);
};


//const postItemToCart = $.post('/cart', searchKeyValue, callback, "json");



// const deleteItem = () => {
//   const deleteMenuName = $(this).parent().children(".food-name-incart").text();
//   const deleteItemQuantity = $(this).parent().children(".food-quantity-incart").text();
//   const infoInsert = {};
//   infoInsert['name'] = deleteMenuName;
//   infoInsert['quantity'] = deleteItemQuantity;
//   function callback(val) {
//     $(".order-summary").empty();
//     const infoInputs = val['info'][1].rows;
//     let cartSection = ``;
//     cartSection += orderListItems(infoInputs);
//     $(".order-summary").append(cartSection);
//   }
//   $.post('/cart/delete', infoInsert, callback, "json");
// };

// $(document).ready(function(){
//   //jQuery methods go here...]
//   $(".order-summary").empty();
//   $.get('/order', function(infoReceived){
//     const infoInputs = infoReceived['infoReceived'];
//     console.log('infoInputs', infoInputs)
//   let cartSection = ``;
//   cartSection += orderListItems(infoInputs);
//   $(".order-summary").append(cartSection);
//   });

//   $(document).on("click", '.remove-item', function(){
//     const deleteMenuName = $(this).parent().children(".food-name-incart").text();
//     const deleteItemQuantity = $(this).parent().children(".food-quantity-incart").text();
//     const infoInsert = {};
//     infoInsert['name'] = deleteMenuName;
//     infoInsert['quantity'] = deleteItemQuantity;
//     function callback(val){
//       $(".order-summary").empty();
//       const infoInputs = val['info'][1].rows;
//       let cartSection = ``;
//       cartSection += orderListItems(infoInputs);
//       $(".order-summary").append(cartSection);
//     }
//     $.post('/cart/delete', infoInsert, callback, "json");
//   })
// })

//helper function

