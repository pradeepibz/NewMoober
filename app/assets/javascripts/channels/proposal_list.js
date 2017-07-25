$(document).ready(function(){
  App.chat_count = App.cable.subscriptions.create({
    channel: "ProposalList"
    // chat_room_id: messages.data('chat-room-id')
  }, {
    connected: function() {
      console.log('connected');
    },
    disconnected: function() {
      console.log('disconnected auction');
    },
    received: function(data) {
      var current_user = localStorage.getItem('user_id');
      var API_URL = "http://45.56.72.52/api/userapi/";
      var proposal_params = '{"user_id": '+ current_user +'}'
      if (current_user != "" && current_user != null && current_user != undefined){
        $.ajax({
          url: API_URL+"getMovingRequestList",
          type: 'POST',
          data: proposal_params,
        })
        .done(function(data) {
          var count = data.data.upcoming.length
          console.log(count)
          localStorage.setItem('moves_count', count);
          $('.moves-count mark').text(count);
          $('.side-menu-moves-count mark').text(count);
          $('.upcoming_values').html("")
          $('.past_values').html("")
          $.each(data.data.upcoming ,function(key, res){
            var upcoming = '<div class="col-md-12 upcome-border"><div class="col-md-8 um-values"><div class="moving-requests" data-request-id="'+res.moving_request_id+'" data-from-add="'+res.from_address+'">'+redNotification(res)+'</div><p>Awaiting Proposals</p><p>'+res.room_type_name+'</p><p>'+res.move_date_time+'</p><p>'+res.from_address+'</p><p>'+res.to_address+''+yellowNotification(res)+'</p></div><div class="col-md-4 upcoming-images_'+res.moving_request_id+'"></div></div>'
            $('.upcoming_values').append(upcoming)
            if (res.moving_request_images.length > 0){ 
              $.each(res.moving_request_images, function(i, img){
                var images = '<div class="col-md-6"><img src="'+img.image_thumb+'"></div>'
                $('.upcoming-images_'+res.moving_request_id+'').append(images)
              })
            }else{
              var images = '<div class="col-md-6">No Images</div>'
              $('.upcoming-images_'+res.moving_request_id+'').append(images)
            }
          });

          $.each(data.data.past ,function(key, res){
            var upcoming = '<div class="col-md-12 upcome-border"><div class="col-md-8 um-values"><div class="moving-requests" data-request-id="'+res.moving_request_id+'" data-from-add="'+res.from_address+'">'+redNotification(res)+'</div><p>Awaiting Proposals</p><p>'+res.room_type_name+'</p><p>'+res.move_date_time+'</p><p>'+res.from_address+'</p><p>'+res.to_address+''+yellowNotification(res)+'</p></div><div class="col-md-4 past-images_'+res.moving_request_id+'"></div></div>'
            $('.past_values').append(upcoming)
            if (res.moving_request_images.length > 0){ 
              $.each(res.moving_request_images, function(i, img){
                var images = '<div class="col-md-6"><img src="'+img.image_thumb+'"></div>'
                $('.past-images_'+res.moving_request_id+'').append(images)
              })
            }else{
              var images = '<div class="col-md-6">No Images</div>'
              $('.past-images_'+res.moving_request_id+'').append(images)
            }
          });
        });
      }
    },
    redNotification: function(req){
      if (res.notification_count > 0){
        return '<span class="upcoming-pro-count"><mark>'+res.notification_count+'</mark></span><span class="upcoming-title">'+res.moving_code+'</span>'
      }
      else {
       return '<span class="upcoming-title">'+res.moving_code+'</span>' 
      }
    },
    yellowNotification: function(res){
      if (res.notification_count > 0){
        return '<span class="up-pro-count"><mark>'+res.notification_count+'</mark></span>'
      }
    }
  });
}); 