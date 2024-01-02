var button = document.querySelector('.popup'),
    items = document.querySelectorAll('.trigger');
var openCloseMenu = function() {
  for(i=0; i < items.length; i++){
    items[i].classList.toggle('slideout');
  }
}
button.onclick = openCloseMenu;