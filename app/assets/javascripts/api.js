$(function(){
  $(document).on('click', '.start_a_move_btn', function(){
    window.location.href = "/start-a-move"
  });
});
$(function(){
  const API_URL = "http://45.56.72.52/api/userapi/";
  var current_user = localStorage.getItem('user_id');
  localStorage.setItem('statmov_signin', "");
  var homepageShare = localStorage.getItem('homapage_share');
  var current_user = localStorage.getItem('user_id');
  if (current_user != "" && current_user != null && current_user != undefined) {
    $('.user-login-logut').html("<a href='javascript:;' class='user-logout'>Sign Out</a>");
    localStorage.setItem('name', "")
    localStorage.setItem('phone', "")
    $('.account_settings').show();
    $('.payment_methods').show();
    $('.user_moves').show();
    var user_email = localStorage.getItem('email');
    var moves_count = localStorage.getItem('moves_count');
    if (moves_count == 0) {
      $('.moves-count').hide();
      $('.side-menu-moves-count').hide();
    }else {
      $('.moves-count mark').text(moves_count)
      $('.side-menu-moves-count mark').text(moves_count)
      $('.moves-count').show();
      $('.side-menu-moves-count').show();
    }
    if (window.location.pathname == "/signin" || window.location.pathname == "/signup") {
      window.location.href = "/";
    }
    $(".mbl-side-menu").show();
    $(".nav-signin").hide();
    $(".nav-signup").hide();
  }else {
    $('.user-login-logut').html("<a href='/signin'>Sign In</a>")
    $('.user-signup').html("<a href='/signup'>Sign Up</a>")
    $('.user_moves').hide();
    $('.side-menu-moves-count').hide();
    $(".mbl-side-menu").hide();
    $(".nav-signin").show();
    $(".nav-signup").show();
    $('.account_settings').hide();
    $('.payment_methods').hide();
  }
  //session check
  if (current_user != "" && current_user != null && current_user != undefined) {
    $('.check_user_session').html('');
    if (homepageShare == "true") {
      $('.fb-promocode').show();
      $('#shareBtn').hide();
    }
    var submit_move_btn = "<button class='image-div-submit' id='start_mov_btn'>Start your move</button>";
    $('.check_user_session').html(submit_move_btn );
  }else{
    $('.check_user_session').html('');
    $('.fb-promocode').hide();
    $('#shareBtn').show();
    // var submit_btn = "<div class='pull-left'><button class='sign-btn' data-toggle='modal' data-target='#sign-in'>sign In</button></div><div class='pull-right'><button class='sign-btn' data-toggle='modal' data-target='#sign-up'>Sign Up</button></div>";
    var submit_btn = "<button class='image-div-submit' id='start_mov_login_btn'>Start your move</button>";
    $('.check_user_session').html(submit_btn);
  }
  // get rooms and map section valitation
  $(document).on('click', '.map-section-btn', function(){
    var pickup_address = $('#start').val();
    var destionation_address = $('#end').val();
    if (pickup_address != '' && destionation_address != '') {
      $('#size_of_move').click();
      var item1 = $('.item1').is(':checked');
      var item2 = $('.item2').is(':checked');
      var item3 = $('.item3').is(':checked');
      var item4 = $('.item4').is(':checked');
      var item5 = $('.item5').is(':checked');
      var item6 = $('.item6').is(':checked');
      var item7 = $('.item7').is(':checked');
      if (item1 != true && item2 != true && item3 != true && item4 != true && item5 != true && item6 != true && item7 != true) {
        $.ajax({
        url: API_URL+'getRoomType',
        method: 'GET',
        success: function (data) {
          console.log('success');
          console.log(data);
          console.log(data.data);
          if (data.data != '') {
            $('.room_image').html('');
            $.each(data.data ,function(key, image) {
              console.log(image)
              if (key == 0){
                var get_room_image = "<div class='col-md-4'><div class='col-md-12 mt-25'><div class='edit-icon edit-check-div_"+key+"'><img src='assets/edit-icon.png'></div><img class='move-type' src='/assets/add-image.jpg'><label for='room_image"+image.id+"' class='full-label'></label><div class='check-div'><div class='ins-image-align'><input id='room_image"+image.id+"' type='checkbox' class='new-app-ins item"+image.id+"' name='movesize' value='"+image.name+"' data-value='"+image.id+"' ><label>"+image.name+"</label></div></div></div></div>";
                $('.room_image').append(get_room_image);
              }
              else if (key == 5 || key == 6) {
                var get_room_image = "<div class='col-md-4'><div class='col-md-12 mt-25'><div class='edit-icon edit-check-div_"+key+"'><img src='assets/edit-icon.png'></div><img class='move-type' src='"+image.image+"'><label for='room_image"+image.id+"' class='full-label'></label><div class='check-div'><div class='ins-image-align'><input id='room_image"+image.id+"' type='checkbox' class='new-app-ins item"+image.id+"' name='movesize' value='"+image.name+"' data-value='"+image.id+"' ><label>"+image.name+"</label></div></div></div></div>";
                $('.room_image').append(get_room_image);
              }else {
                var get_room_image = "<div class='col-md-4'><div class='col-md-12 mt-25'><img class='move-type' src='"+image.image+"'><label for='room_image"+image.id+"' class='full-label'></label><div class='check-div'><div class='ins-image-align'><input id='room_image"+image.id+"' type='checkbox' class='new-app-ins item"+image.id+"' name='movesize' value='"+image.name+"' data-value='"+image.id+"' ><label>"+image.name+"</label></div></div></div></div>";
                $('.room_image').append(get_room_image);
              }
            });
          }
        },
        error: function (o) {
          console.log(o);
        }
        });
      }
    }else{
      $('#page_valid').modal();
      $('.validation_popup_content').html('');
      var validation_content = "Enter both pickup address and destination address.";
      $('.validation_popup_content').html(validation_content);
    }
  });
  // room type validation
  $(document).on('click', '.room_type_check', function(){
    var item1 = $('.item1').is(':checked');
    var item2 = $('.item2').is(':checked');
    var item3 = $('.item3').is(':checked');
    var item4 = $('.item4').is(':checked');
    var item5 = $('.item5').is(':checked');
    var item6 = $('.item6').is(':checked');
    var item7 = $('.item7').is(':checked');
    if (item1 != true){
      $('.size_of_move_value').val('');
    }
    if (item1 == true || item2 == true || item3 == true || item4 == true || item5 == true || item6 == true || item7 == true) {
      $('#room_type').click();
    }else{
      $('#page_valid').modal();
      $('.validation_popup_content').html('');
      var validation_content = "Select room Type.";
      $('.validation_popup_content').html(validation_content);
    }
  });
  // add_images_section
  $(document).on('click', '.add_images_section', function(){
    var image_check = $('#image_upload').val();
    if (image_check != '' || image_check == undefined) {
      $('#add_images').click();
    }else{
      $('#page_valid').modal();
      $('.validation_popup_content').html('');
      var validation_content = "Add at least one picture or click skip below continue button.";
      $('.validation_popup_content').html(validation_content);
    }
  });
  // walk_up_section
  $(document).on('click', '.walk_up_btn', function(){
    var item1 = $('.pickup-walk-up').is(':checked');
    var item2 = $('.pickup-elevator').is(':checked');
    var item3 = $('.pickup-residential').is(':checked');
    var item4 = $('.destination-walk-up').is(':checked');
    var item5 = $('.destination-elevator').is(':checked');
    var item6 = $('.destination-residential').is(':checked');
    if ((item1 == true || item2 == true || item3 == true) && (item4 == true || item5 == true || item6 == true) ) {
      $('#walk_up_section').click();
    }else{
      $('#page_valid').modal();
      $('.validation_popup_content').html('');
      var validation_content = "Choose 'Walk Up', 'Elevator' or 'Residential Home' before proceeding.";
      $('.validation_popup_content').html(validation_content);
    }
  });
  // userLogin  
  $(document).on('click', '.sign_in_btn', function() {
    var email = $('.sign_in_email').val();
    var password = $('.sign_in_password').val();
    var device_id = '';
    var token = '';
    var login_params = '{"email":"'+email+'","password":"'+password+'","device_id":"'+device_id+'","token":"'+token+'"}'
    console.log(login_params)
    console.log("login_params")
    if (email != '' && password != '') {  
      $.ajax({
        url: API_URL+'userLogin',
        method: 'POST',
        data: login_params,
        success: function (data) {
          console.log('success');
          console.log(data);
          if (data.status == true) {
            localStorage.setItem('full_name', data.data.fullname)
            localStorage.setItem('phone_number', data.data.phone)
            $('#sign-in').modal('hide');
            console.log(data.data.user_id);
            console.log(localStorage.setItem('user_id', data.data.user_id));
            console.log(localStorage.getItem('user_id'));
            localStorage.setItem('email', data.data.email);
            var current_user = localStorage.getItem('user_id');
            if (current_user != "" && current_user != null && current_user != undefined) {
              $('.check_user_session').html('');
              var submit_move_btn = "<button class='image-div-submit' id='start_mov_btn'>Start your move</button>";
              $('.check_user_session').html(submit_move_btn );
            }else{
              $('.check_user_session').html('');
              // var submit_btn = "<div class='pull-left'><button class='sign-btn' data-toggle='modal' data-target='#sign-in'>Sign In</button></div><div class='pull-right'><button class='sign-btn' data-toggle='modal' data-target='#sign-up'>Sign Up</button></div>";
              var submit_btn = "<button class='image-div-submit' id='start_mov_login_btn'>Start your move</button>";
              $('.check_user_session').html(submit_btn);
            }
          }
        },
        error: function (o) {
          console.log(o);
        }
      });
    }
    else{
      alert('Invalid Email or Password');
    }
  });

  // UserRegistration
  $(document).on('click', '.sign_up_btn', function() {
    var email = $('.sign_up_email').val();
    var password = $('.sign_up_password').val();
    var re_password = $('.sign_up_conform_password').val();
    var device_id = '';
    var token = '';
    var sign_up_params = '{"email":"'+email+'","re_password":"'+re_password+'","device_id":"'+device_id+'","password":"'+password+'","token":"'+token+'"}'
    if (email != '' && password != '' && re_password != '') { 
      if (password == re_password) {
        $.ajax({
          url: API_URL+'UserRegistration',
          method: 'POST',
          data: sign_up_params,
          success: function (data) {
            console.log('success');
            console.log(data);
            if (data.status == true) {
              localStorage.setItem('full_name', data.data.fullname)
              localStorage.setItem('phone_number', data.data.phone)
              $('#sign-up').modal('hide');
              console.log(data.data.user_id);
              console.log(localStorage.setItem('user_id', data.data.user_id));
              console.log(localStorage.getItem('user_id'));
              localStorage.setItem('email', data.data.email)
              var current_user = localStorage.getItem('user_id');
              if (current_user != "" && current_user != null && current_user != undefined) {
                $('.check_user_session').html('');
                var submit_move_btn = "<button class='image-div-submit' id='start_mov_btn'>Start your move</button>";
                $('.check_user_session').html(submit_move_btn );
              }else{
                $('.check_user_session').html('');
                // var submit_btn = "<div class='pull-left'><button class='sign-btn' data-toggle='modal' data-target='#sign-in'>Sign In</button></div><div class='pull-right'><button class='sign-btn' data-toggle='modal' data-target='#sign-up'>Sign Up</button></div>";
                var submit_btn = "<button class='image-div-submit' id='start_mov_login_btn'>Start your move</button>";
                $('.check_user_session').html(submit_btn);
              }
            }
          },
          error: function (o) {
            console.log(o);
          }
        });
      }
      else{
        alert('Password and Confirmation password should be same');
      }
    }
    else{
      alert('Invalid Email or Password');
    }
  });

  // append value
  $(document).on('click', '#contact_show', function() {
    var name = $('#name').val();
    var phone = $('#phone').val();
    if (name == '' && phone == '') {
      $('#page_valid').modal();
      $('.validation_popup_content').html('');
      var validation_content = "Please Enter Name and Phone.";
      $('.validation_popup_content').html(validation_content);
    }
    else if (name == ''){
      $('#page_valid').modal();
      $('.validation_popup_content').html('');
      var validation_content = "Please Enter Name";
      $('.validation_popup_content').html(validation_content);
    }else if(phone == ''){
      $('#page_valid').modal();
      $('.validation_popup_content').html('');
      var validation_content = "Please Enter Phone.";
      $('.validation_popup_content').html(validation_content);
    }
    else {
      $('#contact_continue').click();
    }
  });
  // forgotPassword
  $(document).on('click', '.forget_password_btn', function() {
    var email = $('.forget_password_email').val();
    var device_id = ''
    var token = ''
    var forget_password_params = 'email='+email +'&device_id='+device_id +'&token='+token ;
    if (email != '') {  
      $.ajax({
        url: API_URL+'forgotPassword?'+forget_password_params,
        method: "POST",
        success: function(data) {
          console.log('success');
          console.log(data);
        },
        error: function(error) {
          console.log(error);
        }
      });
    }
    else{
      alert('Enter Your Email');
    }
  });

  // getTotalNotification
  $(document).on('click', '.get_notification_btn', function() {
    var user_id = $('.get_notification_user_id').val();
    var device_id = ''
    var token = ''
    var get_notification_params = 'user_id='+user_id +'&device_id='+device_id +'&token='+token ;
    if (user_id != '') {  
      $.ajax({
        url: API_URL+'UserRegistration?'+get_notification_params,
        method: "POST",
        success: function(data) {
          console.log('success');
          console.log(data);
        },
        error: function(error) {
          console.log(error);
        }
      });
    }
    else{
      alert('Invalid user_id');
    }
  });

  // socialLogin
  $(document).on('click', '.social_login_btn', function() {
    var fullname = $('.social_login_fullname').val();
    var profile_pic = $('.social_login_profile_pic').val();
    var email = $('.social_login_email').val();
    var social_id = $('.social_login_social_id').val();
    var device_id = ''
    var token = ''
    var social_login_params = 'fullname='+fullname +'&profile_pic='+profile_pic +'&email='+email +'&social_id='+social_id +'&device_id='+device_id +'&token='+token ;
    if (social_id != '') {  
      $.ajax({
        url: API_URL+'socialLogin?'+social_login_params,
        method: "POST",
        success: function(data) {
          console.log('success');
          console.log(data);
        },
        error: function(error) {
          console.log(error);
        }
      });
    }
    else{
      alert('Invalid social_id');
    }
  });

  // getMovingRequestList
  $(document).on('click', '.get_moving_request_btn', function() {
    var user_id = $('.get_moving_request_user_id').val();
    var device_id = ''
    var token = ''
    var get_moving_request_params = 'user_id='+user_id +'&device_id='+device_id +'&token='+token ;
    if (user_id != '') {  
      $.ajax({
        url: API_URL+'getMovingRequestList?'+get_moving_request_params,
        method: "POST",
        success: function(data) {
          console.log('success');
          console.log(data);
        },
        error: function(error) {
          console.log(error);
        }
      });
    }
    else{
      alert('Invalid user_id');
    }
  });

  // getMovingRequestProposal
  $(document).on('click', '.get_moving_proposal_btn', function() {
    var moving_request_id = $('.get_moving_proposal_moving_request_id').val();
    var user_id = $('.get_moving_proposal_user_id').val();
    var device_id = ''
    var token = ''
    var get_moving_proposal_params = 'moving_request_id='+moving_request_id +'&user_id='+user_id +'&device_id='+device_id +'&token='+token ;
    if (user_id != '') {  
      $.ajax({
        url: API_URL+'getMovingRequestProposal?'+get_moving_proposal_params,
        method: "POST",
        success: function(data) {
          console.log('success');
          console.log(data);
        },
        error: function(error) {
          console.log(error);
        }
      });
    }
    else{
      alert('Invalid user_id');
    }
  });

  // getMovingCompanyReview
  $(document).on('click', '.get_moving_company_review_btn', function() {
    var moving_company_id = $('.get_moving_company_review_company_id').val();
    var device_id = ''
    var token = ''
    var get_moving_company_review_params = 'moving_company_id='+moving_company_id +'&device_id='+device_id +'&token='+token ;
    if (moving_company_id != '') {  
      $.ajax({
        url: API_URL+'getMovingCompanyReview?'+get_moving_company_review_params,
        method: "POST",
        success: function(data) {
          console.log('success');
          console.log(data);
        },
        error: function(error) {
          console.log(error);
        }
      });
    }
    else{
      alert('Invalid moving_company_id');
    }
  });

  // submitReqeustReview
  $(document).on('click', '.submit_reqeust_review_btn', function() {
    var comment = $('.get_moving_company_review_comment').val();
    var moving_company_id = $('.get_moving_company_review_company_id').val();
    var rating = $('.get_moving_company_review_rating').val();
    var moving_request_id = $('.get_moving_company_review_moving_request_id').val();
    var device_id = ''
    var token = ''
    var submit_reqeust_review_params = 'comment='+comment +'&moving_company_id='+moving_company_id +'&rating='+rating +'&moving_request_id='+moving_request_id +'&device_id='+device_id +'&token='+token ;
    if (moving_company_id != '') {  
      $.ajax({
        url: API_URL+'submitReqeustReview?'+submit_reqeust_review_params,
        method: "POST",
        success: function(data) {
          console.log('success');
          console.log(data);
        },
        error: function(error) {
          console.log(error);
        }
      });
    }
    else{
      alert('Invalid moving_company_id');
    }
  });

  // getUserCards
  $(document).on('click', '.get_user_cards_btn', function() {
    var user_id = $('.get_user_cards_user_id').val();
    var device_id = ''
    var token = ''
    var get_user_cards_params = 'user_id='+user_id +'&device_id='+device_id +'&token='+token ;
    if (user_id != '') {  
      $.ajax({
        url: API_URL+'getUserCards?'+get_user_cards_params,
        method: "POST",
        success: function(data) {
          console.log('success');
          console.log(data);
        },
        error: function(error) {
          console.log(error);
        }
      });
    }
    else{
      alert('Invalid user_id');
    }
  });

  // captureCardDetail
  $(document).on('click', '.capture_card_detail_btn', function() {
    var card_detail = $('.capture_card_detail').val();
    var device_id = ''
    var token = ''
    var get_user_cards_params = 'user_id='+user_id +'&device_id='+device_id +'&token='+token ;
    if (user_id != '') {  
      $.ajax({
        url: API_URL+'captureCardDetail?'+get_user_cards_params,
        method: "POST",
        success: function(data) {
          console.log('success');
          console.log(data);
        },
        error: function(error) {
          console.log(error);
        }
      });
    }
    else{
      alert('Invalid user_id');
    }
  });

  // acceptProposal
  $(document).on('click', '.accept_proposal_btn', function() {
    var promo_code = $('.accept_proposal_promo_code').val();
    var card_id = $('.accept_proposal_card_id').val();
    var user_id = $('.accept_proposal_user_id').val();
    var proposal_id = $('.accept_proposal_proposal_id').val();
    var discounted_price = $('.accept_proposal_discounted_price').val();
    var discount = $('.accept_proposal_discount').val();
    var accept_proposal_params = 'promo_code='+promo_code +'&card_id='+card_id +'&user_id='+user_id +'&proposal_id='+proposal_id +'&discounted_price='+discounted_price +'&discount='+discount ;
    if (user_id != '') {  
      $.ajax({
        url: API_URL+'acceptProposal?'+accept_proposal_params,
        method: "POST",
        success: function(data) {
          console.log('success');
          console.log(data);
        },
        error: function(error) {
          console.log(error);
        }
      });
    }
    else{
      alert('Invalid user_id');
    }
  });

  // updateProfile
  $(document).on('click', '.update_profile_btn', function() {
    var phone = $('.update_profile_phone').val();
    var fullname = $('.update_profile_fullname').val();
    var user_id = $('.update_profile_user_id').val();
    var email = $('.update_profile_email').val();
    var update_profile_params = 'phone='+phone +'&fullname='+fullname +'&user_id='+user_id +'&email='+email ;
    if (user_id != '') {  
      $.ajax({
        url: API_URL+'updateProfile?'+get_user_cards_params,
        method: "POST",
        success: function(data) {
          console.log('success');
          console.log(data);
        },
        error: function(error) {
          console.log(error);
        }
      });
    }
    else{
      alert('Invalid user_id');
    }
  });

  // registerDeviceToken
  $(document).on('click', '.register_device_token_btn', function() {
    var device_id = $('.register_device_token_device_id').val();
    var token = $('.register_device_token_token').val();
    var user_id = $('.register_device_token_user_id').val();
    var get_user_cards_params = 'device_id='+device_id +'&token='+token +'&user_id='+user_id ;
    if (user_id != '') {  
      $.ajax({
        url: API_URL+'registerDeviceToken?'+get_user_cards_params,
        method: "POST",
        success: function(data) {
          console.log('success');
          console.log(data);
        },
        error: function(error) {
          console.log(error);
        }
      });
    }
    else{
      alert('Invalid user_id');
    }
  });

  // changePassword
  $(document).on('click', '.change_password_btn', function() {
    var current_password = $('.change_password_current_password').val();
    var confirm_password = $('.change_password_confirm_password').val();
    var user_id = $('.change_password_user_id').val();
    var new_password = $('.change_password_new_password').val();
    var change_password_params = 'current_password='+current_password +'&confirm_password='+confirm_password +'&user_id='+user_id +'&new_password='+new_password ;
    if (user_id != '') {  
      $.ajax({
        url: API_URL+'registerDeviceToken?'+change_password_params,
        method: "POST",
        success: function(data) {
          console.log('success');
          console.log(data);
        },
        error: function(error) {
          console.log(error);
        }
      });
    }
    else{
      alert('Invalid user_id');
    }
  });
  $(document).on('click', '#start_mov_login_btn', function(){
    var current_user = localStorage.getItem('user_id');
    if (current_user == "" || current_user == null || current_user == undefined) {
      localStorage.setItem('statmov_signin', "start a move page");
      // window.location.href = "/signin"
      $('.sign_in_body').css('display', 'block');
      $('.start_move_body').css('display', 'none');
    }
  });

  window.fbAsyncInit = function() {
    FB.init({
      appId  : '194169897743548',
      status : true, // check login status
      cookie : true, // enable cookies to allow the server to access the session
      xfbml  : true  // parse XFBML
    });
  };
  (function(d) {
    var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    d.getElementsByTagName('head')[0].appendChild(js);
  }(document));

// $(function() {
  $(document).on('click', '#fb_sign_in', function(e){
    e.preventDefault();


    FB.login(function(response) {
      if (response.authResponse) {
        $.getJSON('auth/facebook/callback?fb=true', function(json) {
          console.log(JSON.stringify(json))
          console.log("JSON.stringify(json)")
          var email = json.email;
          var name = json.name;
          var image = json.image;
          var token = json.token;
          var uid = json.uid;
          fb_signin_params = '{"fullname":"'+name+'","profile_pic":"'+image+'","email":"'+email+'","device_id":"","token":"'+token+'","social_id":"'+uid+'"}'
            if (email != '') {  
              $.ajax({
                url: API_URL+'socialLogin',
                method: 'POST',
                data: fb_signin_params,
                success: function (data) {
                  console.log(data);
                  localStorage.setItem('full_name', data.data.fullname)
                  localStorage.setItem('phone_number', data.data.phone)
                  localStorage.setItem('user_id', data.data.user_id)
                  localStorage.setItem('email', data.data.email);
                  var current_user = localStorage.getItem('user_id');
                  var startmov_login = localStorage.getItem('statmov_signin');
                  if (startmov_login != "" && startmov_login != null && startmov_login != undefined) {
                    if (current_user != "" && current_user != null && current_user != undefined) {
                      $('.user-login-logut').html("<a href='javascript:;' class='user-logout'>Sign Out</a>")
                      $('.sign_in_body').css('display', 'none');
                      $('.start_move_body').css('display', 'block');
                      $('.user-signup').css('display', 'none');
                      $('#sign-in').modal();
                      $('.user_moves').show();
                      $('.account_settings').show();
                      $('.payment_methods').show();
                      var submit_move_btn = "<button class='image-div-submit' id='start_mov_btn'>Start your move</button>";
                      $('.check_user_session').html(submit_move_btn );
                      userMovesRequest(current_user)
                    }else {
                      $('.user_moves').hide();
                      $('.user-login-logut').html("<a href='/signin'>Sign In</a>")
                      $('.user-signup').html("<a href='/signup'>Sign Up</a>")
                      $('.account_settings').hide();
                      $('.payment_methods').hide();
                    }
                    // window.location.href = '/start-a-move'
                  }else {
                    $('.user_moves').show();
                    var user_params = '{"user_id": '+ current_user +'}'
                    $.ajax({
                      url: API_URL+'getMovingRequestList',
                      type: 'POST',
                      data: user_params,
                    })
                    .done(function(data) {
                      console.log(data)
                      var count = data.data.upcoming.length
                      localStorage.setItem('moves_count', count);
                      $('.moves-count mark').text(count);
                      $('.side-menu-moves-count mark').text(count);
                      $('.moves-count').show();
                      $('.side-menu-moves-count').show();
                      window.location.href = "/";
                    })
                    .fail(function(data) {
                      localStorage.setItem('moves_count', 0);
                      $('.moves-count mark').text(0);
                      $('.side-menu-moves-count mark').text(0);
                      $('.moves-count').hide();
                      $('.side-menu-moves-count').hide();
                      window.location.href = "/";
                    });
                  }
                },
                error: function (o) {
                  console.log(o)
                }
              });
            }
            else{
              alert('Please Enter Email');
            }
        });
      }
    }, { scope: 'email,user_birthday, manage_pages, publish_pages, publish_actions' }); // These are the permissions you are requesting
  });
// });


});
$(document).on('click', '#start-end', function(){
  var start = $('#start').val();
  var end = $('#end').val();
  localStorage.setItem('move_from', start);
  // var move_from = localStorage.getItem('move_from');
  localStorage.setItem('move_end', end);
  // var move_end = localStorage.getItem('move_end');
  // console.log(move_from);
  // console.log(move_end);
});

