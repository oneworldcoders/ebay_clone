class RegistrationsController < Devise::SessionsController
  respond_to :json
  skip_before_action :authenticate_user

  def create
    user = User.new(user_params)
    if user.valid?
      user.save
      render json: user, status: 201

    else
      render json: {errors: user.errors.full_messages }, status: 500
    end
  end

  private
  def user_params
    params.permit(:firstname, :lastname, :email, :password)
  end
end
