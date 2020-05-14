require 'rails_helper'

RSpec.describe 'user' do

  describe 'signin', :type => :request do

    DatabaseCleaner.strategy = :truncation
    after(:each) do
      DatabaseCleaner.clean
    end

    USER = {
      email: 'emma@gmail.com',
      password: 'password'
    }

    context 'succesful' do
      before do
        User.create(USER)
        post user_session_path, params: USER
      end

      it 'returns an OK response status' do
        expect(response).to have_http_status(200)
      end

      it 'returns a token' do
        expected = JSON.parse(response.body)['token']
        expect(expected).not_to be_nil
      end
  
    end

    context 'unsuccessful' do
      before do
        post user_session_path, params: USER
      end

      it 'returnsa bad request status code' do
        expect(response).to have_http_status(400)
      end

      it 'returns an error message' do
        expected = {errors: 'Invalid username or password'}.to_json
        expect(response.body).to eq(expected)
      end
  
    end
  end
end
