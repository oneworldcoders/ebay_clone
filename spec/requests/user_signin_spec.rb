require 'rails_helper'

RSpec.describe 'user' do

  describe 'signin', :type => :request do

    DatabaseCleaner.strategy = :truncation
    after(:each) do
      DatabaseCleaner.clean
    end

    before(:each) do
      @user = {
        email: 'emma@gmail.com',
        password: 'password'
      }
      User.create(@user)
      post user_session_path, params: @user
    end

    context 'succesful' do
      it 'returns an OK response status' do
        expect(response).to have_http_status(200)
      end

      it 'returns a token' do
        expected = JSON.parse(response.body)['token']
        expect(expected).not_to be_nil
      end
  
    end
  end
end
