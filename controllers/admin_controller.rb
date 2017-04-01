# coding: utf-8
require "sinatra/base"
require "sinatra/json"

class AdminController < ApplicationController
  helpers AdminHelper

  before do
    protected!
  end
  
  get "/" do
    erb "admin/index".to_sym
  end

  # ユーザ一覧の取得
  get "/users" do
    users = User.order(:username).all.map{|u| u.to_hash}
    json users
  end
  
  # ユーザの追加
  # params[:username] : ユーザ名
  # params[:password] : パスワード
  post "/user" do
    begin
      new_user = User.new
      new_user.username = params[:username]
      new_user.password = params[:password]
      new_user.save
      json new_user.to_hash
    rescue => ex
      halt 500, ex.message
    end
  end

  # ユーザ情報の取得
  # params[:username] : ユーザ名
  get "/user/:username" do
    begin
      user = get_user
      json user.to_hash
    rescue => ex
      halt 500, ex.message
    end      
  end
  
  # ユーザの削除
  # params[:username] : ユーザ名
  delete "/user/:username" do
    begin
      user = get_user
      user.delete
    rescue => ex
      halt 500, ex.message
    end
  end

  # パスワードの再設定
  # params[:username] : ユーザ名
  # params[:password] : 新しいパスワード
  put "/user/:username" do
    begin
      user = get_user
      user.password = params[:password]
      user.save
    rescue => ex
      halt 500, ex.message
    end
  end
end
