class V1::UserController < ApplicationController
  def create
    user = User.new(user_params).save
    render json: user, status: 201
  end

  private
  def user_params
    params.permit(:firstname, :lastname, :email, :password_digest)
  end
end
