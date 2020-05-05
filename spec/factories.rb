FactoryBot.define do
  factory :jwt_blacklist do
    jti { "MyString" }
    exp { "2020-05-04 12:49:21" }
  end

  factory :user do
    firstname { Faker::Name.first_name }
    lastname { Faker::Name.last_name }
    email { Faker::Internet.email }
    password { Faker::Internet.password }
  end
end