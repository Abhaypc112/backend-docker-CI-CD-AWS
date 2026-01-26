#!/bin/bash

docker pull your_dockerhub_username/node-backend:latest

docker stop node-app || true
docker rm node-app || true

docker run -d \
  --name node-app \
  -p 3000:3000 \
  --env-file .env \
  your_dockerhub_username/node-backend:latest
