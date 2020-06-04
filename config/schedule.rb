set :environment, 'development'
set :output, '/var/log/cron.log'

ENV.each { |k, v| env(k, v) }

every 24.hours do
  rake 'clear_expired_tokens'
end