$(document).on('click', '#move-size', function(){
  var msize = $('input[name=movesize]:checked');
  localStorage.setItem('move_size', msize.val());
  localStorage.setItem('move_size_id', msize.data('value'));
  if (msize.val() != "A single item") {
    localStorage.setItem('size_of_move', '');
  }
  if (msize.val() != "Small Office"){
    localStorage.setItem('size_of_small_move', '');
  }
  if (msize.val() != "Small Office"){
    localStorage.setItem('size_of_large_move', '');
  }
  // var move_size = localStorage.getItem('move_size');
});

$(document).on('click', '#move-images', function(){
  var photos = []
  localStorage.setItem("images", "");
  // if($('.image-content').is(".mphotos")) {
    $('.mphotos').each(function(index){
      // console.log($(this).attr('src'));
      photos[index] = $(this).attr('src')
    });
  // }
  localStorage.setItem("images", JSON.stringify(photos));
  // var storedNames = JSON.parse(localStorage.getItem("images"));
});

$(document).on('click', '#skip-upload-images', function(){
  var photos = []
  // if($('.image-content').is(".mphotos")) {
    $('.mphotos').each(function(index){
      // console.log($(this).attr('src'));
      photos[index] = $(this).attr('src')
    });
  // }
  localStorage.setItem("images", JSON.stringify(photos));
});

