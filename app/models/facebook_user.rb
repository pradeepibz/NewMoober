class FacebookUser < ApplicationRecord
  has_one :promo_code, dependent: :destroy

  def check_promocode(code)
    self.promo_code.promo_code == code
  end
end
