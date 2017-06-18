class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  def self.create_with_omniauth(auth)
  
    user = find_or_create_by(uid: auth['uid'], provider:  auth['provider'])
    user.email = auth['extra']['raw_info'].email
    user.password = auth['uid']
    if User.exists?(user)
      user
    else
      user.save!
      user
    end
  end
end
