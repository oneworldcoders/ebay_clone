desc 'clear expired tokens'
task clear_expired_tokens: :environment do
  JwtBlacklist.clear_expired_tokens
end
