const addToCart = (e) => {
  console.log('hi');
  console.log("hello e-target", e.currentTarget);
  const id = $(e.currentTarget).closest('.add-to-order-button').find('.hidden-values').attr('id');
  console.log('id',id);
  $.post(`/cart/${id}`, req.cookies['user_id'], refreshCart);
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

// //helper function
// const orderListItems = (infoInputs) => {
//   let cart_section = ``;
//   for (const infoInput of infoInputs) {
//     const cartItem = `
//     <div class="order-items-incart">
//       <div class="food-quantity-incart">${infoInput.quantity}</div>
//       <div class="food-name-incart" id=${infoInput.menu_item_id}>${infoInput.name}</div>
//       <div class="foodpic-div-incart">
//         <img src="${infoInput.image_url}" alt="food" class="food-picture-incart">
//       </div>
//       <div class="food-price-incart">$${(infoInput.quantity * infoInput.price / 100).toFixed(2)}</div>
//         <button type="button" class="remove-item">
//         <i class="fa-solid fa-trash-can" class="deleteCartItems"></i>
//         </button>
//     </div>`;
//     cart_section += cartItem;
//   }
//   return cart_section;
// }



