import * as Router from "@koa-better-modules/joi-router";

import { getCitiesHandler, getContinentsHandler, getCountriesHandler } from "../controllers";
import {
  errorValidators,
  getCitiesResponseValidator,
  getCitiesQueryValidator,
  getContinentsResponseValidator,
  getCountriesResponseValidator,
} from "../shared/validators";

const locations = new Router();
locations.prefix("/locations");

locations.route({
  method: "get",
  path: "/cities",
  validate: {
    query: getCitiesQueryValidator,
    output: {
      200: {
        body: getCitiesResponseValidator,
      },
      500: {
        body: errorValidators,
      },
      400: {
        body: errorValidators,
      },
    },
  },
  meta: {
    swagger: {
      summary: "Returns all cities from the system, can be filtered",
      description: "Returns all cities from the system, can be filtered",
      tags: ["LOCATIONS", "CITIES"],
    },
  },
  handler: getCitiesHandler,
});

locations.route({
  method: "get",
  path: "/countries",
  validate: {
    output: {
      200: {
        body: getCountriesResponseValidator,
      },
      500: {
        body: errorValidators,
      },
      400: {
        body: errorValidators,
      },
    },
  },
  meta: {
    swagger: {
      summary: "Returns all countries from the system, can be filtered",
      description: "Returns all countries from the system, can be filtered",
      tags: ["LOCATIONS", "COUNTRIES"],
    },
  },
  handler: getCountriesHandler,
});

locations.route({
  method: "get",
  path: "/continents",
  validate: {
    output: {
      200: {
        body: getContinentsResponseValidator,
      },
      500: {
        body: errorValidators,
      },
      400: {
        body: errorValidators,
      },
    },
  },
  meta: {
    swagger: {
      summary: "Returns all continents from the system",
      description: "Returns all continents from the system",
      tags: ["LOCATIONS", "CONTINENTS"],
    },
  },
  handler: getContinentsHandler,
});

export default locations;
