OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, 1911334529145374, '40ce32be40679edf84776d934a3e92dd', scope: 'email,user_birthday, manage_pages, publish_pages, publish_actions' if Rails.env == 'development'
  provider :facebook, 194169897743548, 'f6f8de5ab95ca93a51ac86c835de1d56', scope: 'email,user_birthday, manage_pages, publish_pages, publish_actions' if Rails.env == 'production'
  # provider :facebook, 194169897743548, 'f6f8de5ab95ca93a51ac86c835de1d56', scope: 'email,user_birthday, manage_pages, publish_pages, publish_actions' if Rails.env == 'development'
end