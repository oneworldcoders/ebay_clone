class UserController < ApplicationController
  def logout
    authenticate_or_request_with_http_token { |token| JwtBlacklist.create({ jti: token }) }
    render json: { message: 'user successfully signed out' }
  end
end
