// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require agency
//= require bootstrap.min
//= require jquery.easing.min
//= require map
//= require scroll
//= require app
//= require api
//= require mobiscroll.javascript.min
//= require jquery.scrollify
//= require mobile_nav
//= require iscroll
//= require jquery.remotipart
//= require charges
//= require cable

// disable double tab to zoom 
(function($) {
  var IS_IOS = /iphone|ipad/i.test(navigator.userAgent);
  $.fn.nodoubletapzoom = function() {
    if (IS_IOS)
      $(this).bind('touchstart', function preventZoom(e) {
        var t2 = e.timeStamp
          , t1 = $(this).data('lastTouch') || t2
          , dt = t2 - t1
          , fingers = e.originalEvent.touches.length;
        $(this).data('lastTouch', t2);
        if (!dt || dt > 500 || fingers > 1) return; // not double-tap

        e.preventDefault(); // double tap - prevent the zoom
        // also synthesize click events we just swallowed up
        $(this).trigger('click').trigger('click');
      });
  };
})(jQuery);

$(document).ready(function(){

  if ($(window).width() < 750) {
    $(".page_valid_align").css("top","150px");
  }

	// Finding Desktop or Mobile and hide appropriate navigation
	if($(window).width()>640){
		// Desktop
		$(".d_nav").removeClass("hide");
		$(".m_nav").addClass("hide");
    $(".mbl_nav").addClass("hide");
	}else{
		// Mobile
		$(".m_nav").removeClass("hide");
    $(".d_nav").addClass("hide");
		$(".mbl_nav").removeClass("hide");
    $(document).on('focus', '.sign-app-input', function() 
    {
      $(".devise-footer").hide();
    });

    $(document).on('blur', '.sign-app-input', function() 
    {
      $(".devise-footer").show();
    });

    $(document).on('focus', '.contact-input', function(){
      $(".apply-contact-form").css("margin-top", "0px");
      $(".contact-company-logo").hide();
      $(".contact-footer").hide();
    });
    $(document).on('blur', '.contact-input', function(){
      $(".apply-contact-form").css("margin-top", "-35px");
      $(".contact-company-logo").show();
      $(".contact-footer").show();
    });
	}

});
$(document).on('click', '.mbl-toggle', function(){
  $(this).addClass( "toggle-is-active" );
  $('.mbl-webLateralMenuOverlay').addClass( "active" );
  $('.mbl-webLateralMenu').addClass( "active" );
});
$(document).on('click', '.toggle-is-active', function(){
  $(this).removeClass( "toggle-is-active" );
  $('.mbl-webLateralMenuOverlay').removeClass( "active" );
  $('.mbl-webLateralMenu').removeClass( "active" );
});

function validateQty(event) {
    var key = window.event ? event.keyCode : event.which;
  if (event.keyCode == 8 || event.keyCode == 46
   || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 9) {
      return true;
  }
  else if ( key < 48 || key > 57 ) {
      return false;
  }
  else return true;
};