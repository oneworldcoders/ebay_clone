require 'rails_helper'
require './spec/support/authentication_helper'

include AuthenticationHelper

RSpec.describe 'products' do

  let(:user) { {email: 'email@email.com', password: 'password'} }
  before(:each) do
    signup(user)
    @token = login(user)
    @header = { 'Authorization': "Bearer #{@token}" }
  end

  describe 'get products', :type => :request do
    it 'returns an ok status' do
      get v1_products_path, params: {}, headers: { 'Authorization': "Bearer #{@token}}" }
      expect(response).to have_http_status(200)
    end

    it 'unauthorized if invalid token' do
      get v1_products_path, params: {}, headers: { 'Authorization': "Bearer 123}" }
      expect(response).to have_http_status(401)
    end
  end
end
