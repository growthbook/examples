import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";
import Head from "next/head";
import { onExperimentViewed } from "@/components/VisualExperimentsDisplay";

// Create a client-side GrowthBook instance
const gb = new GrowthBook({
  apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
  clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
  decryptionKey: process.env.NEXT_PUBLIC_GROWTHBOOK_DECRYPTION_KEY,
  // Enable easier debugging of feature flags during development
  enableDevMode: true,
  trackingCallback: onExperimentViewed,
});

// Let the GrowthBook instance know when the URL changes so the active
// experiments can update accordingly
function updateGrowthBookURL() {
  gb.setURL(window.location.href);
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Load features from the GrowthBook API and keep them up-to-date
    gb.loadFeatures({ autoRefresh: true });
    gb.setAttributes({ id: "123" });

    // Subscribe to route change events and update GrowthBook
    router.events.on("routeChangeComplete", updateGrowthBookURL);
    return () => router.events.off("routeChangeComplete", updateGrowthBookURL);
  }, []);

  return (
    <>
      <Head>
        <title>GrowthBook Next.js Example</title>
        <meta name="description" content="GrowthBook Next.js Example" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GrowthBookProvider growthbook={gb}>
        <main style={{ padding: 50 }}>
          <Component {...pageProps} />
        </main>
      </GrowthBookProvider>
    </>
  );
}
