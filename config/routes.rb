Rails.application.routes.draw do
  devise_for :users,
              path: '',
              path_names: {
                sign_in: 'login',
                sign_out: 'logout',
                registration: 'signup'
              },
              controllers: {
                sessions: 'sessions',
                registrations: 'registrations'
              }
  namespace :v1, defaults: { format: 'json' } do
    get 'things', to: 'things#index'
    post 'signup', to: 'user#create'
    delete 'logout', to: 'user#logout'
    # devise_for :users,
    #           path: '',
    #           path_names: {
    #             sign_in: 'login',
    #             sign_out: 'logout',
    #             registration: 'signup'
    #           },
    #           controllers: {
    #             sessions: 'sessions',
    #             registrations: 'registrations'
    #           }
  end

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end

  root 'static#index'
end
