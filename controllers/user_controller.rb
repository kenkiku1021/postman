# coding: utf-8
require "sinatra/base"
require "sinatra/json"

class UserController < ApplicationController
  helpers UserHelper
  
  get "/" do
    erb :index
  end
  
  # 認証
  # params[:username] : ユーザ名
  # params[:password] : パスワード
  post "/login" do
    if auth(params[:username], params[:password])
      redirect to("/menu")
    else
      halt 403, "ユーザ名またはパスワードが正しくありません。"
    end
  end

  # ログアウト
  post "/logout" do
    session.clear
    redirect to("/")
  end

  get "/menu" do
    unless authorized?
      redirect to("/")
    end
    erb :menu
  end

  # ユーザ情報の取得
  get "/info" do
    protected!
    json @user.to_hash
  end

  # パスワードの確認
  # params[:password]
  post "/passwd/check" do
    protected!
    json({:result => @user.check_password(params[:password])})
  end
  
  # パスワードの変更
  # params[:new_password]
  post "/passwd" do
    protected!
    @user.password = params[:new_password]
    json({:result => true})
  end

  # 転送設定
  # params[:forward_address]
  post "/forward" do
    protected!
    @user.set_forward(params[:forward_address])
    json @user.to_hash
  end

  # 転送設定の解除
  post "/forward/disable" do
    protected!
    @user.disable_forward
    json @user.to_hash
  end
end
