"use client";
import { useFeatureIsOn, useFeatureValue } from "@growthbook/growthbook-react";

export default function ClientComponent() {
  const feature1Enabled = useFeatureIsOn("feature1");
  const feature2Value = useFeatureValue("feature2", "fallback");
  return (
    <div>
      <p>And these features are rendered client-side:</p>
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
