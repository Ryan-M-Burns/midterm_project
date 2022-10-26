
$(document).ready(function(){
  //jQuery methods go here...
  $(".order-summary").empty();
  $(".food-picture").on("click", function(){
    const searchKey = $(this).parent().siblings(".menu-item-text").children(".food-name");
    const searchKeyValue = searchKey.text();
    function callback(val) {
      console.log('val', val['varInput'][0][0]['total_price'])
      console.log('val', val['varInput'][0][0]['cart_id'])
      console.log('val', val['varInput'][1][0])
      console.log('val', val['varInput'][1][1].rows) //pass array-object-value
      const infoInputs = val['varInput'][1][1].rows;
      let cartSection = ``;
      console.log('cartSection', cartSection)
      cartSection += orderListItems(infoInputs);
      console.log('cartSection', cartSection)
      $(".order-summary").append(cartSection);
    };
    $.post('/cart', searchKeyValue, callback, "json");
  })
})

//helper function
const orderListItems = (infoInputs) => {
  let cart_section = ``;
  for (const infoInput of infoInputs) {
    const cartItem = `
    <div class="order-items">
      <p>${infoInput.quantity} - ${infoInput.name}</p>
      <div>
        <img src="${infoInput.image_url}" alt="food" class="food-picture">
        <span>$${infoInput.quantity * infoInput.price / 100}</span>
        <button type="button" class="remove-item">
        <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>`;
    cart_section += cartItem;
  }
  return cart_section;
}

