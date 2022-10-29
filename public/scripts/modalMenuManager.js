const renderPopout = (e) => {
  const id = $(e.target).closest('.expand-food').attr('id');
  console.log(id);
  $.get(`/menu/${id}`, generatePopout);
};

const generatePopout = (data) => {
  const $popoutBox = $('.popout-section');
  $popoutBox.empty();
  $popoutBox.append(createPopout(data[0]));
  $popoutBox.css("visibility", "visible");
};

const createPopout = (menuItem) => {

  return `
  <div class="popout">
    <div class="food-info-popout">
      <button type="button" class="close">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="popout-body">
        <h2>${menuItem.name}</h2>
        <p class="rating"> <i class="fa-regular fa-thumbs-up"></i> 95%</p>
        <h3 class="food-description" >
          ${menuItem.description}
        </h3>
        <div class="popout-img-box">
        <img src="${menuItem.image_url}">
      </div>
        <h3>Preferences:</h3>
        <textarea placeholder="Please let the restaurant know of any allergies, dietary, or religious restrictions!"
          name="text" id="preferences-text"></textarea>
      </div>
      <div class="add-to-order">
        <div class="change-quantity">
          <button type="button" class="toggle-less">
            <i class="fa-solid fa-circle-arrow-left"></i>
          </button>
          <textarea class="order-quantity">1</textarea>
          <button type="button" class="toggle-more">
            <i class="fa-solid fa-circle-arrow-right"></i>
          </button>
        </div>
        <button type="button" class="add-to-order-button">
          <p>Add to order: $<span class="add-to-order-popout">${(menuItem.price / 100).toFixed(2)}</span></p>
          <input class="hidden-values" type="hidden" id="${menuItem.id}" value="${(menuItem.price / 100).toFixed(2)}"></input>
        </button>
      </div>
    </div>
  </div>`;
};
