class V1::ThingsController < ApplicationController
  def index
    render json: { :things => [
      {
        :name => 'some-thing',
        :guid => '2323b-1nkj21-3m1231-23021'
      }
    ] }.to_json
  end
end
