class HomeController < ApplicationController
  require "koala"
  def index
    require "browser"
    if session[:fb_token].present?
      @facebook_user = FacebookUser.find_by(uid: session[:fb_token])
      @promo_code = @facebook_user.try(:promo_code).try(:promo_code)
    end
    session[:sharebutton] = nil
  end

  def signin	
  end

  def how_it_works
  end

  def contact_us
    @contact = Contact.new
  end

  def apply
    @customer = Customer.new
  end

  def start_a_move
  end

  def get_facebook_auth_token
    auth = request.env['omniauth.auth']
    token = auth['credentials']['token']
    @facebook_user_data = auth['extra']['raw_info']
    session[:fb_token] = auth['uid']
    facebook_user_access_token = token
    facebook_user_uid = auth['uid']
    if facebook_user_uid.present? && session[:sharebutton].present?
      if FacebookUser.find_by(uid: auth['uid']).nil?
        @facebook_user = FacebookUser.create(name: @facebook_user_data.name, email: @facebook_user_data.email, fb_access_token: facebook_user_access_token, provider: auth['provider'], uid: auth['uid'])
        if @facebook_user.save
          promo_code = SecureRandom.hex(3)
          caps_promo_code = promo_code.upcase
          @promo_code = @facebook_user.build_promo_code(promo_code: caps_promo_code, is_used: false)
          if @promo_code.save
            CustomerMailer.promo_code(@facebook_user,caps_promo_code).deliver
          end
        end
      else
        @facebook_user = FacebookUser.find_by(uid: auth['uid'])
        promo_code = SecureRandom.hex(3)
        caps_promo_code = promo_code.upcase
        @promo_code = @facebook_user.build_promo_code(promo_code: caps_promo_code, is_used: false)
        if @promo_code.save
          CustomerMailer.promo_code(@facebook_user,caps_promo_code).deliver
        end
      end
      session[:sharebutton] = nil
    end

    if request.env['omniauth.auth']
      @user = User.create_with_omniauth(request.env['omniauth.auth'])
      session[:email] = @user.email
      session[:password] = @user.uid
    end

    respond_to do |format|
      format.html {redirect_to root_path}
      format.json {render :json => { :success => (@user.present? ? true : false), 
                      :email => @user.email, password: @user.uid }}
    end
    # get auth token
  end

  def move_success
    @move_params = params[:move_params]
    @email = params[:email]
    @date = params[:date]
    CustomerMailer.move_success_mail(@move_params, @email, @date).deliver_now
  end

  def take_photos
    img = params[:file]
    @images = MovePhoto.create(avatar: img)
    render json: {image: @images.avatar.url}
  end

end
