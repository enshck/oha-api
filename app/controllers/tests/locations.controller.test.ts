import { ParameterizedContext } from "koa";

import { getCities, getContinents, getCountries } from "../../services/locations.service";
import { getCitiesHandler, getContinentsHandler, getCountriesHandler } from "../locations.controller";

jest.mock("../../services/locations.service");

const mockedGetCities = getCities as jest.MockedFunction<typeof getCities>;
const mockedGetCountries = getCountries as jest.MockedFunction<typeof getCountries>;
const mockedGetContinents = getContinents as jest.MockedFunction<typeof getContinents>;

const createMockCtx = (query: Record<string, string> = {}): Partial<ParameterizedContext> & { ok: jest.Mock } => ({
  request: { query } as ParameterizedContext["request"],
  ok: jest.fn(),
});

describe("locations.controller", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("getCitiesHandler", () => {
    it("calls getCities with request query and responds ok", async () => {
      const mockCities = [{ id: "1", name: "Tokyo" }];
      mockedGetCities.mockResolvedValue(mockCities as never);

      const ctx = createMockCtx({ search: "Tokyo" });
      await getCitiesHandler(ctx as ParameterizedContext);

      expect(mockedGetCities).toHaveBeenCalledWith({ search: "Tokyo" });
      expect(ctx.ok).toHaveBeenCalledWith(mockCities);
    });

    it("calls getCities with empty query when no params provided", async () => {
      mockedGetCities.mockResolvedValue([]);

      const ctx = createMockCtx();
      await getCitiesHandler(ctx as ParameterizedContext);

      expect(mockedGetCities).toHaveBeenCalledWith({});
      expect(ctx.ok).toHaveBeenCalledWith([]);
    });
  });

  describe("getCountriesHandler", () => {
    it("calls getCountries and responds ok", () => {
      const mockCountries = ["Japan", "Germany"];
      mockedGetCountries.mockReturnValue(mockCountries);

      const ctx = createMockCtx();
      getCountriesHandler(ctx as ParameterizedContext);

      expect(mockedGetCountries).toHaveBeenCalled();
      expect(ctx.ok).toHaveBeenCalledWith(mockCountries);
    });
  });

  describe("getContinentsHandler", () => {
    it("calls getContinents and responds ok", () => {
      const mockContinents = ["Asia", "Europe"];
      mockedGetContinents.mockReturnValue(mockContinents);

      const ctx = createMockCtx();
      getContinentsHandler(ctx as ParameterizedContext);

      expect(mockedGetContinents).toHaveBeenCalled();
      expect(ctx.ok).toHaveBeenCalledWith(mockContinents);
    });
  });
});
