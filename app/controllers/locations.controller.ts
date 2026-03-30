import { ParameterizedContext } from "koa";

import { getCities, getContinents, getCountries } from "../services/locations.service";

/**
 * Handler that returns all cities from the system, can be filtered
 * @returns Returns a Promise that resolves location values
 */
export const getCitiesHandler = async (ctx: ParameterizedContext) => {
  return await getCities(ctx.request.query);
};

/**
 * Handler that returns all countries from the system
 * @returns Returns a Promise that resolves location values
 */
export const getCountriesHandler = async (ctx: ParameterizedContext) => {
  return await getCountries();
};

/**
 * Handler that returns all continents from the system
 * @returns Returns a Promise that resolves location values
 */
export const getContinentsHandler = async (ctx: ParameterizedContext) => {
  return await getContinents();
};
