# Storefront Backend Project

[<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />](https://nodejs.org/en/)  [<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />](https://expressjs.com/)  [<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />](https://typescriptlang.org) [<img src="https://img.shields.io/badge/Jasmine-8a4182?style=for-the-badge&logo=jasmine&logoColor=white" />](https://jasmine.github.io/) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

NodeJS Express application to create REST APIs for an online store application.

## Pre-requisites

Install [Node.js](https://nodejs.org/en/) latest LTS.

## Getting Started

- Clone/download the project and install dependencies before getting started

```shell
npm i
```
### Setup postgres using docker and DB setup

- Start docker container to setup postgres image using
```shell
docker-compose up
```
- Run docker container in bash with
```shell
docker exec -i -t <docker_container_name> bash`
```
- Login to postgres server
```shell
psql -U <postgres_user>
```
- Create DB for dev and test env
`CREATE DATABASE store;`
`CREATE DATABASE store_test;`

- Create a new database user with access rights
```bash
CREATE USER <db_user_name> WITH PASSWORD <db_user_password>;
GRANT ALL PRIVILEGES ON DATABASE store TO <db_user_name>;
GRANT ALL PRIVILEGES ON DATABASE store_test TO <db_user_name>;
```
- Connect to DB
```shell
\c <database_name>
```
### Setup environment

In root of project include .env file with following details
```bash
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store_data
POSTGRES_TEST_DB=store_test_data
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secret_pass
BCRYPT_PASSWORD=your_secret_pass
JWT_TOKEN_SECRET=your_secret_pass
SALT_ROUNDS=10
ENV=dev
```
### Run migrations
```shell
db-migrate up --config ./database.json -env dev
```
```shell
db-migrate up --config ./database.json -env test
```
### Scripts:

- Start server
```shell
npm run start
```
- Start server watch mode
```shell
npm run watch
```
- Build
```shell
npm run build
```
- Tesing with Jasmine
```shell
npm run test
```
- Formatting and linting
```shell
npm run prettier
npm run lint
```
