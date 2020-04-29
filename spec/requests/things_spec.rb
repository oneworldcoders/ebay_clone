require 'test_helper'

RSpec.describe 'things' do
  describe 'get things', :type => :request do
    before do
      get '/v1/things.json'
    end

    it 'returns a created status' do
      expect(response).to have_http_status(200)
    end
  end
end
