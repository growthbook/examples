"use client";
import { useFeatureIsOn, useFeatureValue } from "@growthbook/growthbook-react";
export default function ClientComponent() {
  const feature1Enabled = useFeatureIsOn("feature1");
  const feature2Value = useFeatureValue("feature2", "fallback");
  return (
    <div>
      <div className="text-4xl my-4">Client Component</div>
      <p className="my-2">
        This component renders client-side. The page initially delivered to the
        client will not have FF values loaded, which can result in a
        &apos;flicker&apos; when values are loaded asynchronously client-side.
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
