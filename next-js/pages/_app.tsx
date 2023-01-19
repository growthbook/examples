import type { AppProps } from "next/app";
import { useEffect } from "react";
import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";
import Head from "next/head";

// Create a client-side GrowthBook instance
const gb = new GrowthBook({
  apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
  clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
  decryptionKey: process.env.NEXT_PUBLIC_GROWTHBOOK_DECRYPTION_KEY,
  // Enable easier debugging of feature flags during development
  enableDevMode: true,
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Load features from the GrowthBook API and keep them up-to-date
    gb.loadFeatures({ autoRefresh: true });
  }, []);

  return (
    <>
      <Head>
        <title>GrowthBook Next.js Example</title>
        <meta name="description" content="GrowthBook Next.js Example" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GrowthBookProvider growthbook={gb}>
        <main style={{padding: 50}}>
          <Component {...pageProps} />
        </main>
      </GrowthBookProvider>
    </>
  );
}
