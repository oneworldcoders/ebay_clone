require 'rails_helper'

describe 'user sign out', :type => :request do

  DatabaseCleaner.strategy = :truncation
  after(:each) do
    DatabaseCleaner.clean
  end

  before(:each) do
    user = {
      email: 'email@email.com',
      password: 'password'
    }

    User.create(user)
    post user_session_path, params: user
    @token = JSON.parse(response.body)['token']
    @header = { 'Authorization': "Bearer #{@token}" }
  end

  it 'adds the token to the blacklist table' do
    delete v1_logout_path, params: {}, headers: @header
    expected = JwtBlacklist.exists?(jti: @token)
    expect(expected).to be_truthy
  end

  it 'returns a success code' do
    delete v1_logout_path, params: {}, headers: @header
    expect(response).to have_http_status(200)
  end

  it 'cannot access protected endpoints after logout' do
    get v1_things_path, params: {}, headers: @header
    expect(response).to have_http_status(200)

    delete v1_logout_path, params: {}, headers: @header
    get v1_things_path, params: {}, headers: @header
    expect(response).to have_http_status(401)
  end  
end 
