Bundler.require

DB = Sequel.connect(SequelDbConfig::Config.instance.connection_string)
require "./helpers/application_helper"
require "./application_controller"
Dir.glob('./{lib,models,helpers,controllers}/*.rb').each { |file| require file }

map("/user") { run UserController }
map("/admin") { run AdminController }
map("/") { run ApplicationController }
