const addToCart = (e) => {
  const user_id = (document.cookie).replace('user_id=', '');
  const menu_id = $(e.currentTarget).closest('.add-to-order-button').find('.hidden-values').attr('id');
  const quantity = $(".order-quantity").val().trim();
  const preferences = $('#preferences-text').val();
  const postData = { quantity, menu_id, preferences, user_id };
  $.post(`/cart/${user_id}`, postData, renderCart);
};

const renderCart = () => {
  const cookieVal = (document.cookie).replace('user_id=', '');
  const id = cookieVal || 1;
  $.get(`/cart/${id}`,  generateCart);
}

const generateCart = (data) => {
  console.log('data', data);
  const $orderSummary = $('.order-summary');
  $orderSummary.empty();
  for (const item of data.cart) {
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

renderCart();


// function add_to_cart(menu_item) {
//   const $popoutBox = $('.popout-section');
//   $popoutBox.css("visibility", "hidden");
//   $.post('/cart', menu_item.name, callback, "json");

//   function callback(val) {
//     $(".order-summary").empty();
//     const infoInputs = val['varInput'][1][1].rows;
//     console.log('infoInputs', infoInputs)
//     let cartSection = ``;
//     cartSection += orderListItems(infoInputs);
//     $(".order-summary").append(cartSection);
//   };
// }

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
//     const deleteMenuName = $(this).parent().children(".food-name").text();
//     const deleteItemQuantity = $(this).parent().children(".food-quantity").text();
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


// // {/* <div class="food-quantity"><span>${infoInput.quantity}</span><span>x</span></div> */}

// //helper function
// const orderListItems = (infoInputs) => {
//   let cart_section = ``;
//   for (const infoInput of infoInputs) {
//     const cartItem = `<div class="order-items">
//     <div class="quantity-item">
//       <div>
//         <span>${infoInput.quantity}</span><span>x</span>
//       </div>
//       <p class=food-name-incart>${infoInput.name}</p>
//     </div>
//     <div class="foodpic-div">
//       <img src="${infoInput.image_url}" alt="food" class="food-picture-incart">
//     </div>
//     <div class="price-delete" id="${infoInput.quantity}">

//     <span>$${(infoInput.quantity * infoInput.price / 100).toFixed(2)}</span>
//       <button type="button" class="remove-item">
//       <i class="fa-solid fa-trash-can"></i>
//       </button>
//     </div>
//   </div>`;
//     cart_section += cartItem;
//   }
//   return cart_section;
// }



