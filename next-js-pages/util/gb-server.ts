import { setPolyfills } from "@growthbook/growthbook";
import { GetServerSidePropsContext } from "next";

export function getServerSideGrowthBookContext(context?: GetServerSidePropsContext) {
  // Set GrowthBook polyfills
  setPolyfills({
    fetch: globalThis.fetch || require("cross-fetch"),
    EventSource: globalThis.EventSource || require("eventsource"),
    SubtleCrypto: globalThis.crypto?.subtle || require("node:crypto")?.webcrypto?.subtle
  });

  return {
    apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    decryptionKey: process.env.NEXT_PUBLIC_GROWTHBOOK_DECRYPTION_KEY,
    attributes: {
      // TODO: get more targeting attributes from request context
      id: (context && context.req.cookies.DEVICE_ID) ?? null,
    },
  }
}
