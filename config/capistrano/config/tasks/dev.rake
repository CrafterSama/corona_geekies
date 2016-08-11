after :deploy ,'after_deploy' do
    on roles([:app]) do |host|
        application = 'corona_frontend'
        execute("bash -l -c \"cd #{deploy_to}/current/config && ./server.sh #{deploy_to}\"")
        execute("bash -l -c \"cd #{deploy_to}/current/config/ && sudo ./server_sudo.sh #{deploy_to} dev.corona.geekies.co\"")
    end
end