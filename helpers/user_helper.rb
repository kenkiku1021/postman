module UserHelper
  def protected!
    if !authorized?
      halt 403, "Not authorized"
    else
      @user = User[session[:userid].to_i]
    end
  end
  
  def authorized?
    !session[:userid].nil?
  end

  def auth(username, password)
    session[:userid] = nil
    user = User.find_by_username(username)
    if user.nil?
      return false
    end
    if user.check_password(password)
      @user = user
      session[:userid] = @user.id
    end
    !session[:userid].nil?
  end
end