$(document).on('click', '#extra-large', function(){
  var items = []
  $('.popup_success p').each(function(index){
    items[index] = $(this).text();
  });
  localStorage.setItem("items", JSON.stringify(items));
  // var storedNames = JSON.parse(localStorage.getItem("items"));
});

$(document).on('click', '#pickup-destination', function(){
  var pickup = $('input[name=pickup]:checked');
  localStorage.setItem('pickup', pickup.val());
  localStorage.setItem('pickup_id', pickup.data('value'));

  var destination = $('input[name=destination]:checked');
  localStorage.setItem('destination', destination.val());
  localStorage.setItem('destination_id', destination.data('value'));

  var pickupArray = [];
  var desArray = [];
  $('.new_pickup-success-content .popup_success p').each(function(index){
    pickupArray[index] = $(this).text();
  });
  $('.new_destination-success-content .popup_success p').each(function(index){
    desArray[index] = $(this).text();
  });
  localStorage.setItem("pickuparray", "");
  localStorage.setItem("pickuparray", JSON.stringify(pickupArray));
  localStorage.setItem("destarray", "");
  localStorage.setItem("destarray", JSON.stringify(desArray));
});

$(document).on('click', '#date_move', function(){
  var movetime = $('#demo').val();
  localStorage.setItem('move_date', movetime);
  var flexDate = $('#date-flexible').is(':checked')
  var flextime = $('#time-flexible').is(':checked')
  localStorage.setItem('flexible_date', flexDate);
  localStorage.setItem('flexible_time', flextime);
  // localStorage.setItem('full_name', data.data.fullname)
  // localStorage.setItem('phone_number', data.data.phone) 
  var full_name = localStorage.getItem("full_name");
  var phone_number = localStorage.getItem("phone_number");
  var name = localStorage.getItem("name");
  var phone = localStorage.getItem("phone");
  if ((phone != "" && phone != null && phone != "undefined") && (name != "" && name != null && name != "undefined")){
    $("#name").val(name);
    $("#phone").val(phone);
  }else{
    $("#name").val(full_name);
    $("#phone").val(phone_number);
  }
});

