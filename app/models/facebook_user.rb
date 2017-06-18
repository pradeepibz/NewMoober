class FacebookUser < ApplicationRecord
  has_one :promo_code, dependent: :destroy
end
