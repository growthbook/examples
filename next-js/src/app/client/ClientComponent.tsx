"use client";
import { useFeatureIsOn, useFeatureValue } from "@growthbook/growthbook-react";
import Link from "next/link";

export default function ClientComponent() {
  const feature1Enabled = useFeatureIsOn("feature1");
  const feature2Value = useFeatureValue("feature2", "fallback");
  return (
    <div>
      <h2>Client Rendering (Unoptimized)</h2>
      <p>
        This component renders entirely client-side. The page initially
        delivered to the client will not have feature definitions loaded, and a
        network request will be required. This can result in a
        &apos;flicker&apos; where fallback values are rendered first and then
        swapped in with their real values later.
      </p>
      <p>
        To avoid this flicker, check out the{" "}
        <Link href="/client-optimized">Optimized Client</Link> example.
      </p>
      <ul>
        <li>
          feature1: <strong>{feature1Enabled ? "ON" : "OFF"}</strong>
        </li>
        <li>
          feature2: <strong>{feature2Value}</strong>
        </li>
      </ul>
    </div>
  );
}