$(document).on('click', '#contact_continue', function(){
  var name = $('#name').val();
  var phone = $('#phone').val();

  localStorage.setItem('name', name);
  localStorage.setItem('phone', phone);
  var size_of_move = localStorage.getItem('size_of_move')
  var size_of_small_move = localStorage.getItem('size_of_small_move')
  var size_of_large_move = localStorage.getItem('size_of_large_move')
  var move_size = localStorage.getItem('move_size')
  if (move_size != "" && move_size != null && move_size != "undefined") {
    $('.room_type_label-head').css('display', 'block');
    $('.result-size').text(move_size);
    if (size_of_move != "" && size_of_move != null && size_of_move != "undefined") {
      $('.size_of_move_text').text('(' + size_of_move + ')')
    }
    if (size_of_small_move != "" && size_of_small_move != null && size_of_small_move != "undefined") {
      $('.size_of_move_text').text('(' + size_of_small_move + ' sq ft)')
    }
    if (size_of_large_move != "" && size_of_large_move != null && size_of_large_move != "undefined") {
      $('.size_of_move_text').text('(' + size_of_large_move + ' sq ft)')
    }
  }
  else {
    $('.room_type_label-head').css('display', 'none');
  }
  var items = JSON.parse(localStorage.getItem("items"))
  if (items != "" && items != null && items != undefined) {
    $('.items_label-head').css('display', 'block');
    $('.result_extra_large').text(items);
  }
  else {
    $('.result_extra_large').text("")
    $('.items_label-head').css('display', 'none');
  }
  var pickup = localStorage.getItem('pickup')
  if (pickup != "" && pickup != null && pickup != "undefined") {
    $('.pickup_label-head').css('display', 'block');
    $('.result_pickup').text(pickup);
  }
  else {
    $('.pickup_label-head').css('display', 'none');
  }
  var destination = localStorage.getItem('destination')
  if (destination != "" && destination != null && destination != "undefined") {
    $('.destination_label-head').css('display', 'block');
    $('.result_destination').text(destination);
  }
  else {
    $('.destination_label-head').css('display', 'none');
  }
  var pickuparray = JSON.parse(localStorage.getItem("pickuparray"))
  if (pickuparray.length > 0 && pickuparray != null && pickuparray != undefined) {
    $('.result_pickup_walk').text('(' + pickuparray + ')');
  }
  else {
    $('.result_pickup_walk').text("");
  }
  var destarray = JSON.parse(localStorage.getItem("destarray"))
  if (destarray.length > 0 && destarray != null && destarray != undefined) {
    $('.result_destination_walk').text('(' + destarray + ')');
  }
  else {
    $('.result_destination_walk').text("");
  }
  var move_date = localStorage.getItem("move_date")
  if (move_date != "" && move_date != null && move_date != undefined) {
    $('.moving_date_label').css('display', 'block');
    $('.moving_date').text(move_date + " EST");
  }
  else {
    $('.moving_date_label').css('display', 'none');
  }
  var move_from = localStorage.getItem("move_from")
  if (move_from != "" && move_from != null && move_from != undefined) {
    $('.pickup_address_label').css('display', 'block');
    $('.pickup_address').text(move_from);
  }
  else {
    $('.pickup_address_label').css('display', 'none');
  }
  var move_end = localStorage.getItem("move_end")
  if (move_end != "" && move_end != null && move_end != undefined) {
    $('.destination_address_label').css('display', 'block');
    $('.destination_address').text(move_end);
  }
  else {
    $('.destination_address_label').css('display', 'none');
  }
  var name = localStorage.getItem("name")
  if (name != "" && name != null && name != undefined) $('.contact_name').text(name);
  var phone = localStorage.getItem("phone")
  if (phone != "" && phone != null && phone != undefined) $('.contact_phone').text(phone);
  var images = JSON.parse(localStorage.getItem("images"));

  $('.moving_images').html(" ")
  if (images != "" && images != null && images != undefined) {
    $('.moving_image_label').css('display', 'block');
    $.each(images, function(key, img){
      $('.moving_images').append("<div class='col-md-6 final-step-images'><img src="+ img +" alt='' width='170px' height='130px'></div>");
    });
  }
  else {
    $('.moving_image_label').css('display', 'none');
  }
});

