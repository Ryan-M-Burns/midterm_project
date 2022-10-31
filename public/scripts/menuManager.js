const renderMenu = (data) => {
  const menu = data.data;
  const $menuArea = $(".dynamic-menu");

  $menuArea.empty();

  for (const section in menu) {
    let sectionName = toTitle(section);
    let $carousel = `
    <div class="carousel">
      <div class="item-bar">
        <h2 class="section-name">${sectionName}</h2>
        <div>
          <button type="button" class="scroll-left">
            <i class="fa-solid fa-circle-arrow-left"></i>
          </button>
          <button type="button" class="scroll-right">
            <i class="fa-solid fa-circle-arrow-right"></i>
          </button>
        </div>
      </div>`;

    $carousel += createMenuSection(menu[section]);
    $carousel += `</div>`

    $menuArea.append($carousel);
  }

};


const createMenuSection = (menuItems) => {

  let menuSection = `
    <div class="carousel-box">
      <div class="menu-items">`;

  for (const item of menuItems) {

    if (item.isactive) {
      const menuItem = `
          <button type="button" class="expand-food" id="${item.id}">
            <div class="food-picture-box">
              <img src="${item.image_url}" alt="food" class="food-picture">
            </div>
            <div class="menu-item-text">
              <p class="food-name">${item.name}</p>
              <p class="price">$${parseFloat(item.price / 100).toFixed(2)}</p>
            </div>
          </button>`;

      menuSection += menuItem;
    }

  }

  menuSection += `</div>
  </div>`;

  return menuSection;
};


const toTitle = (str) => {
  let result = '';
  let string = str.split('_');

  string.forEach(word => {
    let wordArr = word.toLowerCase().split('');
    let letter = wordArr.shift().toUpperCase();
    wordArr.unshift(letter);
    result += wordArr.join('') + ' ';
  })

  return result.trim();
}


const leftScroll = (e) => {
  const $carousel = $(e.target).closest('.carousel');
  const $menu = $carousel.find('.menu-items');
  $menu.animate({ scrollLeft: '-=486' }, 500);
};


const rightScroll = (e) => {
  const $carousel = $(e.target).closest('.carousel');
  const $menu = $carousel.find('.menu-items');
  $menu.animate({ scrollLeft: '+=486' }, 500);
};


const loadMenu = () => $.get('/menu', renderMenu);

// Initial page load render
loadMenu();
