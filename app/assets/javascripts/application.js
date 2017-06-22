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

// (function($){
//     // Determine if we on iPhone or iPad
//     var isiOS = false;
//     var agent = navigator.userAgent.toLowerCase();
//     if(agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0){
//     	isiOS = true;
//     }

//     $.fn.doubletap = function(onDoubleTapCallback, onTapCallback, delay){
//     	var eventName, action;
//     	delay = delay == null? 500 : delay;
//     	eventName = isiOS == true? 'touchend' : 'click';

//     	$(this).bind(eventName, function(event){
//     		var now = new Date().getTime();
//     		var lastTouch = $(this).data('lastTouch') || now + 1 * the first time this will make delta a negative number ;
//     		var delta = now - lastTouch;
//     		clearTimeout(action);
//     		if(delta<500 && delta>0){
//     			if(onDoubleTapCallback != null && typeof onDoubleTapCallback == 'function'){
//     				onDoubleTapCallback(event);
//     			}
//     		}else{
//     			$(this).data('lastTouch', now);
//     			action = setTimeout(function(evt){
//     				if(onTapCallback != null && typeof onTapCallback == 'function'){
//     					onTapCallback(evt);
//     				}
//                     clearTimeout(action);   // clear the timeout
//                   }, delay, [event]);
//     		}
//     		$(this).data('lastTouch', now);
//     	});
//     };
// })(jQuery);

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
