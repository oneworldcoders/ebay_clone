module AuthenticationHelper
  def signup(user)
    User.create(user)
  end
  
  def login(user)
    post user_session_path, params: user
    JSON.parse(response.body)['token']
  end
end