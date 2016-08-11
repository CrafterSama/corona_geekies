role :app, %w{deploy@dev.corona.geekies.co:6587}

set :stage, :deploy
server 'dev.corona.geekies.co', user: 'deploy', roles: %w{app}

set :branch, 'develop'

set :deploy_to, '/home/deploy/corona_frontend'
set :application, 'corona_frontend'