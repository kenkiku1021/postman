require "bundler"
task :install => [:bundle]

task :bundle do
  sh "bundle install"
end

task :run, 'port'
task :run do |task, args|
  if args["port"]
    port = args["port"].to_i
  else
    port = 4567
  end
  sh "bundle exec rackup -s thin -p #{port}"
end

task :irb do
  sh "bundle exec irb -r ./init-models"
end

namespace :db do
  task :migrate, 'version'
  task :migrate do |task, args|
    Bundler.setup
    require "sequel"
    require "sequel_db_config"
    if args['version']
      version = "-M #{args['version']}"
    else
      version = ""
    end
    dbcfg = SequelDbConfig::Config.instance
    cmd = "sequel -m migrations #{version} #{dbcfg.connection_string}"
    sh cmd
  end
end

