
# hubla-import-transactions

Import transactions Hubla

## Tech stack

### NodeJS with Typescript

Backend is a NodeJS and Typescript application, running Express, Postgres database and auth via JWT - Transparent Token

Primary keys are uuid for using microservices

The entrypoint is the `src/server.ts` file.

### Swagger
`/api-docs`

### Tests

Tests using **Jest**

Test file path `src/__tests__` folder.


## How to run project with Docker

Create file `.env` in folder and pass variables to db.

Example:
```
TYPEORM_HOST=localhost
TYPEORM_HOST_TEST=localhost
TYPEORM_PORT=5432
TYPEORM_PORT_TEST=5431
TYPEORM_USERNAME=root
TYPEORM_PASSWORD=123456
TYPE_ORM_DATABASE=hubla_import_transactions
TYPE_ORM_DATABASE_TEST=hubla_import_transactions_test
TYPEORM_MIGRATIONS=/../../src/database/migrations/*.js
TYPEORM_MODELS=/../../src/entities/*.js
```
After this
```
docker-compose up --build -d
```
The project will start on port `3001`
Database in `5432`
Database test in `5431`
Adminer(Interface to query data) `8080`

## How to run project without docker
Create file `.env.dev` in folder and pass variables to db.
Example:
```
TYPEORM_HOST=localhost
TYPEORM_HOST_TEST=localhost
TYPEORM_PORT=5432
TYPEORM_PORT_TEST=5431
TYPEORM_USERNAME=root
TYPEORM_PASSWORD=123456
TYPE_ORM_DATABASE=hubla_import_transactions
TYPE_ORM_DATABASE_TEST=hubla_import_transactions_test
TYPEORM_MIGRATIONS=/../../src/database/migrations/*.ts
TYPEORM_MODELS=/../../src/entities/*.ts
```
Run app: `yarn run dev`
Run migration: `yarn run typeorm migration:run -d src/database/index.ts`
Run seed: `yarn run seed`
Run tests: `yarn run test`
Build app: `yarn run build`
Run in prod: `yarn run start`

## Docs

- `[GET] /healthz` - Check if application is online.
- `[POST] /auth/login` - Endpoint to log in, passing email and password, the authentication token will be returned, which is valid for one hour.
- `[GET] /auth/me` - Returns token and role of the logged in user
- `[GET] /transactions` - Returns all balance by transactions
- `[GET] /transactions/import` - Send file to import
- `[GET] /api-docs`- Access Swagger

## Gaps
- Audit of uploaded files
- User linkage that sent transaction with transaction itself
- Decoupling file upload - store in public storage - S3
- Using keycloak for authentication
- Messaging usage for delivery guarantee and fallback
- Deploying on a Kubernetes cluster
- Resilience in the event of an event loss
- Greater test coverage
- Remove tests directly in the database, the ideal is not to have this lock in
- Cloud logging system - Kibana, CloudWatch
- Observability
- Monitoring
