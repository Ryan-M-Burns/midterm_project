const renderMenu = (menu) => {
  const $menuArea = $(".dynamic-menu");
  $menuArea.empty();
  for (const section in menu) {
    let sectionName = toTitle(section);
    let $carousel = `
    <div class="carousel">
      <div class="item-bar">
        <h2>${sectionName}</h2>
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
    $menuArea.append($carousel);
    $menuArea.append('</div>');
  }

};

const createMenuSection = (menuItems) => {

  let menuSection = `
    <div class="carousel-box">
      <div class="menu-items">`;

  for (const item of menuItems) {
    if (item.isactive) {
      const menuItem = `
          <button type="submit" class="expand-food">
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

// helper function
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

const loadMenu = () => $.get('/menu', renderMenu);

loadMenu();
