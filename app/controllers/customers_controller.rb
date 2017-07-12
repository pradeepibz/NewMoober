class CustomersController < ApplicationController
  def index
    @customer = Customer.new
  end

	def sign_in
    session[:sharebutton] = nil
    session[:stripe_customer_id] = ""
    session[:card_id] = ""
    session[:last_4]  = ""
  end

  def sign_up
    session[:sharebutton] = nil
    session[:stripe_customer_id] = ""
    session[:card_id] = ""
    session[:last_4]  = ""
  end

  def forget_password
  end

  def create_subscribe
		@subscribe = Subscriber.new(subscribe_params)
		if @subscribe.save
			CustomerMailer.subscribe_mail(@subscribe).deliver
		end
  end

  def create
    @customer = Customer.new(customer_params)
    respond_to do |format|
      if @customer.save
        AdminUser.all.each do |admin|
          CustomerMailer.customer_email(@customer,admin).deliver
        end
        format.html { redirect_to apply_path, notice: 'Successfully sent user details' }
      else
        format.html { render "home/apply" }
        # redirect_to :back, notice: @customer.errors
      end
    end
  end

  private

  def subscribe_params
		params.require(:subscribe).permit(:email)
  end

  def customer_params
    params.require(:customer).permit(:full_name, :company, :site_url, :email, :city, :state, :phone, :find_through)
  end

end
