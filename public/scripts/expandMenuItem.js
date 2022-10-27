const renderPopout = e => {
  const itemName = $(e.currentTarget).find('.food-name').text();
  const itemSection = convertToUpperSnakeCase($(e.currentTarget).closest('.carousel').find('.section-name').text());
  const itemObject = [itemSection, itemName];
  createPopoutElement(itemObject);
};


const createPopoutElement = (arr) => $.get('/menu', menu, getMenuItem(menu, arr));

const getMenuItem = (data, itemObject) => {
  const $popoutBox = $('.popout-section');
  const menuSection = data[itemObject[0]];
  const menuItem = menuSection.find((item) => (item.name === itemObject[1]));
  $popoutBox.empty();
  $popoutBox.append(generatePopout(menuItem));
  $popoutBox.css("visibility", "visible");
};

const generatePopout = (menuItem) => {
  return `
  <div class="popout">
    <div class="food-info-popout">
      <button type="button" class="close">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="popout-body">
        <h2>${menuItem.name}</h2>
        <p class="rating"> <i class="fa-regular fa-thumbs-up"></i> 95%</p>
        <h3 class="food-description">
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
          <div class="order-quantity">
            1
          </div>
          <button type="button" class="toggle-more">
            <i class="fa-solid fa-circle-arrow-right"></i>
          </button>
        </div>
        <button type="submit" class="add-to-order-button">
          <p>Add to order: $<span class="add-to-order-popout">${(menuItem.price / 100).toFixed(2)}</span></p>
        </button>
        <input class="OG-price" type="hidden" value="${(menuItem.price / 100).toFixed(2)}"></input>
      </div>
    </div>
  </div>`;
};

const convertToUpperSnakeCase = (str) => {
  let result = str.toUpperCase().split(' ');
  return result.join('_');
};

