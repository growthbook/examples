import { GrowthBook, Context, setPolyfills } from "@growthbook/growthbook";

setPolyfills({
  fetch: (
    url: Parameters<typeof fetch>[0],
    opts: Parameters<typeof fetch>[1]
  ) =>
    fetch(url, {
      ...opts,
      next: {
        // cache results for an hour at most (static pages)
        revalidate: 3600,
        // see route handler for revalidating cache tagged under 'growthbook'
        tags: ["growthbook"],
      },
    }),
});

// It's important to create a new instance per request when server-side to prevent
// race condtions from occurring between different user requests.
export const createGB = (args: Partial<Context> = {}) => {
  return new GrowthBook({
    apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    decryptionKey: process.env.NEXT_PUBLIC_GROWTHBOOK_DECRYPTION_KEY,
    ...args,
  });
};
