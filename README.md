# SellerHub

Projet d'entraînement : une plateforme de gestion de vendeurs marketplace (inspirée du fonctionnement d'une marketplace 3P), construite pour pratiquer Clean Architecture, DDD, CQRS et une architecture event-driven avant une mission réelle sur ce type de sujet.

## Stack

- **NestJS** / TypeScript
- **MongoDB** (driver officiel `mongodb`, pas d'ODM)
- **Kafka** (image officielle `apache/kafka`, mode KRaft, sans Zookeeper)
- **Jest** pour les tests
- **Docker Compose** pour l'infra locale (Mongo, Kafka, Kafka UI)
- ESLint (Airbnb) + Prettier + Husky/lint-staged

## Architecture

Le code suit une Clean Architecture en 3 couches, module par module (`src/modules/sellers/...`) :

```
domain/          → règles métier pures, aucune dépendance externe
  entities/        l'agrégat Seller et son state machine
  value-objects/   SellerId, SellerEmail (validation encapsulée)
  enums/           SellerStatus
  errors/          erreurs métier typées

application/     → orchestration, ne connaît que des abstractions
  commands/        intentions d'écriture (ex: CreateSellerCommand)
  handlers/        logique d'exécution d'une command (CQRS write-side)
  ports/           interfaces (ex: SellerRepository) implémentées par l'infra

infrastructure/  → détails techniques, remplaçables sans toucher au métier
  persistance/mongo/   implémentation Mongo du port SellerRepository
```

Le principe directeur : le `domain` ne dépend de rien, l'`application` ne dépend que d'abstractions (les `ports`), et l'`infrastructure` implémente ces abstractions. Ça permet de changer de base de données ou de framework HTTP sans toucher à la logique métier.

### Pourquoi `create()` et `reconstitute()` sont deux méthodes séparées sur `Seller`

`create()` encode la règle "un nouveau vendeur est toujours PENDING, créé maintenant" — c'est un événement métier. `reconstitute()` recharge un vendeur déjà existant depuis la persistance, avec son statut et sa date réels, sans réappliquer les règles de création. Mélanger les deux aurait un bug silencieux : relire un vendeur `APPROVED` depuis Mongo écraserait son statut avec `PENDING`.

### Pourquoi CQRS (Command/Handler) plutôt qu'un simple service

Une `Command` (ex: `CreateSellerCommand`) est une donnée qui décrit une intention, sans logique. Un `Handler` (ex: `CreateSellerHandler`) exécute cette intention. Séparer les deux prépare le terrain pour router les commands via un command bus plus tard, et rend chaque écriture explicite et testable indépendamment.

## Lancer le projet

```bash
npm install

# Infra locale (Mongo + Kafka + Kafka UI)
docker compose up -d

# Tests
npm test

# Lint
npm run lint
```

- Mongo : `localhost:27017`
- Kafka : `localhost:9092` (broker), `localhost:8080` (Kafka UI)

## État actuel

- [x] Domain : entité `Seller` avec state machine complet (`submitForReview`, `approve`, `suspend`, `reject`, `reactivate`), Value Objects validés, erreurs métier typées
- [x] Application : write-side CQRS pour la création d'un vendeur (`CreateSellerCommand` + `CreateSellerHandler`), port `SellerRepository`
- [x] Infrastructure : `MongoSellerRepository` (save/findById via le driver MongoDB officiel)
- [x] Infra locale : Mongo + Kafka (KRaft) + Kafka UI via `docker-compose.yml`
- [ ] Domain Events (`SellerCreatedEvent`, `SellerApprovedEvent`) publiés vers Kafka
- [ ] Consumer event-driven
- [ ] API REST (`POST/GET/PATCH /sellers`)
- [ ] Tests d'intégration (Mongo réel, publication Kafka)

## Hors scope (pour l'instant)

Authentification/JWT, BigQuery, observabilité (Datadog), Kubernetes, CQRS read-side complet — volontairement écartés pour rester sur un scope réalisable en quelques jours, centré sur la démonstration des patterns d'architecture plutôt que sur la couverture fonctionnelle.
