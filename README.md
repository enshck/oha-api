# oha-api

Small REST API built with `Koa` and `TypeScript` for working with locations: cities, countries, and continents.

## Features

- Returns a list of cities.
- Supports city filtering by `search`, `country`, and `continent`.
- Returns a unique list of countries.
- Returns a unique list of continents.
- Serves Swagger UI.

## Quick Start

### 1. Install dependencies

```bash
Please make sure that you use node v22
yarn install
```

### 2. Create `.env` from `.env.sample` file

Example minimal configuration:

```env
NODE_ENV=development
HOST=0.0.0.0
PORT=4000
```

### 3. Run the project

```bash
yarn dev
```

After startup, the API will be available at:

```text
http://HOST:PORT
```

For the example configuration above:

```text
http://localhost:4000
```

## Testing

I use jest here to cover everything by unit tests

You can use:

```bash
yarn test

or

yarn test:coverage
```

to run tests and check coverage

## Main Commands

```bash
yarn dev
yarn build
yarn test
yarn test:coverage
yarn lint
```

## Main Endpoints

- `GET /api/v1/locations/cities` - returns the list of cities.
- `GET /api/v1/locations/cities?search=paris` - filters cities by name.
- `GET /api/v1/locations/cities?country=France` - filters cities by country.
- `GET /api/v1/locations/cities?continent=Europe` - filters cities by continent.
- `GET /api/v1/locations/countries` - returns the list of countries.
- `GET /api/v1/locations/continents` - returns the list of continents.

## Swagger

Swagger UI is available at:

```text
http://HOST:PORT/swagger
```

Swagger JSON is available at:

```text
http://HOST:PORT/api/v1/swagger.json
```
