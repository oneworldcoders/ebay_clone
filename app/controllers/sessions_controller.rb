class SessionsController < Devise::SessionsController
  respond_to :json
  skip_before_action :authenticate_user, only: [:create]

  def create
    p 'sign in headers'
    p request.headers['Authorization']
    user = User.find_by_email(params[:email])

    if user && user.valid_password?(params[:password])
      p sign_in(user.to_json)
      user_obj = JSON.parse(user.to_json)
      token =  JWT.encode(user_obj, Rails.application.secrets.secret_key_base)
      render json: {user: user, token: token}, status: 200
    else
      render json: { errors: 'email or password is invalid'}, status: :unprocessable_entity
    end
  end

  def verify_signed_out_user
    p 'inseide verifiy sonmdafa'
    # if all_signed_out?
    #   set_flash_message! :notice, :already_signed_out

    #   respond_to_on_destroy
    # end
  end

  def destroy
    p '==========='
    p params
    p request.headers['Authorization']
    # render json: {}, status: 200
    user = User.find_by_email(params[:email])
    p user
    sign_out(user)
    p '____________'
    render json: {}, status: 200
  #   p user
  #   if user
  #     p '======'
  #     p user
  #     sign_out(user)
  #     # render json: {}, status: 200
  #   end
  end


end
