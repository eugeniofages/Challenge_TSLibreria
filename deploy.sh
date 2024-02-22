#!/bin/bash

cd frontend

docker build -t frontend-image .

docker run -d -p 5173:5173 --name frontend-container frontend-image

cd ..

cd backend
composer install

docker-compose up --build -d

