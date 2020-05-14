require 'rails_helper'
# require './app/controllers/application_controller'

describe ApplicationController do
  context 'token blacklisted' do

    DatabaseCleaner.strategy = :truncation
    after(:each) do
      DatabaseCleaner.clean
    end
    
    it 'returns false for a blacklisted token' do
      token = '123'
      actual = subject.token_blacklisted?(token)
      expect(actual).to be false
    end

    it 'returns true for a blacklisted token' do
      token = '1234'
      JwtBlacklist.create(jti: token)
      actual = subject.token_blacklisted?(token)
      expect(actual).to be true
    end
  end
end