class CustomersController < ApplicationController
	def sign_in
  end

  def sign_up
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
