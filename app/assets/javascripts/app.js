$(function (){

  // extra large edit popup
  $(document).on('click', '.full_content', function(){
    $('.edit-moving-extra_value').val('');
    $('.edit_moving_extra_hidden').val('');
    $('#edit-moving-extra').modal();
    var moving_value = $(this).data('moving_value');
    var find_extra = $(this).data('find_extra');
    $('.edit-moving-extra_value').val(moving_value);
    $('.find_extra_input').val(find_extra);
  });

  $(document).on('click', '.edit_moving_extra_ok', function(){
    // var append_value =$('.edit_moving_extra_hidden').val();
    // var success_value = $('.edit-moving-extra_value').val();
    // $('.'+append_value).html(success_value);
    var find_extra = $('.find_extra_input').val();
    var updated_val = $('.edit-moving-extra_value').val();
    $("*[data-find_extra='"+find_extra+"']").text(updated_val);
    $("*[data-find_extra='"+find_extra+"']").data("moving_value", updated_val);
    $('#edit-moving-extra').modal('hide');
  });

  $(document).on('click', '.add_new_btn', function(){
    $('.moving-extra_value').val('');
  });

  //edit-building-type-pickup
  $(document).on('click', '.walkup_full_content', function(){
    $('#edit-building-type-pickup').modal();
    $('.edit-pickup-value').val('');
    var success_value = $(this).data('edit_pickup_value');
    $('.edit-pickup-value').val(success_value);
  });

  $(document).on('click', '.edit-pickup-ok', function(){
    var success_value = $('.edit-pickup-value').val();
    $('#edit-building-type-pickup').modal('hide');
    if (success_value != '') {
      $('.edit-pickup-value-append').html('');
      var append_value = "<p><span class='walkup_full_content' data-edit_pickup_value='"+success_value+"'>"+success_value+"</span><span class='pull-right pickup_cancel_btn'><i class='fa fa-2x fa-times-circle-o'></i></span></p>"
      $('.edit-pickup-value-append').html(append_value);
    }
  });

  // edit-building-type-destination
  $(document).on('click', '.destination_full_content', function(){
    $('#edit-building-type-destination').modal();
    $('.edit-destination-value').val('');
    var success_value = $(this).data('edit_destination_value');
    $('.edit-destination-value').val(success_value);
  });

  $(document).on('click', '.edit-destination-ok', function(){
    var success_value = $('.edit-destination-value').val();
    $('#edit-building-type-destination').modal('hide');
    if (success_value != '') {
      $('.edit-destination-value-append').html('');
      var append_value = "<p><span class='destination_full_content' data-edit_destination_value='"+success_value+"'>"+success_value+"</span><span class='pull-right destination_cancel_btn'><i class='fa fa-2x fa-times-circle-o'></i></span></p>"
      $('.edit-destination-value-append').html(append_value);
    }
  });

  //size_of_move
  $(document).on('click', '.size_of_move_ok', function(){
    $('#size-of-your-move').modal('hide');
    var success_value = $('.size_of_move_value').val();
    if (success_value != '') {
      localStorage.setItem('size_of_move', success_value)
      $('.item1').prop('checked', true);
      $('.size-of-move-val-check-link').html('');
      var append_value = "<a href='#building-type-setion' data-section_id='#photos-section' class='smooth_scroll'>Skip</a>";
      $('.size-of-move-val-check-link').html(append_value);
      $('.size-of-move-val-check-img').html('');
      var img_append_value = "<img class='icon-image back_btn' src='/assets/back btn.jpg' data-back_section='#photos-section' data-current_section='#building-type-setion'>";
      $('.size-of-move-val-check-img').html(img_append_value);
      $('.size-of-move-val-check-div').html('');
      var div_append_value = "<a href='#building-type-setion' id='add_images' data-section_id='#photos-section' class='hidden-btn smooth_scroll'>CONTINUE</a><a class='image-div-submit add_images_section' id='move-images'>CONTINUE</a>";
      $('.size-of-move-val-check-div').html(div_append_value);
    }
  });

  $(document).on('click', '.size_of_move_cancel', function(){
    if ( $('.item1').is(':checked') ) {
      localStorage.setItem('size_of_move', '')
      $('.item1').prop('checked', false);
      $('.size-of-move-val-check-link').html('');
      var append_value = "<a href='#moving-extra-section' data-section_id='#photos-section' class='smooth_scroll'>Skip</a>";
      $('.size-of-move-val-check-link').html(append_value);
      $('.size-of-move-val-check-img').html('');
      var img_append_value = "<img class='icon-image back_btn' src='/assets/back btn.jpg' data-back_section='#moving-extra-section' data-current_section='#building-type-setion'>";
      $('.size-of-move-val-check-img').html(img_append_value);
      $('.size-of-move-val-check-div').html('');
      var div_append_value = "<a href='#moving-extra-section' id='add_images' data-section_id='#photos-section' class='hidden-btn smooth_scroll'>CONTINUE</a><a class='image-div-submit add_images_section' id='move-images'>CONTINUE</a>";
      $('.size-of-move-val-check-div').html(div_append_value);
    }
  });

  // image-upload
  $('.upload-btn').on('click', function(e){
    e.preventDefault();
    $('#image_upload').trigger('click');
  });

  $('.image_upload_btn').on('click', function(e){
    e.preventDefault();
    $('#image_upload').trigger('click');
  });

  $(document).on('click', '.image-cancel', function(){
    $(this).closest('.hide_image_div').remove()
  });

  $('#image_upload').on('change', function(e){
    var image_count = $('.image-content').find('.hide_image_div').length;
    var len = this.files.length;
    var limit = image_count+len;
    var files = $(this).val();
    imageData = []
    if (len != '') {
      if (limit > 20) {
        // alert('Maximum of 20 images only can able to upload');
        $('#page_valid').modal();
        $('.validation_popup_content').html('');
        var validation_content = "Maximum of 20 images only can able to upload.";
        $('.validation_popup_content').html(validation_content);
      }else{
        var formData = new FormData();
        for (var i=0, len; i < len; i++) {
        var aa = e.target.files[i]
        formData.append('file['+i+']', aa);
        console.log(e.target.files[i].name)
        }
        $('.modal_loading').css("display", "block");
        $.ajax({
          url: 'take_photos',
          type: 'POST',
          data: formData,
          contentType: false,
          processData: false,
          timeout: 100000,
          success: function (data) {
            $.each(data.image, function(index, el) {
              $('.image-content').append("<div class='col-md-4 hide_image_div'><div class='col-md-12 portfolio-item'><img class='mphotos' src="+ location.protocol + "//"+ location.host + el +" alt=''><div class='image-cancel'><span><i class='fa fa-2x fa-times-circle-o'></i></span></div></div></div>");
            });
            $('.modal_loading').css("display", "none");
          },
          error: function (o) {
            console.log(o);
            $('.modal_loading').css("display", "none");
            alert("Timeout")
          }
        });
      }
    }else{
      $('.image-content').html('');
    }
  });

  // building-type-setion
  $(document).on('change', '.pickup-walk-up', function(e){
    if ( $('.pickup-elevator').is(':checked') ) {
      $('.pickup-elevator').prop('checked', false)
    }
    if ( $('.pickup-residential').is(':checked') ) {
      $('.pickup-residential').prop('checked', false)
    }
    if (!$('.new_pickup-success-content').is(':empty')) {
      if ( !$('.pickup-walk-up').is(':checked') ) {
        $('.new_pickup-success-content').css("display", "none");
        $('.pickup-success-content').css("display", "block");
      }
    }
    if (!$('.new_pickup-success-content').is(':empty')) {
      if ( $('.pickup-walk-up').is(':checked') ) {
        $('.new_pickup-success-content').css("display", "block");
        $('.pickup-success-content').css("display", "none");
      }
    }
    if ($('.new_pickup-success-content').is(':empty')) {
      if(e.target.checked){
        $('.pickup-value').val('');
        $('#building-type-pickup').modal();
      }
    }
  });

  $(document).on('change', '.pickup-elevator', function(){
    if ( $('.pickup-walk-up').is(':checked') ) {
      $('.pickup-walk-up').prop('checked', false)
    }else{
      $('.pickup-elevator').prop('checked', true)
    }
    if ( $('.pickup-residential').is(':checked') ) {
      $('.pickup-residential').prop('checked', false)
    }else{
      $('.pickup-elevator').prop('checked', true)
    }
  });

  $(document).on('change', '.pickup-residential', function(){
    if ( $('.pickup-walk-up').is(':checked') ) {
      $('.pickup-walk-up').prop('checked', false)
    }else{
      $('.pickup-residential').prop('checked', true)
    }
    if ( $('.pickup-elevator').is(':checked') ) {
      $('.pickup-elevator').prop('checked', false)
    }else{
      $('.pickup-residential').prop('checked', true)
    }
  });

  $(document).on('change', '.destination-walk-up', function(e){
    if ( $('.destination-elevator').is(':checked') ) {
      $('.destination-elevator').prop('checked', false)
    }
    if ( $('.destination-residential').is(':checked') ) {
      $('.destination-residential').prop('checked', false)
    }
    if (!$('.new_destination-success-content').is(':empty')) {
      if ( !$('.destination-walk-up').is(':checked') ) {
        $('.new_destination-success-content').css("display", "none");
        $('.destination-success-content').css("display", "block");
      }
    }
    if (!$('.new_destination-success-content').is(':empty')) {
      if ( $('.destination-walk-up').is(':checked') ) {
        $('.new_destination-success-content').css("display", "block");
        $('.destination-success-content').css("display", "none");
      }
    }
    if ($('.new_destination-success-content').is(':empty')) {
      if(e.target.checked){
        $('.destination-value').val('');
        $('#building-type-destination').modal();
      }
    }
  });

  $(document).on('change', '.destination-elevator', function(){
    if ( $('.destination-walk-up').is(':checked') ) {
      $('.destination-walk-up').prop('checked', false)
    }else{
      $('.destination-elevator').prop('checked', true)
    }
    if ( $('.destination-residential').is(':checked') ) {
      $('.destination-residential').prop('checked', false)
    }else{
      $('.destination-elevator').prop('checked', true)
    }
  });

  $(document).on('change', '.destination-residential', function(){
    if ( $('.destination-walk-up').is(':checked') ) {
      $('.destination-walk-up').prop('checked', false)
    }else{
      $('.destination-residential').prop('checked', true)
    }
    if ( $('.destination-elevator').is(':checked') ) {
      $('.destination-elevator').prop('checked', false)
    }else{
      $('.destination-residential').prop('checked', true)
    }
  });

  // room-type-section
  $(document).on('change', '.item1', function(e){
    if ( $('.item2').is(':checked') ) {
      $('.item2').prop('checked', false)
    }
    if ( $('.item3').is(':checked') ) {
      $('.item3').prop('checked', false)
    }
    if ( $('.item4').is(':checked') ) {
      $('.item4').prop('checked', false)
    }
    if(e.target.checked){
      $('.size_of_move_value').val('');
      $('#size-of-your-move').modal();
    }
  });

  $(document).on('change', '.item2', function(){
    if ( $('.item1').is(':checked') ) {
      $('.item1').prop('checked', false)
      $('.size-of-move-val-check-link').html('');
      var append_value = "<a href='#moving-extra-section' data-section_id='#photos-section' class='smooth_scroll'>Skip</a>";
      $('.size-of-move-val-check-link').html(append_value);
      $('.size-of-move-val-check-img').html('');
      var img_append_value = "<img class='icon-image back_btn' src='/assets/back btn.jpg' data-back_section='#moving-extra-section' data-current_section='#building-type-setion'>";
      $('.size-of-move-val-check-img').html(img_append_value);
      $('.size-of-move-val-check-div').html('');
      var div_append_value = "<a href='#moving-extra-section' id='add_images' data-section_id='#photos-section' class='hidden-btn smooth_scroll'>CONTINUE</a><a class='image-div-submit add_images_section' id='move-images'>CONTINUE</a>";
      $('.size-of-move-val-check-div').html(div_append_value);
    }
    if ( $('.item3').is(':checked') ) {
      $('.item3').prop('checked', false)
    }
    if ( $('.item4').is(':checked') ) {
      $('.item4').prop('checked', false)
    }
  });

  $(document).on('change', '.item3', function(){
    if ( $('.item1').is(':checked') ) {
      $('.item1').prop('checked', false)
      $('.size-of-move-val-check-link').html('');
      var append_value = "<a href='#moving-extra-section' data-section_id='#photos-section' class='smooth_scroll'>Skip</a>";
      $('.size-of-move-val-check-link').html(append_value);
      $('.size-of-move-val-check-img').html('');
      var img_append_value = "<img class='icon-image back_btn' src='/assets/back btn.jpg' data-back_section='#moving-extra-section' data-current_section='#building-type-setion'>";
      $('.size-of-move-val-check-img').html(img_append_value);
      $('.size-of-move-val-check-div').html('');
      var div_append_value = "<a href='#moving-extra-section' id='add_images' data-section_id='#photos-section' class='hidden-btn smooth_scroll'>CONTINUE</a><a class='image-div-submit add_images_section' id='move-images'>CONTINUE</a>";
      $('.size-of-move-val-check-div').html(div_append_value);
    }
    if ( $('.item2').is(':checked') ) {
      $('.item2').prop('checked', false)
    }
    if ( $('.item4').is(':checked') ) {
      $('.item4').prop('checked', false)
    }
  });

  $(document).on('change', '.item4', function(){
    if ( $('.item1').is(':checked') ) {
      $('.item1').prop('checked', false)
      $('.size-of-move-val-check-link').html('');
      var link_append_value = "<a href='#moving-extra-section' data-section_id='#photos-section' class='smooth_scroll'>Skip</a>";
      $('.size-of-move-val-check-link').html(link_append_value);
      $('.size-of-move-val-check-img').html('');
      var img_append_value = "<img class='icon-image back_btn' src='/assets/back btn.jpg' data-back_section='#moving-extra-section' data-current_section='#building-type-setion'>";
      $('.size-of-move-val-check-img').html(img_append_value);
      $('.size-of-move-val-check-div').html('');
      var div_append_value = "<a href='#moving-extra-section' id='add_images' data-section_id='#photos-section' class='hidden-btn smooth_scroll'>CONTINUE</a><a class='image-div-submit add_images_section' id='move-images'>CONTINUE</a>";
      $('.size-of-move-val-check-div').html(div_append_value);
    }
    if ( $('.item2').is(':checked') ) {
      $('.item2').prop('checked', false)
    }
    if ( $('.item3').is(':checked') ) {
      $('.item3').prop('checked', false)
    }
  });

  // moving-extra-section popup ok
  $(document).on('click', '.moving_extra_ok', function(){
    var success_value_count = $('.popup_success_content').find('.ins-align').length;
    $('#moving-extra').modal('hide');
    var success_value = $('.moving-extra_value').val();
    $('.new_popup_success_content').html('');
    if ( $('.moving-extra-model-yes').is(':checked') ) {
      $('.moving-extra-model-no').prop('checked', false)
      $('.moving-extra-model-yes').prop('checked', true)
    }else{
      $('.moving-extra-model-no').prop('checked', false)
      $('.moving-extra-model-yes').prop('checked', true)
    }
    if (success_value_count < 3) {
      if (success_value != '') {
        var success_value = $('.moving-extra_value').val();
        var random_val = Math.random();
        var success_content = "<div class='ins-align'><div class='popup_success'><p><span class='full_content' data-find_extra='"+random_val+"'data-moving_value='"+success_value+"'>"+success_value+"</span><span class='pull-right popup_success_cancel_btn'><i class='fa fa-2x fa-times-circle-o'></i></span></p></div></div>";
        if (success_value_count == 2) {
          $('.add_new_btn').css("display", "none");
        }else{
          $('.add_new_btn').css("display", "block");
        }
        $('.moving-extra_value').val('');
        $('.popup_success_content').append(success_content);
      }else{
        if ($('.popup_success_content').is(':empty')) {
          $('.add_new_btn').css("display", "none");
          var normal_content = "<div class='ins-align'><input id='no' type='checkbox' class='new-app-ins moving-extra-model-no'><label for='no'>No</label></div>";
          $('.new_popup_success_content').append(normal_content);
          if ( $('.moving-extra-model-yes').is(':checked') ) {
            $('.moving-extra-model-yes').prop('checked', false)
          }
        }
      }
    }
  });

  $(document).on('click', '.popup_success_cancel_btn', function(){
    var success_value_count = $('.popup_success_content').find('.ins-align').length;
    if (success_value_count <= 3) {
      $('.add_new_btn').css("display", "block");
    }
    $(this).closest('.ins-align').remove()
    if ($('.popup_success_content').is(':empty')) {
      $('.add_new_btn').css("display", "none");
      var normal_content = "<div class='ins-align'><input id='no' type='checkbox' class='new-app-ins moving-extra-model-no'><label for='no'>No</label></div>";
      $('.new_popup_success_content').append(normal_content);
      if ( $('.moving-extra-model-yes').is(':checked') ) {
        $('.moving-extra-model-yes').prop('checked', false)
      }
    }
  });

  // moving-extra-section popup cancel
  $('.moving_extra_cancel').on('click', function(){
    if ( $('.moving-extra-model-yes').is(':checked') ) {
      $('.moving-extra-model-no').prop('checked', false)
      $('.moving-extra-model-yes').prop('checked', false)
    }
    if (!$('.popup_success_content').is(':empty')) {
      if ( !$('.moving-extra-model-yes').is(':checked') ) {
        $('.moving-extra-model-yes').prop('checked', true)
      }
    }else{
      if ( !$('.moving-extra-model-yes').is(':checked') ) {
        $('.moving-extra-model-yes').prop('checked', false)
      }
    }
  });

  // moving-extra-section
  $('.moving-extra-model-yes').on('change', function(e){
    if ( $('.moving-extra-model-no').is(':checked') ) {
      $('.moving-extra-model-no').prop('checked', false)
    }
    if ( !$('.moving-extra-model-yes').is(':checked') && !$('.popup_success_content').is(':empty')) {
      $('.popup_success_content').css("display", "none");
      $('.add_new_btn').css("display", "none");
      var normal_content = "<div class='ins-align'><input id='no' type='checkbox' class='new-app-ins moving-extra-model-no'><label for='no'>No</label></div>";
      $('.new_popup_success_content').append(normal_content);
    }
    if ( $('.moving-extra-model-yes').is(':checked') && !$('.popup_success_content').is(':empty')) {
      $('.popup_success_content').css("display", "block");
      $('.add_new_btn').css("display", "block");
      $('.moving-extra_value').val('');
      $('.new_popup_success_content').html('');
    }
    if(e.target.checked && $('.popup_success_content').is(':empty')){
      $('#moving-extra').modal();
      $('.moving-extra_value').val('');
    }
  });
  $(document).on('change', '.moving-extra-model-no', function(){
    if ( $('.moving-extra-model-yes').is(':checked') ) {
      $('.moving-extra-model-yes').prop('checked', false)
    }else{
      $('.moving-extra-model-no').prop('checked', true)
    }
  });

  // destination-cancel
  $('.destination-cancel').on('click', function(){
    if ( $('.destination-walk-up').is(':checked') ) {
      $('.destination-walk-up').prop('checked', false)
    }
    if (!$('.new_destination-success-content').is(':empty')) {
      if ( !$('.destination-walk-up').is(':checked') ) {
        $('.destination-walk-up').prop('checked', true)
      }
    }else{
      if ( $('.destination-walk-up').is(':checked') ) {
        $('.destination-walk-up').prop('checked', false)
      }
    }
  });
  $('.destination-ok').on('click', function(){
    $('#building-type-destination').modal('hide');
    $('.destination-success-content').css("display", "none");
    var success_value = $('.destination-value').val();
    if (success_value != '') {
      var success_content = "<div class='ins-align'><div class='popup_success edit-destination-value-append'><p><span class='destination_full_content' data-edit_destination_value='"+success_value+"'>"+success_value+"</span><span class='pull-right destination_cancel_btn'><i class='fa fa-2x fa-times-circle-o'></i></span></p></div></div>";
      $('.new_destination-success-content').html(success_content);
    }else{
      if ($('.new_destination-success-content').is(':empty')) {
        $('.destination-success-content').css("display", "none");
        $('.destination-success-content').css("display", "block");
        if ( $('.destination-walk-up').is(':checked') ) {
          $('.destination-walk-up').prop('checked', false)
        } 
      }
    }
  });
  $(document).on('click', '.destination_cancel_btn', function(){
    $(this).closest('.ins-align').remove()
    if ($('.new_destination-success-content').is(':empty')) {
      $('.destination-success-content').css("display", "none");
      $('.destination-success-content').css("display", "block");
      if ( $('.destination-walk-up').is(':checked') ) {
        $('.destination-walk-up').prop('checked', false)
      } 
    }
  });

  // pickup-cancel
  $('.pickup-cancel').on('click', function(){
    if ( $('.pickup-walk-up').is(':checked') ) {
      $('.pickup-walk-up').prop('checked', false)
    }
    if ($('.new_pickup-success-content').is(':empty')) {
      if ( $('.pickup-walk-up').is(':checked') ) {
        $('.pickup-walk-up').prop('checked', false)
      }
    }else{
      if ( !$('.pickup-walk-up').is(':checked') ) {
        $('.pickup-walk-up').prop('checked', true)
      } 
    }
  });
  $('.pickup-ok').on('click', function(){
    $('#building-type-pickup').modal('hide');
    $('.pickup-success-content').css("display", "none");
    var success_value = $('.pickup-value').val();
    if (success_value != '') {
      var success_content = "<div class='ins-align'><div class='popup_success edit-pickup-value-append'><p><span class='walkup_full_content' data-edit_pickup_value='"+success_value+"'>"+success_value+"</span><span class='pull-right pickup_cancel_btn'><i class='fa fa-2x fa-times-circle-o'></i></span></p></div></div>";
      $('.new_pickup-success-content').html(success_content);
    }else{
      if ($('.new_pickup-success-content').is(':empty')) {    
        $('.pickup-success-content').css("display", "block");
        if ( $('.pickup-walk-up').is(':checked') ) {
          $('.pickup-walk-up').prop('checked', false)
        }
      }
    }
  });
  $(document).on('click', '.pickup_cancel_btn', function(){
    $(this).closest('.ins-align').remove()
    if ($('.new_pickup-success-content').is(':empty')) {
      $('.pickup-success-content').css("display", "block");
      if ( $('.pickup-walk-up').is(':checked') ) {
        $('.pickup-walk-up').prop('checked', false)
      }
    }
  });
});