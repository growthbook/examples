"use client";
import Cookies from "js-cookie";
import { AutoExperiment, FeatureDefinition } from "@growthbook/growthbook";
import { gb, setPayload } from "@/lib/growthbookClient";
import { GrowthBookProvider } from "@growthbook/growthbook-react";
import ClientComponent from "./ClientComponent";
import { GB_UUID_COOKIE } from "@/middleware";
import { useCallback, useEffect, useRef } from "react";

export default function ClientApp({
  payload,
}: {
  payload: {
    features: Record<string, FeatureDefinition<unknown>>;
    experiments: AutoExperiment[];
  };
}) {
  // Helper to hydrate client-side GrowthBook instance with payload from the server
  const hydrate = useCallback(() => {
    setPayload(payload);
    gb.setAttributes({
      id: Cookies.get(GB_UUID_COOKIE),
    });
  }, [payload]);

  // Hydrate immediately on first render and whenever the payload changes
  const ref = useRef<boolean>();
  if (!ref.current) {
    ref.current = true;
    hydrate();
  }
  useEffect(() => hydrate(), [hydrate]);

  return (
    <GrowthBookProvider growthbook={gb}>
      <ClientComponent />
    </GrowthBookProvider>
  );
}
