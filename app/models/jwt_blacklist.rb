class JwtBlacklist < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Blacklist

  self.table_name = 'jwt_blacklist'

  def self.clear_expired_tokens
    self.all.each do |row|
      token = row.jti
      begin
        JWT.decode(token, Rails.application.secrets.secret_key_base).first
      rescue JWT::ExpiredSignature
        row.destroy
      end
    end
  end
end
