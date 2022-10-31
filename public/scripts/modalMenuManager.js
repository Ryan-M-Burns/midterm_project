const renderPopout = (e) => {
  const id = $(e.target).closest('.expand-food').attr('id');
  $.get(`/menu/${id}`, generatePopout);
};

const generatePopout = (data) => {
  const menuItem = data[0];
  const $storeVals = $(".hidden-values");
  $(".food-name-modal").empty().append(`<h2>${menuItem.name}</h2>`);
  $(".food-description").empty().append(`${menuItem.description}`);
  $(".popout-img-box").empty().append(`<img src="${menuItem.image_url}">`);
  $(".order-quantity").empty().append(`1`);
  $(".add-to-order-popout").empty().append(`${(menuItem.price / 100).toFixed(2)}`);
  $storeVals.attr('id', `${menuItem.id}`);
  $storeVals.attr('value', `${(menuItem.price / 100).toFixed(2)}`);
  $(".popout-section").css("visibility", "visible");
};

const decreaseQuantity = () => {
  const $val = $(".order-quantity");
  const val = Number($val.text()) - 1;
  if (val >= 0) {
    const price = Number($(".hidden-values").attr("value"));
    $val.empty().append(val);
    $(".add-to-order-popout").text((val * price).toFixed(2));
  }
};
const increaseQuantity = () => {
  const $val = $(".order-quantity");
  const val = Number($val.text()) + 1;
  const price = Number($(".hidden-values").attr("value"));
  $val.empty().append(val);
  $(".add-to-order-popout").text((val * price).toFixed(2));
};
