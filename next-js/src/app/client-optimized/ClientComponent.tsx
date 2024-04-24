"use client";
import RevalidateMessage from "@/app/revalidate/RevalidateMessage";
import { useFeatureIsOn, useFeatureValue } from "@growthbook/growthbook-react";

export default function ClientComponent() {
  const feature1Enabled = useFeatureIsOn("feature1");
  const feature2Value = useFeatureValue("feature2", "fallback");
  return (
    <div>
      <h2>Optimized Client Rendering</h2>
      <p>
        This page fetches feature flags and experiments at build time, but waits
        to evaluate them until client-side rendering. This gives you flexibility
        while avoiding flicker.
      </p>
      <ul>
        <li>
          feature1: <strong>{feature1Enabled ? "ON" : "OFF"}</strong>
        </li>
        <li>
          feature2: <strong>{feature2Value}</strong>
        </li>
      </ul>

      <RevalidateMessage />
    </div>
  );
}
