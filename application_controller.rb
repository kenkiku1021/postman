require "sinatra/base"
require "sinatra/reloader"

class ApplicationController < Sinatra::Base
  helpers ApplicationHelper

  configure do
    enable :sessions
    enable :logging
  end

  configure :development do
    register Sinatra::Reloader
  end

  get "/" do
    "Hello! Postman"
  end
end
