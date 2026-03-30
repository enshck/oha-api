import { getWikiDescription } from "../getWikiDescription";

const mockFetch = jest.fn();
global.fetch = mockFetch;

jest.mock("sanitize-html", () => {
  const mock = jest.fn((_input: string, _opts?: unknown) => "sanitized text");
  return Object.assign(mock, { default: mock, __esModule: true });
});

const makeFetchResponse = (pages: Record<string, { extract: string } | object>) =>
  ({
    json: jest.fn().mockResolvedValue({ query: { pages } }),
  }) as unknown as Response;

describe("getWikiDescription", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns sanitized extract when found", async () => {
    mockFetch.mockResolvedValue(makeFetchResponse({ "1": { extract: "<p>Some text</p>" } }));

    const result = await getWikiDescription({ name: "Tokyo" });

    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("Tokyo"));
    expect(result).toBe("sanitized text");
  });

  it("replaces spaces with underscores in the URL", async () => {
    mockFetch.mockResolvedValue(makeFetchResponse({ "1": { extract: "text" } }));

    await getWikiDescription({ name: "New York City" });

    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("New_York_City"));
  });

  it("retries with name_native when extract is missing and not a retry", async () => {
    mockFetch
      .mockResolvedValueOnce(makeFetchResponse({ "1": {} }))
      .mockResolvedValueOnce(makeFetchResponse({ "1": { extract: "native text" } }));

    const result = await getWikiDescription({ name: "Tokyo", name_native: "東京" });

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch).toHaveBeenNthCalledWith(2, expect.stringContaining("東京"));
    expect(result).toBe("sanitized text");
  });

  it("returns null when extract is missing and no name_native", async () => {
    mockFetch.mockResolvedValue(makeFetchResponse({ "1": {} }));

    const result = await getWikiDescription({ name: "Unknown" });

    expect(result).toBeNull();
  });

  it("returns null when extract is missing on retry", async () => {
    mockFetch.mockResolvedValue(makeFetchResponse({ "1": {} }));

    const result = await getWikiDescription({ name: "Unknown", name_native: "Unknown", is_retry: true });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result).toBeNull();
  });

  it("returns null when pages is empty", async () => {
    mockFetch.mockResolvedValue(makeFetchResponse({}));

    const result = await getWikiDescription({ name: "NoCity" });

    expect(result).toBeNull();
  });

  it("returns null when query is undefined in response", async () => {
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    } as unknown as Response);

    const result = await getWikiDescription({ name: "NoCity" });

    expect(result).toBeNull();
  });

  it("returns null when query.pages is null", async () => {
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ query: { pages: null } }),
    } as unknown as Response);

    const result = await getWikiDescription({ name: "NoCity" });

    expect(result).toBeNull();
  });
});
