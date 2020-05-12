require 'rails_helper'

RSpec.describe 'user' do

  describe 'signout', :type => :request do

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
      xit 'returns an OK response status' do
        # login
        User.create(@user)
        post '/login', params: @user
        token = JSON.parse(response.body)['token']
        expect(response).to have_http_status(200)
        session = response.headers["Set-Cookie"]

        # able to access protected endpoitnt
        get '/v1/things', params: {}, headers: { 'Authorization' =>  "Bearer #{token}", "Set-Cookie" => session}
        # expect(response).to have_http_status(200)

        # logout
        delete '/logout', params: @user, headers: { 'Authorization' => "Bearer #{token}", "Set-Cookie" => session}
        p response.body
        expect(response).to have_http_status(200)

        # unable to access protected endpoitnt
        # get '/v1/things.json', params: {}, headers: { 'Authorization' =>  "Bearer #{token}"}
        # expect(response).to have_http_status(401)
      end
  
    end
  end
end
