Bundler.require
DB = Sequel.connect(SequelDbConfig::Config.instance.connection_string)
Dir.glob('./{lib,models}/*.rb').each { |file| require file }
