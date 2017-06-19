class Contact < ApplicationRecord
	validates :mobile, :presence => true, :numericality => true, :length => { :minimum => 10, :maximum => 15 }
end
