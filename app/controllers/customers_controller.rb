class CustomersController < ApplicationController
	def sign_in
    session[:sharebutton] = nil
  end

  def sign_up
    session[:sharebutton] = nil
  end

  def forget_password
  end

  def create_subscribe
		@subscribe = Subscriber.new(subscribe_params)
		if @subscribe.save
			CustomerMailer.subscribe_mail(@subscribe).deliver
		end
  end

  private

  def subscribe_params
		params.require(:subscribe).permit(:email)
  end
end
