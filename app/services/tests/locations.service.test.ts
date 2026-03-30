import { getWikiDescription } from "../../shared/helpers/getWikiDescription";
import { getCities, getContinents, getCountries } from "../locations.service";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "test-uuid"),
}));

jest.mock("../../shared/helpers/getWikiDescription", () => ({
  getWikiDescription: jest.fn(({ name }: { name: string }) => Promise.resolve(`Description for ${name}`)),
}));

const mockedGetWikiDescription = getWikiDescription as jest.MockedFunction<typeof getWikiDescription>;

describe("locations.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns all cities enriched with wiki descriptions", async () => {
    const result = await getCities({});

    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toEqual(
      expect.objectContaining({
        id: "test-uuid",
        name: expect.any(String),
        country: expect.any(String),
        description: expect.stringContaining("Description for"),
      }),
    );
    expect(mockedGetWikiDescription).toHaveBeenCalledTimes(result.length);
  });

  it("filters cities by country and continent", async () => {
    const byCountry = await getCities({ country: "usa" });
    const byContinent = await getCities({ continent: "europe" });

    expect(byCountry).toHaveLength(1);
    expect(byCountry[0].name).toBe("New York City");
    expect(byContinent.every((city) => city.continent.toLowerCase() === "europe")).toBe(true);
  });

  it("sets description to undefined when getWikiDescription rejects", async () => {
    mockedGetWikiDescription.mockRejectedValue(new Error("network error"));

    const result = await getCities({ search: "Sydney" });

    expect(result[0].description).toBeUndefined();
  });

  it("returns unique countries and continents", () => {
    const countries = getCountries();
    const continents = getContinents();

    expect(countries).toContain("USA");
    expect(continents).toContain("Europe");
    expect(new Set(countries).size).toBe(countries.length);
    expect(new Set(continents).size).toBe(continents.length);
  });
});
