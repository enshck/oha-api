import * as sanitizeHtml from "sanitize-html";

import { WikiDescription } from "../types";

interface GetWikiDescriptionParams {
  name: string;
  name_native?: string;
  is_retry?: boolean;
}

export const getWikiDescription = async ({
  name,
  name_native,
  is_retry,
}: GetWikiDescriptionParams): Promise<string | null> => {
  const normalizedName = name.replace(/\s/g, "_");

  const res = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&titles=${normalizedName}&format=json&origin=*`,
  );

  const data: WikiDescription = await res.json();
  const page = Object.values(data?.query?.pages ?? {})?.[0];
  const extract = page?.extract;

  if (!extract) {
    if (!is_retry && name_native) {
      return getWikiDescription({ name: name_native, is_retry: true });
    }

    return null;
  }

  return sanitizeHtml(extract, {
    allowedTags: [],
    allowedAttributes: {},
  });
};
