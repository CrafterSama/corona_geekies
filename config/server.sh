#!/bin/bash

DIR="$1"
DIR_APP="$DIR/current"

echo 'npm bower gulp'
cd $DIR_APP && npm install && bower install && gulp build

echo 'hack para symlink'
ln -s $DIR/current/dist/asset/images $DIR/current/dist/images