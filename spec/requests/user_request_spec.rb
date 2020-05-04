require 'rails_helper'

RSpec.describe 'user' do

  describe 'signup', :type => :request do

    before(:each) do
      @user = {
        firstname: 'Emma',
        lastname: 'Omona',
        email: 'emma@gmail.com',
        password_digest: 'password'
      }
    end

    DatabaseCleaner.strategy = :truncation
    after(:each) do
      DatabaseCleaner.clean
    end

    it 'returns a created status' do
      post '/v1/signup', params: @user
      expect(response).to have_http_status(201)
    end

    it 'adds a record to the database' do
      post '/v1/signup', params: @user

      db_user = User.find_by(firstname: 'Emma')
      expect(db_user.firstname).to eq(@user[:firstname])
      expect(db_user.lastname).to eq(@user[:lastname])
      expect(db_user.email).to eq(@user[:email])
    end

  end
end
