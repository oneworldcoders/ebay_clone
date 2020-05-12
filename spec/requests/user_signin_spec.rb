require 'rails_helper'

RSpec.describe 'user' do

  describe 'signin', :type => :request do

    DatabaseCleaner.strategy = :truncation
    after(:each) do
      DatabaseCleaner.clean
    end

    before(:each) do
      @user = {
        firstname: 'Emma',
        lastname: 'Omona',
        email: 'emma@gmail.com',
        password: 'password'
    }
    end

    context 'succesful' do
      it 'returns an OK response status' do
        User.create(@user)
        post '/login', params: @user
        expect(response).to have_http_status(200)
        p 'these are the headers'
        p response.headers["Set-Cookie"]
      end
  
    end
  end
end
