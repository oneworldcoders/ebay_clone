require 'rails_helper'

RSpec.describe 'user' do

  describe 'signup', :type => :request do

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
      it 'returns a created status' do
        post '/signup', params: @user
        expect(response).to have_http_status(201)
      end
  
      it 'adds a record to the database' do
        post '/signup', params: @user
  
        db_user = User.find_by(firstname: 'Emma')
        expect(db_user.firstname).to eq(@user[:firstname])
        expect(db_user.lastname).to eq(@user[:lastname])
        expect(db_user.email).to eq(@user[:email])
      end

      it 'returns the user' do
        post '/signup', params: @user
        actual = JSON.parse(response.body)
        expect(actual['firstname']).to eq(@user[:firstname])
        expect(actual['lastname']).to eq(@user[:lastname])
        expect(actual['email']).to eq(@user[:email])
      end
    end
    
    context 'duplicate user' do
      before(:each) { post '/signup', params: @user }

      it 'returns an error code for duplicate users' do
        post '/signup', params: @user
        expect(response).to have_http_status(500)
      end
  
      it 'returns an error message for duplicate users' do
        post '/signup', params: @user
        expected = { errors: ["Email has already been taken"] }.to_json
        expect(response.body).to eq(expected)
      end
    end
  end
end