$(document).on('click', '#start_mov_btn', function(){
  $(this).attr('disabled', 'disabled');
  $('.modal_loading').show();
  var API_URL = "http://45.56.72.52/api/userapi/";
  var move_size_id = localStorage.getItem('move_size_id')
  var move_size = localStorage.getItem('move_size');
  var items = JSON.parse(localStorage.getItem("items"))
  var pickup = localStorage.getItem('pickup')
  var pickup_id = localStorage.getItem('pickup_id')
  var destination = localStorage.getItem('destination')
  var destination_id = localStorage.getItem('destination_id')
  var pickuparray = JSON.parse(localStorage.getItem("pickuparray"))
  var destarray = JSON.parse(localStorage.getItem("destarray"))
  var move_date = localStorage.getItem("move_date")
  var move_from = localStorage.getItem("move_from")
  var move_end = localStorage.getItem("move_end")
  var name = localStorage.getItem("name")
  var phone = localStorage.getItem("phone")
  var current_user = localStorage.getItem('user_id');
  var images = JSON.parse(localStorage.getItem("images"));
  var flex_date = localStorage.getItem("flexible_date") === "true" ? 1 : 0
  var flex_time = localStorage.getItem("flexible_time") === "true" ? 1 : 0

  var d = new Date(Date.parse(move_date.replace(/-/g, "/")));

  var moving_date = (d.getFullYear() + "-" + ((d.getMonth() + 1)<10 ? "0"+(d.getMonth() + 1)  : (d.getMonth() + 1) ) + "-" + d.getDate() + " " + d.getHours() + ":" + (d.getMinutes() === "00" ? "00" : "30") + ":" + "00")
  
  address = move_from
    // Initialize the Geocoder
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log(results[0])
                var from_lat = results[0].geometry.location.lat();
                localStorage.setItem('from_lat', from_lat);
                var from_lon = results[0].geometry.location.lng();
                localStorage.setItem('from_lon', from_lon);
            }
        });
    }
    

  address = move_end
    // Initialize the Geocoder
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var to_lat = results[0].geometry.location.lat();
                localStorage.setItem('to_lat', to_lat);
                var to_lon = results[0].geometry.location.lng();
                localStorage.setItem('to_lon', to_lon);
            }
        });
    }
    

    var from_lat = localStorage.getItem('from_lat');
    var from_lon = localStorage.getItem('from_lon');
    var to_lat = localStorage.getItem('to_lat');
    var to_lon = localStorage.getItem('to_lon');
    var size_of_small_move = localStorage.getItem('size_of_small_move')
    var size_of_large_move = localStorage.getItem('size_of_large_move')
    if (size_of_small_move != "" && size_of_small_move != null && size_of_small_move != "undefined") {
      var size_move = size_of_small_move
    }
    if (size_of_large_move != "" && size_of_large_move != null && size_of_large_move != "undefined") {
      var size_move = size_of_large_move
    }else{
      var size_move = ""
    }

    var move_params = '{"contact_phone":"' +phone+ '","room_type_id":'+move_size_id+',"extra_large_item":'+JSON.stringify(items)+',"to_address":"'+move_end+'","from_longitude":"'+from_lon+'","to_latitude":"'+to_lat+'","building_type":'+pickup_id+',"dest_building_type":'+destination_id+',"single_item":"","from_latitude":"'+from_lat+'","dest_building_floor":"'+destarray+'","building_floor":"'+pickuparray+'","from_address":"'+move_from+'","move_date_time":"'+ moving_date +'","image":'+ JSON.stringify(images) +',"to_longitude":"'+to_lon+'","user_id":"'+current_user+'","contact_name":"'+name+'", "is_date_flexible":"'+flex_date+'", "is_time_flexible":"'+flex_time+'", "office_size": "'+size_move+'"}'
    var mail_move_params = {contact_phone: phone, room_type: move_size,extra_large_item: items,to_address: move_end,building_type: pickup,dest_building_type: destination, dest_building_floor: destarray, building_floor: pickuparray, from_address: move_from, move_date_time: move_date, user_id: current_user, contact_name: name }
    var email = localStorage.getItem('email');
    console.log(move_params)
    $.ajax({
      url: API_URL+'submitMovingRequest',
      method: 'POST',
      data: move_params,
      success: function(data) {
        console.log("success");
        console.log(data);
        $.ajax({
          url: 'move_success',
          method: 'POST',
          data: {move_params: mail_move_params, email: email, date: d}
        })
        .done(function() {
          console.log("success");
        });
        userMovesRequest(current_user);
        $('#start-move-done').modal();
        $('.modal_loading').hide();
        localStorage.setItem('name', "")
        localStorage.setItem('phone', "")
      },
      error: function(data) {
        console.log(data.message)
        $('.start-move-error-message').text(data['message']);
        $('#start-move-error').modal();
        $('.modal_loading').hide();
      }
    });
});

$(document).on('click', '.start-move-done-ok', function(){
  $('#start-move-done').modal('hide');
  window.location.href = "http://stage.moober.com/"
});

$(document).on('click', '.start-move-error-ok', function(){
  $('#start-move-error').modal('hide');
  $('#start_mov_btn').removeAttr('disabled', 'disabled');
});

$(document).on('click', '.web-login-btn', function(){
  var email = $('.sign_in_email').val();
  var password = $('.sign_in_password').val();
  userLogin(email, password)
  
});


$(document).on('click', '.website-signup-btn', function() {
    var email = $('.sign_up_email').val();
    var password = $('.sign_up_password').val();
    var re_password = $('.sign_up_conform_password').val();
    userRegistration(email, password, re_password)
  });
