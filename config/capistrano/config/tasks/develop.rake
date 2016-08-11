after :deploy ,'after_deploy' do
    on roles([:app]) do |host|
        deploy_path = deploy_to
        application = 'corona_frontend'
        execute("bash -l -c \"cd #{deploy_path}/current/config && ./server.sh #{deploy_to}\"")
    end
end