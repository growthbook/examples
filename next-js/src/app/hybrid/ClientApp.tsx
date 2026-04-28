"use client";
import { GrowthBookPayload } from "@growthbook/growthbook";
import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";
import { PropsWithChildren, useMemo } from "react";
import { growthbookManagedWarehouseClientPlugins } from "@/lib/growthbookManagedWarehouse";

export default function ClientApp({
  payload,
  children,
}: PropsWithChildren<{ payload: GrowthBookPayload }>) {
  const isBrowser = typeof window !== "undefined";

  // Create a singleton GrowthBook instance for this page
  const gb = useMemo(
    () =>
      new GrowthBook({
        apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
        clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
        decryptionKey: process.env.NEXT_PUBLIC_GROWTHBOOK_DECRYPTION_KEY,
        plugins: growthbookManagedWarehouseClientPlugins(isBrowser),
      }).initSync({
        payload,
        // Optional, enable streaming updates
        streaming: true,
      }),
    [payload, isBrowser]
  );

  return <GrowthBookProvider growthbook={gb}>{children}</GrowthBookProvider>;
}
