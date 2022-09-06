.PHONY: help install start stop seed

export UID = $(shell id -u)
export GID = $(shell id -g)

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies, and seed the database
	docker-compose run --rm seed yarn
	$(MAKE) seed
	docker-compose run --rm front yarn

start:
	docker-compose up -d --force-recreate

stop:
	docker-compose down

seed: 
	docker-compose run --rm seed npx ts-node ./src/seed.ts