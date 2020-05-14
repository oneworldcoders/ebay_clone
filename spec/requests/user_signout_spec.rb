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
    delete signout_path, params: {}, headers: @header
    expected = JwtBlacklist.exists?(jti: @token)
    expect(expected).to be_truthy
  end

  it 'returns a success code' do
    delete signout_path, params: {}, headers: @header
    expect(response).to have_http_status(200)
  end

  it 'returns a success meeage' do
    delete signout_path, params: {}, headers: @header
    expected = { message: 'user successfully signed out' }.to_json
    expect(response.body).to eq(expected)
  end

  it 'cannot access protected endpoints after logout' do
    get v1_products_path, params: {}, headers: @header
    expect(response).to have_http_status(200)

    delete signout_path, params: {}, headers: @header
    get v1_products_path, params: {}, headers: @header
    expect(response).to have_http_status(401)
  end  
end 
