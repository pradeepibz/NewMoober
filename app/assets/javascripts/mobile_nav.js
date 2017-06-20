$(document).ready(function(){
  
  loaded();
  var myScroll;

  function loaded () {
    myScroll = new IScroll('#m_nav_wrapper', { scrollX: true, scrollY: false, mouseWheel: true });
    horizontal_smooth_scroll(myScroll)
  }

  document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
    capture: false,
    passive: false
  } : false);

  // $(document).on("click", ".mnav_slide_left_right a", function(){
  // });


});

function isPassive() {
    var supportsPassiveOption = false;
    try {
        addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassiveOption = true;
            }
        }));
    } catch(e) {}
    return supportsPassiveOption;
}

function horizontal_smooth_scroll(myScroll){
  // Get the center X position
  var center_pos = $(window).width() / 2 - $("#m_nav_scroller ul li.active").width() / 2;
  var move_left = center_pos - ($("#m_nav_scroller ul li.active").position().left);

  // with animation (smooth scroll) set the active link at center of screen
  $("#m_nav_scroller ul").animate({
      left: move_left
  }, { complete:  function() {
    var scroller = $("#m_nav_scroller")
    $(scroller).css({'transform': 'translate('+move_left+'px, 0px) translateZ(0px)'});
    $("#m_nav_scroller ul").css("left", 0)
  }, duration: 1500, easing: 'easeOutExpo'});
  myScroll.x = move_left;
  
  // without any animation (smooth scroll) set the active link at center of screen
  // myScroll.scrollTo(move_left,0);
}