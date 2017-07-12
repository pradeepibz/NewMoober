Rails.configuration.stripe = {
  :publishable_key => "pk_test_yY3J8Eup9SD3iAIhytqXFPOa",
  :secret_key      => "sk_test_pkayE983UBeOirdchmzWzJbs"
}

Stripe.api_key = Rails.configuration.stripe[:secret_key]