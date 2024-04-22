import gb from "@/lib/growthbook/server";
import { cookies } from "next/headers";

export default async function ServerDynamic() {
  await gb.loadFeatures({ timeout: 1000 });

  const cookieStore = cookies();
  const userId = cookieStore.get("gb-next-example-userId");

  gb.setAttributes({
    id: userId,
  });

  const feature1Enabled = gb.isOn("feature1");
  const feature2Value = gb.getFeatureValue("feature2", "fallback");

  return (
    <div>
      <div className="text-4xl my-4">Server Component - Dynamic Render</div>
      <p className="my-2">
        This page renders server-side per request. If you change a feature flag
        in GrowthBook, you will need to refresh the page to see it change here.
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
