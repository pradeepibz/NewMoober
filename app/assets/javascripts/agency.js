$(function() {
    // side nav
    $(document).on('click', '.c-hamburger', function(){
      $(this).addClass( "is-active" );
      $('.mrf-webLateralMenuOverlay').addClass( "active" );
      $('.mrf-webLateralMenu').addClass( "active" );
      $('.mrf-webLateralMenu').css('transform','translate3d(0px, 0px, 0px)');
    });
    $(document).on('click', '.is-active', function(){
      $(this).removeClass( "is-active" );
      $('.mrf-webLateralMenuOverlay').removeClass( "active" );
      $('.mrf-webLateralMenu').removeClass( "active" );
      $('.mrf-webLateralMenu').css('transform','translate3d(100%, 0px, 0px)');
    });
    $('a.page-scroll').bind('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top - 50)
      }, 1250, 'easeInOutExpo');
      event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
      target: '.navbar-fixed-top',
      offset: 10
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){ 
      $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
      offset: {
        top: 600
      }
    })
  })