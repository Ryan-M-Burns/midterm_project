const expandMenuItem = e => {
  const $menuItem = $(e.target);
  loadPopout($menuItem);
}
const generatePopout = (searchItem) => {
  console.log(searchItem);
}
const loadPopout = () => $.get('/menu', expandMenuItem)
