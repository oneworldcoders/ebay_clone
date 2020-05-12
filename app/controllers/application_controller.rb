class ApplicationController < ActionController::Base

  protect_from_forgery
  before_action :authenticate_user

  private
  def authenticate_user
    if request.headers['Authorization'].present?
      authenticate_or_request_with_http_token do |token|
        begin
          head :unauthorized if token_blacklisted?(token)
          jwt_payload = JWT.decode(token, Rails.application.secrets.secret_key_base).first

        rescue JWT::DecodeError #JWT::ExpiredSignature, JWT::VerificationError
          head :unauthorized
        end
      end
    else
     head :unauthorized
    end
  end

  def token_blacklisted?(token)
    JwtBlacklist.exists?(jti: token)
  end

end
