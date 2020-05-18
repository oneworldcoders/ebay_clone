require 'rails_helper'
require './spec/support/authentication_helper'

include AuthenticationHelper

describe 'user sign out', :type => :request do
  let(:user) { {email: 'email@email.com', password: 'password'} }
  before(:each) do
    signup(user)
    @token = login(user)
    @header = { 'Authorization': "Bearer #{@token}" }
  end

  context 'successfully' do
    before { delete signout_path, params: {}, headers: @header }

    it 'adds the token to the blacklist table' do
      expected = JwtBlacklist.exists?(jti: @token)
      expect(expected).to be_truthy
    end

    it 'returns a success code' do
      expect(response).to have_http_status(200)
    end

    it 'returns a success meeage' do
      expected = { message: 'user successfully signed out' }.to_json
      expect(response.body).to eq(expected)
    end
  end

  it 'cannot access protected endpoints after logout' do
    get v1_products_path, params: {}, headers: @header
    expect(response).to have_http_status(200)

    delete signout_path, params: {}, headers: @header
    get v1_products_path, params: {}, headers: @header
    expect(response).to have_http_status(401)
  end  
end 
