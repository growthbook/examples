"use client";
import Cookies from "js-cookie";
import { createGB } from "@/lib/growthbook";
import { FeatureDefinition } from "@growthbook/growthbook";

const gb = createGB({
  // client-side feature
  subscribeToChanges: true,
});

export default function ClientComponent({
  gbFeatures,
}: {
  gbFeatures: Record<string, FeatureDefinition<unknown>>;
}) {
  // manually set features for GB instance
  gb.setFeatures(gbFeatures);

  const userId = Cookies.get("gb-next-example-userId");
  gb.setAttributes({
    id: userId,
  });

  const feature1Enabled = gb.isOn("feature1");
  const feature2Value = gb.getFeatureValue("feature2", "fallback");

  return (
    <>
      <ul>
        <li>
          feature1: <strong>{feature1Enabled ? "ON" : "OFF"}</strong>
        </li>
        <li>
          feature2: <strong>{feature2Value}</strong>
        </li>
      </ul>
    </>
  );
}
