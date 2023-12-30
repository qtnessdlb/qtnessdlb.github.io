// toggle menu
$('.menu-toggle').on('click', function(){
  $('body').toggleClass('open');
});

$(".menu-toggle").click(function() {
  $('.menu-btn-icon').toggleClass("activated");
});


$(document).ready(function(e) {
	// Show the first tab by default
	$('.main .page').hide();
	$('.main .page:first').show();
	$('.menu-shortcut li:first').addClass('li-active');
	
	// Change tab class and display content
	$('.menu-shortcut a').on('click', function(event){
	  event.preventDefault();
	  $('.menu-shortcut li').removeClass('li-active');
	  $(this).parent().addClass('li-active');
	  $('.main .page').hide();
	  $($(this).attr('href')).show();
	});
});

