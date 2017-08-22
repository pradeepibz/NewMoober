$(function() {
  $(document).on('click', '.smooth_scroll', function(event) {
    var $anchor = $(this);
    var get_div_id = $anchor.attr('href');
    var section_id = $(this).data('section_id');
    $(get_div_id).css("display", "block");
    function hide_div(){
      if (section_id == '#map') {
        $(".search-map").css("display", "none");
        $(section_id).css("display", "none");
      }else{
        $(section_id).css("display", "none");
      }
      if (get_div_id == '#moving-date-section') {
        $('#show').click();
      }
    };
    window.setTimeout( hide_div, 900);
    $('html, body').stop().animate({
      scrollTop: $(get_div_id).offset().top
    }, 1500, 'easeInOutExpo');
    $(get_div_id).removeAttr("style").show();
    event.preventDefault();
  });
  
  // Back Button on Start a Move page
  $(document).on('click', '.back_btn', function(event) {
    $("#date3").trigger("click");
    var back_section_div = $(this).data('back_section');
    var current_section_div = $(this).data('current_section');
    var back_section_height= $(back_section_div).height();
    var current_section_height= $(current_section_div).height();
    // Set current visible div to Absolute Top 0 and reduce Top value using Animate
      $(current_section_div).css({position: "absolute", top: 0});
      $(current_section_div).animate({ top: current_section_height}, {complete:  function() {
      }, duration: 1500, easing: 'easeInOutExpo'});
    // Hide Back div section from browser view by setting Absolute Top - DIV HEIGHT and reduce Top value using Animate
      $(back_section_div).css({position: 'absolute', top: -Math.abs(back_section_height)}).show();
      $(back_section_div).animate({ top: 0 }, {complete: function(){
        $(back_section_div).removeAttr("style").show();
      }, duration: 1500, easing: 'easeInOutExpo'});
    // Hide & Show Map search inputs
      window.setTimeout(hide_search_map_div, 900);
      function hide_search_map_div(){
        $(current_section_div).removeAttr("style").hide();
        if (current_section_div == '#map') {
          $(".search-map").css("display", "none");
        }
        if (back_section_div == '#map') {
          $(".search-map").css("display", "block");
        }
      }
    event.preventDefault();
  });
});