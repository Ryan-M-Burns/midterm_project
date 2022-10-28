function add_to_cart(menu_item) {
  const $popoutBox = $('.popout-section');
  $popoutBox.css("visibility", "hidden");
  $.post('/cart', menu_item.name, callback, "json");

  function callback(val) {
    $(".order-summary").empty();
    const infoInputs = val['varInput'][1][1].rows;
    let cartSection = ``;
    cartSection += orderListItems(infoInputs);
    $(".order-summary").append(cartSection);
  };
}

$(document).ready(function(){
  //jQuery methods go here...]
  $(".order-summary").empty();
  // $(".food-picture").on("click", function(){
  //   const searchKey = $(this).parent().siblings(".menu-item-text").children(".food-name");
  //   const searchKeyValue = searchKey.text();
    function callback(val) {
      $(".order-summary").empty();
      // console.log('val', val['varInput'][0][0]['total_price'])
      // console.log('val', val['varInput'][0][0]['cart_id'])
      // console.log('val', val['varInput'][1][0])
      // console.log('val', val['varInput'][1][1].rows)
      const infoInputs = val['varInput'][1][1].rows;
      let cartSection = ``;
      cartSection += orderListItems(infoInputs);
      $(".order-summary").append(cartSection);
    };
  //   $.post('/cart', searchKeyValue, callback, "json");
  // })
  $(document).on("click", '.remove-item', function(){
    const deleteMenuName = $(this).parent().children(".food-name-incart").text();
    const deleteItemQuantity = $(this).parent().children(".food-quantity-incart").text();
    const infoInsert = {};
    infoInsert['name'] = deleteMenuName;
    infoInsert['quantity'] = deleteItemQuantity;
    function callback(val){
      $(".order-summary").empty();
      const infoInputs = val['info'][1].rows;
      let cartSection = ``;
      cartSection += orderListItems(infoInputs);
      $(".order-summary").append(cartSection);
    }
    $.post('/cart/delete', infoInsert, callback, "json");
  })
})

//helper function
const orderListItems = (infoInputs) => {
  let cart_section = ``;
  for (const infoInput of infoInputs) {
    const cartItem = `
    <div class="order-items-incart">
      <div class="food-quantity-incart">${infoInput.quantity}</div>
      <div class="food-name-incart" id=${infoInput.menu_item_id}>${infoInput.name}</div>
      <div class="foodpic-div-incart">
        <img src="${infoInput.image_url}" alt="food" class="food-picture-incart">
      </div>
      <div class="food-price-incart">$${(infoInput.quantity * infoInput.price / 100).toFixed(2)}</div>
        <button type="button" class="remove-item">
        <i class="fa-solid fa-trash-can" class="deleteCartItems"></i>
        </button>
    </div>`;
    cart_section += cartItem;
  }
  return cart_section;
}
