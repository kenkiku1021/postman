#!/usr/bin/env ruby
require "bundler"
require "./init-models"

def usage
  print <<EOS
Import users and passwords from dovecot passwd format file.
#{$0} [passwd_file]
EOS
end

if ARGV.size < 1
  usage
  exit
end

begin
  passwd_file = ARGV[0]
  unless File.exists?(passwd_file)
    raise "Cannot open passwd file : #{passwd_file}"
  end
  users_count = 0
  File.open(passwd_file, "r") do |f|
    DB.transaction do
      f.each_line do |line|
        (userid, password, uid, gid, empty, home, empty, empty) = line.chomp.split(":", 8)
        user = User.new
        print "importing user #{userid}\n"
        user.username = userid
        if password =~ /^{plain}(.+)$/
          user.password = $1
        else
          user.password = password
        end
        user.uid = uid
        user.gid = gid
        user.home_dir = home
        user.forwarded = false
        if user.valid?
          user.save
          users_count += 1
        else
          user.errors.each do |field, messages|
            messages.each do |msg|
              print "[Warn] #{msg}\n"
            end
          end
        end
      end
    end
    print "[Complete] #{users_count} users imported.\n"
  end
rescue => ex
  print "[Error] #{ex.message}\n"
end
