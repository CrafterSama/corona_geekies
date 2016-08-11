#!/bin/bash

DIR="$1"
DOMAIN="$2"

echo 'ajustando path supervisor nginx'
find $DIR/current/config/nginx/corona-fontend.conf -type f -exec sed -i "s@<path>@$DIR@g" {} +
find $DIR/current/config/nginx/corona-frontend.conf -type f -exec sed -i "s@<domain>@$DOMAIN@g" {} +

echo 'configurando nginx'
ln -s $DIR/current/config/nginx/corona-frontend.conf /etc/nginx/conf.d/
service nginx restart