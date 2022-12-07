Rails.application.routes.draw do
  get 'features', controller: :feature, action: :features
  get 'user', controller: :user, action: :index
end
