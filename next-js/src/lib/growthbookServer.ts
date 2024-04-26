import { GrowthBook, setPolyfills } from "@growthbook/growthbook";

// Tag fetch requests so they can be revalidated on demand
setPolyfills({
  fetch: (
    url: Parameters<typeof fetch>[0],
    opts: Parameters<typeof fetch>[1]
  ) =>
    fetch(url, {
      ...opts,
      next: {
        // Cache feature definitions for 1 minute
        // Implement SDK webhooks to revalidate on demand (see gb-revalidate route handler)
        revalidate: 60,
        tags: ["growthbook"],
      },
    }),
});

// It's important to create a new instance per request when server-side to prevent
// race condtions from occurring between different user requests.
export async function getInstance() {
  const gb = new GrowthBook({
    apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    decryptionKey: process.env.NEXT_PUBLIC_GROWTHBOOK_DECRYPTION_KEY,

    // These are server-specific settings
    backgroundSync: false,
    subscribeToChanges: false,
  });

  await gb.loadFeatures({
    timeout: 1000,
    // Rely on the Next.js fetch cache instead of the built-in one
    skipCache: true,
  });

  return gb;
}

// TODO: Swap this out with built-in SDK method from Edge work
export function getPayload(gb: GrowthBook) {
  return {
    features: gb.getFeatures(),
    experiments: gb.getExperiments(),
  };
}
