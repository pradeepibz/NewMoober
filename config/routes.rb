Rails.application.routes.draw do
  resources :contacts
  resources :customers
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users
  root 'home#index'

  get 'home/index'
  get '/start-a-move', to: "home#start_a_move"
  get '/how-it-works', to: "home#how_it_works", as: :how_it_works

  # Strat url
  get '/contact' => 'home#contact_us', as: :contact_us
  get '/apply' => 'home#apply', as: :apply
  get '/blog', to: "home#new_blog", as: :new_blog

  post '/create_subscribe', to: "customers#create_subscribe", as: :create_subscribe
  get '/signin' => 'customers#sign_in', as: :user_sign_in
  get '/signup', to: "customers#sign_up", as: :user_sign_up
  get '/forget_password', to: "customers#forget_password", as: :forget_password
  match 'auth/:provider/callback', :to => 'home#get_facebook_auth_token', via: [:get, :post]
  get '/moves', to: "home#list_of_moves", as: :list_of_moves
  post '/move_success', to: "home#move_success"
  post '/take_photos', to: "home#take_photos"
  get '/moves/proposals', to: "home#moving_proposals", as: :moving_proposals
  # End url

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
