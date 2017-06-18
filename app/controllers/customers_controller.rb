class CustomersController < ApplicationController
	def sign_in
    session[:sharebutton] = nil
  end

  def sign_up
    session[:sharebutton] = nil
  end

  def forget_password
  end
end
