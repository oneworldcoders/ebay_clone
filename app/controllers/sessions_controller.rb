class SessionsController < Devise::SessionsController
  respond_to :json
  skip_before_action :authenticate_user

  def create
    user = User.find_by_email(params[:email])

    if user && user.valid_password?(params[:password])
      token = JWT.encode(JSON.parse(user.to_json), Rails.application.secrets.secret_key_base)
      render json: { user: user, token: token }, status: 200
    else
      render json: { errors: "Invalid username or password" }, status: 400
    end
  end
end