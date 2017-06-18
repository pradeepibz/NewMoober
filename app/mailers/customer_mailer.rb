class CustomerMailer < ApplicationMailer
	default from: 'support@moober.com'

	def subscribe_mail(subscriber)
    @subscriber = subscriber
    mail(to: 'support@moober.com', subject: 'Subscriber Mail')
  end
end
