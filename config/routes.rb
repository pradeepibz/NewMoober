Rails.application.routes.draw do
  root 'home#index'

  get 'home/index'
  get 'home/signin'
  get '/signin', to: "home#signin", as: :signin
  get '/how-it-works', to: "home#how_it_works", as: :how_it_works

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
