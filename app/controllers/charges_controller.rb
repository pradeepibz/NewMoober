class ChargesController < ApplicationController
  def new
  end

  def create
    # Amount in cents
    session[:stripe_customer_id] = ""
    session[:card_id] = ""
    session[:last_4]  = ""
    @amount = 500

    @customer = Stripe::Customer.create(
      :email => params[:stripeEmail],
      :source  => params[:stripeToken]
    )
    session[:stripe_customer_id] = @customer.id
    session[:card_id] = @customer.sources.data.first.id
    session[:last_4] = @customer.sources.data.first.last4
    session[:cus_id_created] = true
    redirect_to payment_methods_path
  end
end
