#!/bin/bash

docker image rm $(docker image ls -aq) -f
docker build -t tfgportscanner/portscanner-backend:latest .
docker push tfgportscanner/portscanner-backend:latest
