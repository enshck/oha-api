// eslint-disable-next-line import/no-unresolved
import { v4 as generateUniqueId } from "uuid";

import { hardcodedData } from "../shared/constants";
import { getWikiDescription } from "../shared/helpers/getWikiDescription";
import { GetCitiesQuery } from "../shared/types";

/**
 * Function to return all cities
 * @function getCities
 * @param filterQuery - Object containing optional filters for cities
 * @returns Returns city entries
 */
export const getCities = async (filterQuery: GetCitiesQuery) => {
  const { search, country, continent } = filterQuery;

  const wikiDescriptions = await Promise.allSettled(
    hardcodedData.cities.map(({ name, name_native }) => getWikiDescription({ name, name_native })),
  );

  let cities = hardcodedData.cities.map(
    ({ name, name_native, country, continent, latitude, longitude, population, founded, landmarks }, index) => {
      // eslint-disable-next-line security/detect-object-injection
      const wikiDescription = wikiDescriptions[index];

      return {
        id: generateUniqueId(),
        name,
        name_native,
        country,
        continent,
        latitude,
        longitude,
        population,
        founded,
        landmarks,
        description: wikiDescription?.status === "fulfilled" ? wikiDescription.value : undefined,
      };
    },
  );

  if (search) {
    cities = cities.filter((city) => city.name.toLowerCase().includes(search.toLowerCase()));
  }

  if (country) {
    cities = cities.filter((city) => city.country.toLowerCase() === country.toLowerCase());
  }

  if (continent) {
    cities = cities.filter((city) => city.continent.toLowerCase() === continent.toLowerCase());
  }

  return cities;
};

/**
 * Function to return all countries
 * @function getCountries
 * @returns Returns country entries
 */
export const getCountries = () => {
  return [...new Set(hardcodedData.cities.map((city) => city.country))];
};

/**
 * Function to return all continents
 * @function getContinents
 * @returns Returns continent entries
 */
export const getContinents = () => {
  return [...new Set(hardcodedData.cities.map((city) => city.continent))];
};
