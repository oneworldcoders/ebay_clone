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
      get v1_products_path, params: {}, headers: @header
      expect(response).to have_http_status(200)
    end

    it 'returns empty records in the database' do
      get v1_products_path, params: {}, headers: @header
      expected = { 'products' => [] }
      expect(JSON.parse(response.body)).to include(expected)
    end

    context 'last_page' do
      context '10 pages' do
        before { FactoryBot.create_list(:product, 10) }
        it 'returns true when more than 5 products and page 1' do
          get '/v1/products?page=1', params: {}, headers: @header
          expected = { 'last_page' => true }
          expect(JSON.parse(response.body)).to include(expected)
        end
    
        it 'returns false when more than 5 products and page 2' do
          get '/v1/products?page=2', params: {}, headers: @header
          expected = { 'last_page' => false }
          expect(JSON.parse(response.body)).to include(expected)
        end
      end

      context '5 pages' do
        it 'returns false when less than 5 products' do
          FactoryBot.create_list(:product, 4)
          get '/v1/products', params: {}, headers: @header
          expected = { 'last_page' => true }
          expect(JSON.parse(response.body)).to include(expected)
        end
      end
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