$(document).on('click', '.web-forget-btn', function(){
  var API_URL = "http://45.56.72.52/api/userapi/";
  var email = $('.forget_email').val();
  var forget_params = '{"email":"'+email+'"}'
  console.log(forget_params)
  if (email != '') { 
      $.ajax({
        url: API_URL+'forgotPassword',
        method: 'POST',
        data: forget_params,
        success: function (data) {
          var startmov_login = localStorage.getItem('statmov_signin');
          var current_user = localStorage.getItem('user_id');
          if (current_user == "" || current_user == null || current_user == undefined) {
            if (startmov_login != "" && startmov_login != null && startmov_login != undefined) {
              $('.forget_pswd_body').css('display', 'none');
              $('.start_move_body').css('display', 'block');
              var submit_btn = "<button class='image-div-submit' id='start_mov_login_btn'>Start your move</button>";
              $('.check_user_session').html(submit_btn);
            }else {
              window.location.href = "/"
            }
          }
        },
        error: function (o) {
          console.log(o);
        }
      });
    }
    else{
      alert('Enter Email');
    }
});

$(document).on('click', '.signup-link', function(){
  var current_user = localStorage.getItem('user_id');
  if (current_user == "" || current_user == null || current_user == undefined) {
    var startmov_login = localStorage.getItem('statmov_signin');
    if (startmov_login != "" && startmov_login != null && startmov_login != undefined) {
      // window.location.href = "/signin"
      $('.sign_in_body').css('display', 'none');
      $('.sign_up_body').css('display', 'block');
    }
    else {
      window.location.href = "/signup"
    }
  }
});

$(document).on('click', '.signin-link', function(){
  var current_user = localStorage.getItem('user_id');
  if (current_user == "" || current_user == null || current_user == undefined) {
    var startmov_login = localStorage.getItem('statmov_signin');
    if (startmov_login != "" && startmov_login != null && startmov_login != undefined) {
      // window.location.href = "/signin"
      $('.sign_in_body').css('display', 'block');
      $('.sign_up_body').css('display', 'none');
      $('.forget_pswd_body').css('display', 'none');
    }
    else {
      window.location.href = "/signin"
    }
  }
});

$(document).on('click', '.forget-pswrd-link', function(){
  var current_user = localStorage.getItem('user_id');
  if (current_user == "" || current_user == null || current_user == undefined) {
    var startmov_login = localStorage.getItem('statmov_signin');
    if (startmov_login != "" && startmov_login != null && startmov_login != undefined) {
      $('.sign_in_body').css('display', 'none');
      $('.forget_pswd_body').css('display', 'block');
    }
    else {
      window.location.href = "/forget_password"
    }
  }
});

function userLogin(email, password){
  var API_URL = "http://45.56.72.52/api/userapi/";
  var device_id = '';
  var token = '';
  var login_params = '{"email":"'+email+'","password":"'+password+'","device_id":"'+device_id+'","token":"'+token+'"}'
  console.log(login_params)
  console.log("login_params")
    if (email != '' && password != '') {  
      $.ajax({
        url: API_URL+'userLogin',
        method: 'POST',
        data: login_params,
        success: function (data) {
          if (data.status == true) {
            console.log(data);
            console.log("user details");
            localStorage.setItem('full_name', data.data.fullname)
            localStorage.setItem('phone_number', data.data.phone)
            localStorage.setItem('user_id', data.data.user_id)
            localStorage.setItem('email', data.data.email);
            var current_user = localStorage.getItem('user_id');
            var startmov_login = localStorage.getItem('statmov_signin');
            if (startmov_login != "" && startmov_login != null && startmov_login != undefined) {
              if (current_user != "" && current_user != null && current_user != undefined) {
                $('.user-login-logut').html("<a href='javascript:;' class='user-logout'>Sign Out</a>")
                $('.sign_in_body').css('display', 'none');
                $('.start_move_body').css('display', 'block');
                $('.user-signup').css('display', 'none');
                $('#sign-in').modal();
                $('.user_moves').show();
                $('.account_settings').show();
                $('.payment_methods').show();
                var submit_move_btn = "<button class='image-div-submit' id='start_mov_btn'>Start your move</button>";
                $('.check_user_session').html(submit_move_btn );
                userMovesRequest(current_user)
              }else {
                $('.user_moves').hide();
                $('.user-login-logut').html("<a href='/signin'>Sign In</a>")
                $('.user-signup').html("<a href='/signup'>Sign Up</a>")
                $('.account_settings').hide();
                $('.payment_methods').hide();
              }
              // window.location.href = '/start-a-move'
            }else {
              $('.user_moves').show();
              var user_params = '{"user_id": '+ current_user +'}'
              $.ajax({
                url: API_URL+'getMovingRequestList',
                type: 'POST',
                data: user_params,
              })
              .done(function(data) {
                var count = data.data.upcoming.length
                localStorage.setItem('moves_count', count);
                $('.moves-count mark').text(count);
                $('.side-menu-moves-count mark').text(count);
                $('.moves-count').show();
                $('.side-menu-moves-count').show();
                window.location.href = "/";
              })
              .fail(function(data) {
                localStorage.setItem('moves_count', 0);
                $('.moves-count mark').text(0);
                $('.side-menu-moves-count mark').text(0);
                $('.moves-count').hide();
                $('.side-menu-moves-count').hide();
                window.location.href = "/";
              });
            }
          }
        },
        error: function (o) {
          console.log(o);
          alert("Invalid username or password")
        }
      });
    }
    else{
      alert('Please Enter username and password');
    }
}

function userRegistration(email, password, password_confirmation) {
    var API_URL = "http://45.56.72.52/api/userapi/";
    var device_id = '';
    var token = '';
    var sign_up_params = '{"email":"'+email+'","re_password":"'+password_confirmation+'","device_id":"'+device_id+'","password":"'+password+'","token":"'+token+'"}'
    if (email != '' && password != '' && password_confirmation != '') { 
      if (password == password_confirmation) {
        $.ajax({
          url: API_URL+'UserRegistration',
          method: 'POST',
          data: sign_up_params,
          success: function (data) {
            console.log('success');
            console.log(data);
            if (data.status == true) {
              localStorage.setItem('full_name', data.data.fullname)
              localStorage.setItem('phone_number', data.data.phone)
              localStorage.setItem('user_id', data.data.user_id);
              localStorage.setItem('email', data.data.email)
              var current_user = localStorage.getItem('user_id');
              var startmov_login = localStorage.getItem('statmov_signin');
              if (startmov_login != "" && startmov_login != null && startmov_login != undefined) {
                if (current_user != "" && current_user != null && current_user != undefined) {
                  $('.user-login-logut').html("<a href='javascript:;' class='user-logout'>Sign Out</a>")
                  $('.sign_up_body').css('display', 'none');
                  $('.start_move_body').css('display', 'block');
                  $('.user-signup').css('display', 'none');
                  $('#sign-up').modal();
                  $('.account_settings').show();
                  $('.payment_methods').show();
                  var submit_move_btn = "<button class='image-div-submit' id='start_mov_btn'>Start your move</button>";
                  $('.check_user_session').html(submit_move_btn );
                  userMovesRequest(current_user)
                }else {
                  $('.user_moves').hide();
                  $('.side-menu-moves-count').hide();
                  $('.user-login-logut').html("<a href='/signin'>Sign In</a>")
                  $('.user-signup').html("<a href='/signup'>Sign Up</a>")
                  $('.account_settings').hide();
                  $('.payment_methods').hide();
                }
              }else {
                $('.user_moves').show();
                $('.side-menu-moves-count').show();
                userMovesRequest(current_user)
                window.location.href = "/"
              }
            }
            $('.moves-count').hide();
          },
          error: function (o) {
            console.log(o);
          }
        });
      }
      else{
        alert('Password and Confirmation password should be same');
      }
    }
    else{
      alert('Invalid Email or Password');
    }
}

$(document).on('click', '.all_request_page', function(){
  window.location.href = "/moves"
});
$(document).on('click', '.open_subscripe_popup', function(){
  $('#moober_popup').modal();
});
$(document).on('click', '.cancel-btn', function(){
  $('#moober_popup').modal('toggle');
});
$(document).on('click', '.new-cancel-btn', function(){
  $('.subscribe-content').html('');
  function delay_div(){
    $('.new-subscribe-content').css('display', 'block');
  };
  window.setTimeout( delay_div, 200);
});
$(document).on('click', '.signin-continue', function(){
  $("#sign-in").modal('hide');
  $("#startamove-confirm").modal();
  // setTimeout(function(){ $("#startamove-confirm").modal(); }, 2000);
});
$(document).on('click', '.signup-continue', function(){
  $("#sign-up").modal('hide');
  $("#startamove-confirm").modal();
});

