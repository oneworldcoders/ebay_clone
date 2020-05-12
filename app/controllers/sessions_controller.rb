class SessionsController < Devise::SessionsController
  respond_to :json
  skip_before_action :authenticate_user
  # skip_before_action :verify_signed_out_user , only: :destroy

  def create
    user = User.find_by_email(params[:email])

    if user && user.valid_password?(params[:password])
      token = JWT.encode(JSON.parse(user.to_json), Rails.application.secrets.secret_key_base)
      render json: { user: user, token: token }, status: 200
    end
  end

  def verify_signed_out_user
  #    p 'inseide verifiy sonmdafa'
  #     # if all_signed_out?
  #     #   set_flash_message! :notice, :already_signed_out
     
  #     #   respond_to_on_destroy
  #     # end
  end

  # private
  # def respond_with(resource, _opts = {})
  #   render json: resource
  # end

  # def respond_to_on_destroy
  #   head :no_content
  # end
end