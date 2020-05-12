class User < ApplicationRecord
  # acts_as_token_authenticatable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :jwt_authenticatable,
         :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         jwt_revocation_strategy: JwtBlacklist # Devise::JWT::RevocationStrategies::Null
        
end
