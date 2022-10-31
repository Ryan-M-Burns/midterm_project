const renderPopout = (e) => {
  const id = $(e.target).closest('.expand-food').attr('id');
  $.get(`/menu/${id}`, generatePopout);
};

const generatePopout = (data) => {
  const menuItem = data[0];

  const buttonText = `<p>Add to order: $<span class="add-to-order-popout">${(menuItem.price / 100).toFixed(2)}</span></p>
  <input class="hidden-values" type="hidden" id="${menuItem.id}"
    value="${(menuItem.price / 100).toFixed(2)}"></input>`

  $(".food-name").empty().append(`<h2>${menuItem.name}</h2>`);
  $(".food-description").empty().append(`${menuItem.description}`);
  $(".popout-img-box").empty().append(`<img src="${menuItem.image_url}">`);
  $(".order-quantity").empty().append(`<span>1</span>`);
  $(".popout-section").css("visibility", "visible");
  $(".add-to-order-button").empty().append(buttonText);
};
