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

    it 'returns empty records in the database' do
      get v1_products_path, params: {}, headers: { 'Authorization': "Bearer #{@token}}" }
      expected = { products: [] }.to_json
      expect(response.body).to eq(expected)
    end

    it 'returns records in the database' do
      product = { 
        title: 'Title',
        subheader: 'Sub-header',
        imageUrl: "https://res.cloudinary.com/opix/image/upload/v1553531583/samples/cloudinary-icon.png",
        imageTitle: 'Image Title',
        description: 'Item description'
      }
      Product.create(product)
      get v1_products_path, params: {}, headers: { 'Authorization': "Bearer #{@token}}" }
      result = JSON.parse(response.body)['products'].first
      expect(result['title']).to eq(product[:title])
      expect(result['subheader']).to eq(product[:subheader])
      expect(result['imageUrl']).to eq(product[:imageUrl])
      expect(result['imageTitle']).to eq(product[:imageTitle])
      expect(result['description']).to eq(product[:description])
    end

    

    it 'unauthorized if invalid token' do
      get v1_products_path, params: {}, headers: { 'Authorization': "Bearer 123}" }
      expect(response).to have_http_status(401)
    end
  end
end
