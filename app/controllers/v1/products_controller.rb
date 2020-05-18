class V1::ProductsController < ApplicationController
  def index
    render json: { :products => [
      {
        :name => 'product name',
        :description => 'product description'
      }
    ] }.to_json
  end
end