$(document).on("click", ".startmove_continue", function(){
  $("#startamove-confirm").modal('hide');
});

$(document).on('click', '.moving-requests', function(){
  var request_id = $(this).data('request-id');
  var from_add = $(this).data('from-add');
  localStorage.setItem('proposal_request', request_id);
  localStorage.setItem('request_from_add', from_add);
  window.location.href = "/moves/proposals"
});

function movingProposals(request_id, lat, lang){
  var API_URL = "http://45.56.72.52/api/userapi/";
  var current_user = localStorage.getItem('user_id');
  var proposal_params = '{"moving_request_id":'+ request_id +',"user_id": '+ current_user +'}'
  if (current_user != "" && current_user != null && current_user != undefined){
    if (request_id != "" && request_id != null && request_id != undefined){
      $.ajax({
        url: API_URL+"getMovingRequestProposal",
        type: 'POST',
        data: proposal_params,
      })
      .done(function(data) {
        console.log(data)
        $(".map-prop").show();
        $.each(data.data ,function(key, res){
          $(".proposal_results").append("<div class='success-proposals'><div class='col-md-12'> <div class='col-md-9 col-xs-8 pro-cmpny-name'><span>Company: </span><span><b><u>"+ res.company_name+"</u></b></span> </div><div class='col-xs-4 col-md-3 pull-right'><div class='text-center accept-btn' data-request-id="+res.moving_request_id+" data-id="+res.id+" data-company="+res.company_name+" data-price="+res.price+"> Accept </div></div></div><div class='col-md-12'><div class='col-md-9 col-xs-8'><span> Proposed Price: </span><span><b>$"+res.price+"</b></span></div></div><div class='col-md-12'><div class='col-md-9 col-xs-8'><span>Proposed Time: </span><span><b>"+res.created_date+"</b></span></div></div></div><div class='col-md-12'><hr></div>");
        });
      
      })
      .fail(function(data) {
        console.log(request_id)
        $(".proposal-go-back").hide();
        // $(".map-prop").hide();
        var proposal_params = '{"user_id": '+ current_user +'}'
        $.ajax({
          url: API_URL+"getMovingRequestList",
          type: 'POST',
          data: proposal_params,
        })
        .done(function(data) {
          var res = data.data;
          console.log(res) ;
          $.each(data.data.upcoming ,function(key, res){
            if (res.moving_request_id === request_id){
              var no_proposals = '<div class="no-proposal"><div class="row"><div class="col-md-3"><div class="go-back-btn">Go Back</div></div><div class="col-md-9 no-proposal-message">Proposals are on their way</div></div></div><div class="row"><div class="col-md-12"><div class="new-left"><p class="room_type_label-head"><span class="new-app-label room_type_label">Room Type: </span><span class="result-size">'+res.room_type_name+'</span><span class="size_of_move_text"></span></p></div><div class="new-left"><div class="details-heading moving_date_label"><span class="new-app-label">Moving Date</span></div><p class="moving_date">'+res.move_date_time+'</p></div><div class="new-left"><div class="details-heading pickup_address_label"><span class="new-app-label">Pickup Address</span></div><p class="pickup_address">'+res.from_address+'</p></div><div class="new-left"><div class="details-heading destination_address_label"><span class="new-app-label">Destination Address</span></div><p class="destination_address">'+res.to_address+'</p></div><div class="new-left"><div class="details-heading"><span class="new-app-label">Contact Details</span></div><p><span class="new-app-label">Full Name: </span><span class="contact_name">'+res.contact_name+'</span></p><p><span class="new-app-label">Mobile Number: </span><span class="contact_phone">'+res.contact_phone+'</span></p></div></div></div>'
              $(".proposal_results").append(no_proposals);

            }
          });
          $.each(data.data.past ,function(key, res){
            if (res.moving_request_id === request_id){
              var no_proposals = '<div class="no-proposal"><div class="row"><div class="col-md-3"><div class="go-back-btn">Go Back</div></div><div class="col-md-9 no-proposal-message">Proposals are on their way</div></div></div><div class="row"><div class="col-md-12"><div class="new-left"><p class="room_type_label-head"><span class="new-app-label room_type_label">Room Type: </span><span class="result-size">'+res.room_type_name+'</span><span class="size_of_move_text"></span></p></div><div class="new-left"><div class="details-heading moving_date_label"><span class="new-app-label">Moving Date</span></div><p class="moving_date">'+res.move_date_time+'</p></div><div class="new-left"><div class="details-heading pickup_address_label"><span class="new-app-label">Pickup Address</span></div><p class="pickup_address">'+res.from_address+'</p></div><div class="new-left"><div class="details-heading destination_address_label"><span class="new-app-label">Destination Address</span></div><p class="destination_address">'+res.to_address+'</p></div><div class="new-left"><div class="details-heading"><span class="new-app-label">Contact Details</span></div><p><span class="new-app-label">Full Name: </span><span class="contact_name">'+res.contact_name+'</span></p><p><span class="new-app-label">Mobile Number: </span><span class="contact_phone">'+res.contact_phone+'</span></p></div></div></div>'
              $(".proposal_results").append(no_proposals)
            }
          });
        })
        // .fail(function(data) {
        //   $(".acpt-company").text("");
        //   $(".acpt-company-from").text("");
        //   $(".acpt-company-to").text("");
        //   $(".acpt-company-date").text("");
        // });
        // $(".proposal_results").append("<div class='no-proposal'>Proposals are on their way</div>")
      });      
    }
    else{
      // $(".map-prop").hide();
      // $(".proposal_results").append("<div class='no-proposal'>Proposals are on their way</div>")
    }
  }else{
    window.location.href = "/"
  }
}

function userMovesRequest(current_user){
  var API_URL = "http://45.56.72.52/api/userapi/";
  if (current_user != "" && current_user != null && current_user != undefined) {
    var user_params = '{"user_id": '+ current_user +'}'
    $.ajax({
      url: API_URL+'getMovingRequestList',
      type: 'POST',
      data: user_params,
    })
    .done(function(data) {
      var count = data.data.upcoming.length
      localStorage.setItem('moves_count', count);
      $('.moves-count mark').text(count);
      $('.side-menu-moves-count mark').text(count);
      $('.side-menu-moves-count').show();
    })
    .fail(function(data) {
      localStorage.setItem('moves_count', 0);
      $('.moves-count mark').text(0)
      $('.side-menu-moves-count mark').text(0)
      $('.moves-count').hide();
      $('.side-menu-moves-count').hide();
    });
  }
}
$(document).on('click', '.dsktop-toggle', function(){
  var current_user = localStorage.getItem('user_id');
  var moves_count = localStorage.getItem('moves_count');
  if ($(this).hasClass("is-active") && current_user != "" && current_user != null && current_user != undefined && moves_count != 0){
    $('.side-menu-moves-count').show();

  }
  else {
    $('.side-menu-moves-count').hide();
  }
});

$(document).on('click', '.mbl-toggle', function(){
  var current_user = localStorage.getItem('user_id');
  var moves_count = localStorage.getItem('moves_count');
  if ($(this).hasClass("toggle-is-active") && current_user != "" && current_user != null && current_user != undefined && moves_count != 0){
    $('.side-menu-moves-count').show();

  }
  else {
    $('.side-menu-moves-count').hide();
  }
});
$(document).on('click', '.accept-btn', function(){
  var request_id = $(this).data('request-id');
  var dataId = $(this).data('id');
  var cmp_name = $(this).data('company');
  var price = $(this).data('price');
  localStorage.setItem('proposal_accept_request', request_id);
  localStorage.setItem('proposal_id', dataId);
  localStorage.setItem('company_name', cmp_name);
  localStorage.setItem('price', price);
  window.location.href = "/moves/proposal/accept"
});

