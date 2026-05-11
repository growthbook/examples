"use client";

import {
  GrowthBook,
  GrowthBookPayload,
  captureGrowthBookError,
  growthbookErrorTrackingPlugin,
} from "@growthbook/growthbook";
import { autoAttributesPlugin, growthbookTrackingPlugin } from "@growthbook/growthbook/plugins";
import { GrowthBookProvider, useGrowthBook } from "@growthbook/growthbook-react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { GB_UUID_COOKIE } from "@/middleware";

const MANAGED_WAREHOUSE_INGESTOR_HOST = "http://localhost:3003";

function ThrowPanel() {
  const gb = useGrowthBook();
  return (
    <div className="space-y-2">
      <button
        type="button"
        className="rounded bg-red-600 px-3 py-2 text-white"
        onClick={() => {
          throw new Error("Demo: thrown error for GrowthBook error tracking");
        }}
      >
        Throw error (sync)
      </button>
      <button
        type="button"
        className="ml-2 rounded bg-amber-600 px-3 py-2 text-white"
        onClick={async () => {
          await captureGrowthBookError(
            gb,
            new Error("Demo: manual captureGrowthBookError"),
            { errorType: "manual" },
          );
        }}
      >
        Log error (manual)
      </button>
    </div>
  );
}

export default function ErrorsDemoPage() {
  const isBrowser = typeof window !== "undefined";
  const [payload] = useState<GrowthBookPayload | null>(null);

  const gb = useMemo(() => {
    const plugins = [
      growthbookTrackingPlugin({
        ingestorHost: MANAGED_WAREHOUSE_INGESTOR_HOST,
        debug: true,
      }),
      growthbookErrorTrackingPlugin({
        release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
      }),
    ];
    if (isBrowser) {
      plugins.unshift(
        autoAttributesPlugin({
          uuidCookieName: GB_UUID_COOKIE,
          uuidKey: "id",
        }),
      );
    }

    return new GrowthBook({
      apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
      clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
      decryptionKey: process.env.NEXT_PUBLIC_GROWTHBOOK_DECRYPTION_KEY,
      plugins,
    }).initSync({
      payload: payload || ({} as GrowthBookPayload),
      streaming: true,
    });
  }, [isBrowser, payload]);

  useEffect(() => {
    return () => {
      gb.destroy();
    };
  }, [gb]);

  return (
    <main className="p-6">
      <Link href="/" className="text-blue-600 underline">
        ← Home
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">Error tracking demo</h1>
      <p className="mt-2 max-w-2xl text-sm text-gray-600">
        Uses <code>growthbookTrackingPlugin</code> then{" "}
        <code>growthbookErrorTrackingPlugin</code> so uncaught errors are sent as
        managed warehouse events. Prefer wiring both via{" "}
        <code>growthbookManagedWarehouseClientPlugins</code> in real apps.
      </p>
      <GrowthBookProvider growthbook={gb}>
        <div className="mt-6">
          <ThrowPanel />
        </div>
      </GrowthBookProvider>
    </main>
  );
}
