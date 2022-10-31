const renderModal = (e) => {
  const id = $(e.target).closest('.expand-food').attr('id');
  $.get(`/menu/${id}`, generateModal);
};


const generateModal = (data) => {
  const menuItem = data[0];
  const price = Number(menuItem.price / 100).toFixed(2);
  const $storeVals = $(".hidden-values");

  $(".food-name-modal").empty().append(`<h2>${menuItem.name}</h2>`);
  $(".food-description").empty().append(`${menuItem.description}`);
  $(".modal-img-box").empty().append(`<img src="${menuItem.image_url}">`);
  $(".order-quantity").empty().append(`1`);
  $(".modal-add-button").empty().append(`${price}`);

  $storeVals.attr('id', `${menuItem.id}`);
  $storeVals.attr('value', `${price}`);

  $(".modal-section").css("visibility", "visible");
};


const decreaseQuantity = () => {
  const $val = $(".order-quantity");
  const val = Number($val.text()) - 1;

  if (val >= 0) {
    const price = Number($(".hidden-values").attr("value"));

    $val.empty().append(val);

    $(".modal-add-button").text((val * price).toFixed(2));
  }

};


const increaseQuantity = () => {
  const $val = $(".order-quantity");
  const val = Number($val.text()) + 1;
  const price = Number($(".hidden-values").attr("value"));

  $val.empty().append(val);

  $(".modal-add-button").text((val * price).toFixed(2));
};
