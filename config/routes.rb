Rails.application.routes.draw do
  root 'home#index'

  get 'home/index'
  get '/start-a-move', to: "home#start_a_move"
  get 'home/signin'
  get '/sign_in', to: "home#signin", as: :signin

  # Strat url
  get '/contact' => 'home#contact', as: :contact
  get '/apply' => 'home#apply', as: :apply
  get '/blog', to: "home#new_blog", as: :new_blog

  get '/signin' => 'customers#sign_in', as: :user_sign_in
  get '/signup', to: "customers#sign_up", as: :user_sign_up
  get '/forget_password', to: "customers#forget_password", as: :forget_password
  # End url


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
