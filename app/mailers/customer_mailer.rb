class CustomerMailer < ApplicationMailer
	default from: 'support@moober.com'

	def customer_email(customer,admin)
    @customer = customer
    @admin = admin
    mail(to: @admin.email, subject: 'Customer Notifications')
  end

  def contact_email(customer,admin)
    @customer = customer
    @admin = admin
    mail(to: @admin.email, subject: 'Contact Notifications')
  end

  def promo_code(customer,promo_code)
    @customer = customer
    @promo_code = promo_code
    mail(to: @customer.email, subject: 'Promo Code Sent')
  end

  def subscribe_mail(subscriber)
    @subscriber = subscriber
    mail(to: @subscriber.email, subject: 'Subscriber Mail')
  end

  def move_success_mail(move_params, email, date)
    @move_params = move_params
    @date = date
    from = Geocoder.coordinates(move_params['from_address'])
    to = Geocoder.coordinates(move_params['to_address'])
    @distance = Geocoder::Calculations.distance_between(from, to)
    mail(from: email, to: 'support@moober.com', subject: "New Order for Moving")
  end

end
