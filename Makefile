.PHONY: bash
bash: ## Ouvre une session bash.
	@docker-compose exec -u 1000:1000 app sh

.PHONY: root
root: ## Ouvre une session bash.
	@docker-compose exec app sh

.PHONY: dev
dev: ## lance le serveur de dev
	@docker-compose exec app npm run dev

.PHONY: build
build: ## lance le serveur de dev
	@docker-compose exec app npm run build

.PHONY: preview
preview: ## lance le serveur de dev
	@docker-compose exec app npm run preview