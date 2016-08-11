#!/bin/bash

DIR="$1"
DIR_APP="$DIR/current"

echo 'npm bower gulp'
cd $DIR_APP && npm install && bower install && gulp build