import { Joi } from "@koa-better-modules/joi-router";

import { stringRequired, stringOptional, idRequired } from "./shared.validators";

const countryValidator = stringRequired.min(1).max(30);
const continentValidator = stringRequired.min(1).max(30);

export const getCitiesResponseValidator = Joi.array().items(
  Joi.object({
    id: idRequired,
    name: stringRequired.min(1).max(100),
    name_native: stringRequired.min(1).max(100),
    country: countryValidator,
    continent: continentValidator,
    latitude: stringRequired.min(1).max(30),
    longitude: stringRequired.min(1).max(30),
    population: stringRequired.min(1).max(30),
    founded: stringRequired.min(1).max(4),
    landmarks: Joi.array().items(stringRequired.min(1).max(50)).min(1),
    description: stringOptional.min(1).max(10000).allow("", null),
  }),
);

export const getCitiesQueryValidator = Joi.object({
  search: stringOptional.min(1).max(100),
  country: stringOptional.min(1).max(30),
  continent: stringOptional.min(1).max(30),
});

export const getCountriesResponseValidator = Joi.array().items(countryValidator);

export const getContinentsResponseValidator = Joi.array().items(continentValidator);
