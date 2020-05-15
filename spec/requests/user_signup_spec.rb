require 'rails_helper'

RSpec.describe 'user' do

  describe 'signup', :type => :request do
    let(:user) { {firstname: 'Emmanuel', email: 'emma@gmail.com', password: 'password'} }
    before { post '/signup', params: {registration: user} }

    context 'succesful' do
      it 'returns a created status' do
        expect(response).to have_http_status(201)
      end
  
      it 'adds a record to the database' do
        expected = User.exists?(email: user[:email])
        expect(expected).to be_truthy
      end

      it 'returns the users firstname' do
        actual = JSON.parse(response.body)
        expect(actual['firstname']).to eq(user[:firstname])
      end
    end
    
    context 'duplicate user' do
      before { post '/signup', params: {registration: user} }

      it 'returns an error code' do
        post '/signup', params: {registration: user}
        expect(response).to have_http_status(400)
      end
  
      it 'returns an error message' do
        post '/signup', params: {registration: user}
        expected = { errors: ["Email has already been taken"] }.to_json
        expect(response.body).to eq(expected)
      end
    end
  end
end
