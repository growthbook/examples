import { GrowthBook, Context } from "@growthbook/growthbook";

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
