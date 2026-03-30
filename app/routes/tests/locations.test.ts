import { getCitiesHandler, getContinentsHandler, getCountriesHandler } from "../../controllers";
import locations from "../locations";

interface RouteSpec {
  method: string[];
  path: string;
  handler: ((...args: unknown[]) => unknown)[];
}

const routeSpecs: RouteSpec[] = (locations as unknown as { routes: RouteSpec[] }).routes;

const findRoute = (path: string) => routeSpecs.find((r) => r.path === path);

describe("locations routes", () => {
  it("registers 3 routes total", () => {
    expect(routeSpecs).toHaveLength(3);
  });

  describe("GET /cities", () => {
    const route = findRoute("/cities");

    it("is defined", () => expect(route).toBeDefined());
    it("uses GET method", () => expect(route!.method).toContain("get"));
    it("assigns getCitiesHandler", () => expect(route!.handler[0]).toBe(getCitiesHandler));
  });

  describe("GET /countries", () => {
    const route = findRoute("/countries");

    it("is defined", () => expect(route).toBeDefined());
    it("uses GET method", () => expect(route!.method).toContain("get"));
    it("assigns getCountriesHandler", () => expect(route!.handler[0]).toBe(getCountriesHandler));
  });

  describe("GET /continents", () => {
    const route = findRoute("/continents");

    it("is defined", () => expect(route).toBeDefined());
    it("uses GET method", () => expect(route!.method).toContain("get"));
    it("assigns getContinentsHandler", () => expect(route!.handler[0]).toBe(getContinentsHandler));
  });
});
