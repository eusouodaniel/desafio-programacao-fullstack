# hubla-import-transactions-client

Import transactions Hubla client

## Tech stack

### React with NextJS
Frontend is a React and NextJS

## How to run project with Docker

After this
```
docker build -t hubla-import-transactions-client .
```
```
docker run -p 3002:3000 -d hubla-import-transactions-client
```
- The project will start on port `3002`

## How to run project without docker - Recommended

- Install libs: `yarn`
- Run app: `yarn run dev`
- Build app: `yarn run build`
- Run in prod: `yarn run start`

## Docs
- `/` - Login in the app
- `/dashboard` - Send txt and show balance

## Gaps
- Stylization
- Using keycloak for authentication
- Deploying on a CDN service
- Greater test coverage - Cypress
- Cloud logging system - Sentry
- Add run tests in pipeline
- Add option to refresh token
