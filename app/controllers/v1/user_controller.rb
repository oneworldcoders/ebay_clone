class V1::UserController < ApplicationController
  def create
    user = User.new(user_params).save
    render json: user, status: 201
  end

  def logout
    authenticate_or_request_with_http_token { |token| JwtBlacklist.create({ jti: token }) }
    render json: { message: 'token added to blacklist' }
  end

  private
  def user_params
    params.permit(:firstname, :lastname, :email, :password_digest)
  end
end
