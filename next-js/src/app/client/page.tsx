"use client";
import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";
import { useEffect, useMemo } from "react";
import ClientComponent from "./ClientComponent";
import { growthbookManagedWarehouseClientPlugins } from "@/lib/growthbookManagedWarehouse";

export default function ClientPage() {
  const isBrowser = typeof window !== "undefined";

  // Create a single memoized GrowthBook instance for the client
  const gb = useMemo(() => {
    return new GrowthBook({
      apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
      clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
      decryptionKey: process.env.NEXT_PUBLIC_GROWTHBOOK_DECRYPTION_KEY,
      plugins: growthbookManagedWarehouseClientPlugins(isBrowser),
    });
  }, [isBrowser]);

  useEffect(() => {
    // Fetch feature payload from GrowthBook
    gb.init({
      // Optional, enable streaming updates
      streaming: true,
    });
  }, [gb]);

  return (
    <GrowthBookProvider growthbook={gb}>
      <ClientComponent />
    </GrowthBookProvider>
  );
}
