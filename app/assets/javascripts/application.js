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

// disable double tab to zoom 


$(document).ready(function(){

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
