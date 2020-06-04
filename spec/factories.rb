FactoryBot.define do
  factory :product do
    title { 'title' }
    subheader {}
    imageUrl {}
    imageTitle {}
    description {}
  end

  factory :user do
    firstname { Faker::Name.first_name }
    lastname { Faker::Name.last_name }
    email { Faker::Internet.email }
    password { Faker::Internet.password }
  end
end