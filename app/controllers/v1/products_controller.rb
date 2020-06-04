class V1::ProductsController < ApplicationController
  def index
    products = Product.page(params[:page])
    products_paginated = products.per(5)
    last_page? = products.last_page?  
    render json: { products: products, last_page: last_page? }.to_json
  end
end
