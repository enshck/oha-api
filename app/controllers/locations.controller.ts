import { ParameterizedContext } from "koa";

import { getCities, getContinents, getCountries } from "../services/locations.service";

/**
 * Handler that returns all cities from the system, can be filtered
 * @returns Returns location values
 */
export const getCitiesHandler = async (ctx: ParameterizedContext) => {
  const result = await getCities(ctx.request.query);

  ctx.ok(result);
};

/**
 * Handler that returns all countries from the system
 * @returns Returns location values
 */
export const getCountriesHandler = (ctx: ParameterizedContext) => {
  const result = getCountries();

  ctx.ok(result);
};

/**
 * Handler that returns all continents from the system
 * @returns Returns location values
 */
export const getContinentsHandler = (ctx: ParameterizedContext) => {
  const result = getContinents();

  ctx.ok(result);
};
