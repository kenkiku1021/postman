require "sinatra/base"
require "sinatra/json"

class AdminController < ApplicationController
  helpers AdminHelper
  
  get "/" do
    protected!
    logger.info "hoge"
    "hoge"
  end
end
