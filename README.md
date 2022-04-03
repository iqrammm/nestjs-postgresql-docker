# Nestjs + Postgres + Typeorm + Docker(w/ compose)!


# Presequites
Have docker installed

## Running Project
Run:
```
1. Go to terminal
2. docker-compose up --build
3. access the apis using postman or any client at port 3000
4. Included postman collection and request.http(vs code extension) for usage
```

## Run tests

```
// For e2e tests
npm run test:e2e

// unit tests
npm run test
```

## Troubleshooting
```
Q: Having issues with database not connecting?
A: https://stackoverflow.com/questions/56657683/postgres-docker-image-is-not-creating-database-with-custom-name
```