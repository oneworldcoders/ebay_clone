FROM ruby:2.6.3

RUN mkdir /app
WORKDIR /app

RUN apt-get update && apt-get install -y \
  curl \
  build-essential \
  cron \
  libpq-dev &&\
  curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get install -y nodejs yarn

COPY Gemfile Gemfile.lock ./
RUN gem install bundler -v 2.1.4 

RUN bundle install

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# Create empty crontab file
RUN crontab -l | { cat; echo ""; } | crontab -

# Update crontab file using whenever command
RUN bundle exec whenever --update-crontab

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]
