class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtBlacklist
  # has_secure_password

  def on_jwt_dispatch(token, payload)
    p 'the token was dispatched'
    # do_something(token, payload)
  end
end
