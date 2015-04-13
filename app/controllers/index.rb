get '/' do
  erb :index
end

post '/signup' do
  new_user = User.new(username: params[:username], password: params[:password])
  if new_user.save
    session[:user_id] = new_user.id
    redirect '/map'
  else
    @error = "Username already taken"
    erb :index
  end
end

post '/login' do
  @user = User.find_by(username: params[:username])
  if @user && @user.password == params[:password]
    session[:user_id] = @user.id
    redirect '/map'
  else
    @error = "Wrong email or password"
    erb :index
  end
end

get '/map' do
  erb :map
end

delete '/sessions/:id' do
  session.delete(:user_id)
  redirect '/'
end
