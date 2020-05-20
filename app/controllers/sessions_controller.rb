class SessionsController < Devise::SessionsController
  respond_to :json
  skip_before_action :authenticate_user

  def create
    user = User.find_by_email(params[:email])

    if user && user.valid_password?(params[:password])
      json_user = JSON.parse(user.to_json)
      json_user[:exp] = 24.hours.from_now.to_i
      token = JWT.encode(json_user, Rails.application.secrets.secret_key_base)
      render json: { user: user, token: token }, status: 200
    end
  end
end