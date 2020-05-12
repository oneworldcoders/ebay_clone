class RegistrationsController < Devise::RegistrationsController
  respond_to :json
  skip_before_action :authenticate_user

  def create
    build_resource(signup_params)

    resource.save
    render_resource(resource)
  end

  private
  def signup_params
    params.require(:registration).permit(:email, :password)
  end

  def render_resource(resource)
    if resource.errors.empty?
      render json: resource, status: :created
    else
      validation_error(resource)
    end
  end

  def validation_error(resource)
    render json: {
      errors: resource.errors.full_messages
    }, status: :bad_request
  end
end