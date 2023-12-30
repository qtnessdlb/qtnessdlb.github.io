// toggle menu
$('.menu-toggle').on('click', function(){
  $('body').toggleClass('open');
});

$(".menu-toggle").click(function() {
  $('.menu-btn-icon').toggleClass("activated");
});





$('.menu a[data-menu]').on('click', function() {
  var menu = $(this).data('menu');
  $('.menu a.active').removeClass('active');
  $(this).addClass('active');
  $('.active[data-page]').removeClass('active');
  $('[data-page="' + menu  + '"]').addClass('active');
});

$('body').on('click', '[data-dialog]', function() {
  var action = $(this).data('dialog');
  switch (action) {
    case 'logout':
      $('.dialog').toggleClass('active');
      break;
    }
});

$('body').on('click', '[data-dialog-action]', function() {
  var action = $(this).data('dialog-action');
  switch (action) {
    case 'cancel':
      $(this).closest('.dialog.active').toggleClass('active');
      break;
    }
});