function acceptCompany(){
  var API_URL = "http://45.56.72.52/api/userapi/";
  var current_user = localStorage.getItem('user_id');
  var request_id = localStorage.getItem('proposal_accept_request');
  var company_name = localStorage.getItem('company_name');
  var price = localStorage.getItem('price');
  var proposal_params = '{"user_id": '+ current_user +'}'
  $(".acpt-price").text(price)
  if (current_user != "" && current_user != null && current_user != undefined){
    $.ajax({
      url: API_URL+"getMovingRequestList",
      type: 'POST',
      data: proposal_params,
    })
    .done(function(data) {
      var res = data.data;
      console.log(res) ;
      $.each(data.data.upcoming ,function(key, res){
        if (res.moving_request_id === request_id){
          $(".acpt-company").text(company_name);
          $(".acpt-company-from").text(res.from_address);
          $(".acpt-company-to").text(res.to_address);
          $(".acpt-company-date").text(res.move_date_time);
        }
      });
      $.each(data.data.past ,function(key, res){
        if (res.moving_request_id === request_id){
          $(".acpt-company").text(company_name);
          $(".acpt-company-from").text(res.from_address);
          $(".acpt-company-to").text(res.to_address);
          $(".acpt-company-date").text(res.move_date_time);
        }
      });
    })
    .fail(function(data) {
      $(".acpt-company").text("");
      $(".acpt-company-from").text("");
      $(".acpt-company-to").text("");
      $(".acpt-company-date").text("");
    });      
  }else{
    window.location.href = "/"
  }
}
$(document).on('click', '.promo-apply-btn', function(){
  var code = $('.promo-code').val();
  var current_user = localStorage.getItem('user_id');
  if (current_user != "" && current_user != null && current_user != undefined){
    $.ajax({
      url: '/check_promocode',
      data: {code: code},
      success: function(data){
        if (data.message == true){
          console.log(data)
          $(".hidden-promocode").text(data.promocode);
          var prePrice = $(".acpt-price").text();
          var finPrice = prePrice - ((prePrice * 10)/100)
          var dis_price = (prePrice * 10)/100
          $('.final-amount').css("display", "block");
          $(".final-price").text(finPrice);
          $(".promo-apply-btn").css("pointer-events", "none");
          $(".promo-apply-btn").css("background-color", "rgba(200, 208, 208, 0.87)");
          $(".promo-code").val("");
          localStorage.setItem("final_price", finPrice);
          localStorage.setItem("dis_price", dis_price);
          localStorage.setItem("promo_code", data.promocode);
          $('#promo-code-popup').modal();
          $('.pc-head').text("Success");
          $('.promocode-body').html("<p>Your Promocode applied successfully</p>")
        }else{
          $('#promo-code-popup').modal();
          $('.pc-head').text("Oops");
          $('.promocode-body').html("<p>Invalid Promocode. Please try again later.</p>")
        }
      },
    });
  }
});
$(document).on('click', '.add-card-payment', function(){
  $('#card_details').modal();
});

$(document).on('click', '.edit-profile-btn', function(){
  var API_URL = "http://45.56.72.52/api/userapi/";
  var current_user = localStorage.getItem('user_id');
  var name = $('.edit-name').val();
  var phone = $('.edit-number').val();
  var email = $('.edit-email').val();
  var update_params = '{"phone":"'+phone+'","fullname":"'+name+'","user_id":"'+current_user+'","email":"'+email+'"}'
  // return false
  if (current_user != "" && current_user != null && current_user != undefined) {
    $.ajax({
      url: API_URL+"updateProfile",
      type: 'POST',
      data: update_params,
      success: function(data) {
        console.log(data);
        $(".edit-name").val(name);
        $(".edit-number").val(phone);
        $(".edit-email").val(email);
        localStorage.setItem('full_name', name);
        localStorage.setItem('phone_number', phone);
        localStorage.setItem('email', email);
        window.location.href = "/"
      },
      error: function(data){
        console.log(data)
        alert("something went wrong. Please try again");
        return false;
      }
    });
  }
});

$(document).on('click', '.edit-password-btn', function(){
  var API_URL = "http://45.56.72.52/api/userapi/";
  var current_user = localStorage.getItem('user_id');
  var current_password = $(".edit-current-pswd").val();
  var new_password = $(".edit-new-pswd").val();
  var confirm_password = $(".edit-confirm-pswd").val();
  var update_params = '{"current_password":"'+current_password+'","confirm_password":"'+confirm_password+'","user_id":"'+current_user+'","new_password":"'+new_password+'"}'
  console.log(update_params)
  if (current_user != "" && current_user != null && current_user != undefined) {
    $.ajax({
      url: API_URL+"changePassword",
      type: 'POST',
      data: update_params,
      success: function(data) {
        console.log(data);
        window.location.href = "/"
      },
      error: function(data){
        alert(data.responseJSON.message);
        $(".edit-current-pswd").val("");
        $(".edit-new-pswd").val("");
        $(".edit-confirm-pswd").val("");
      }
    });
  }
});

$(document).on('click', '.payment-updated', function(){
  var referrer =  document.referrer;
  if (referrer === "http://localhost:3000/moves/proposal/accept" || referrer === "http://stage.moober.com/moves/proposal/accept") {
    window.location.href = "/moves/proposal/accept"
  }else {
    $("#card-changed").modal("hide");
  }
});

$(document).on('click', '.approve-btn', function(){
  var API_URL = "http://45.56.72.52/api/userapi/";
  var current_user = localStorage.getItem('user_id');
  var proposal_id = localStorage.getItem("proposal_id");
  var promo_code = localStorage.getItem("promo_code");
  var card_id = localStorage.getItem("card_id");
  var final_price = localStorage.getItem("final_price");
  if (final_price == "" || final_price == null && final_price == undefined){
    final_price = $('.acpt-price').text();
  }
  if (card_id == "" || card_id == null && card_id == undefined){
    $('.card-page-error-body').html("<p>Please Add Card Details</p>")
    $("#card-page-error").modal();
    return false;
  }
  var dis_price = localStorage.getItem("dis_price");
  var accept_params = '{"promo_code":"'+promo_code+'","card_id":"'+card_id+'","user_id":"'+current_user+'","proposal_id":"'+proposal_id+'","discounted_price":"'+final_price+'","discount":"'+dis_price+'"}'
  console.log(accept_params)
  if (current_user != "" && current_user != null && current_user != undefined) {
    $.ajax({
      url: API_URL+"acceptProposal",
      type: 'POST',
      data: accept_params,
    })
    .done(function(data) {
      $("#booking-confirm").modal();
    })
    .fail(function(data) {
      $('.card-page-error-body').html("<p>"+data.statusText+"</p>")
      $("#card-page-error").modal();
    });
  }
});

$(document).on('click', '.booking-updated', function(){
  window.location.href = "/"
});
$(document).on('click', '.go-back-btn', function(){
  window.location.href = "/moves"
});
$(document).on('click', '.acpt-go-back-btn', function(){
  window.location.href = "/moves"
});

$(document).on('click', '.close-popup', function(){
  $(window).scrollTop();
});

$(document).on('click', '.prop-acpt-go-back-btn', function(){
  window.location.href = "/moves/proposals"
});

$(document).on('click', '.payment-go-back-btn', function(){
  window.location.href = "/moves/proposal/accept"
})
$(document).on('click', '.card-close', function(){
  var id = $(this).data("id")
  $('.card_id').val(id);
  $('#remove_card').modal();
});

$(document).on('click', '.confirm-remove-card', function(){
  var id = $('.card_id').val();
  var API_URL = "http://45.56.72.52/api/userapi/";
  var current_user = localStorage.getItem('user_id');
  var remove_card_params = '{"card_id": '+id+'}'
  console.log(remove_card_params)
  if (current_user != "" && current_user != null && current_user != undefined) {
    $.ajax({
      url: API_URL+"deleteCardDetail",
      type: 'POST',
      data: remove_card_params,
    })
    .done(function(data) {
      window.location.href = "/payment-methods"
    });
  }
});