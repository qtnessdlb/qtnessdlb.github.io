
const chaffeElements = document.querySelectorAll('[data-chaffle]');
Array.prototype.forEach.call(chaffeElements, function (el) {
  const chaffle = new Chaffle(el, { lang: 'en',speed: 40,delay: 100,});
  el.addEventListener('click', function () {
    chaffle.init();
  });
});

// toggle menu
$('.menu-toggle').on('click', function(){
  $('body').toggleClass('open');
});

$(".menu-toggle").click(function() {
  $('.menu-btn-icon').toggleClass("activated");
});