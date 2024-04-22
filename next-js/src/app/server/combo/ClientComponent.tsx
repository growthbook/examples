"use client";
import Cookies from "js-cookie";
import gb from "@/lib/growthbook/client";
import { FeatureDefinition } from "@growthbook/growthbook";

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
