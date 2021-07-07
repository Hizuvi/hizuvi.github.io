up-api:
	docker-compose up api

up-helpers:
	docker-compose up server mongo


up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

down: 
	docker-compose down