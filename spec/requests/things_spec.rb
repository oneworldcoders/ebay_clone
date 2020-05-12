require 'rails_helper'

RSpec.describe 'things' do

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

  describe 'get things', :type => :request do
    before do
      get v1_things_path, params: {}, headers: { 'Authorization': "Bearer #{@token}}" }
    end

    it 'returns an ok status' do
      expect(response).to have_http_status(200)
    end

    it 'unauthorized if invalid token' do
      get v1_things_path, params: {}, headers: { 'Authorization': "Bearer 123}" }
      expect(response).to have_http_status(401)
    end
  end
end
