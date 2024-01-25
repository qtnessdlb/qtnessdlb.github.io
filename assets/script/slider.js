$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        autoWidth: true,
        autoHeight: false,
        loop: true,
        center: true,
        dots: false,
        margin: 16,
        stagePadding: 32,
        autoplay: true,
        autoplayTimeout: 15000,
        smartSpeed: 500,
        items: 1,
    });

    // Custom navigation
    $('.trigger.prev').click(function() {
      $('.owl-carousel').trigger('prev.owl.carousel');
    });

    $('.trigger.next').click(function() {
      $('.owl-carousel').trigger('next.owl.carousel');
    });
  });