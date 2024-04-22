import gb from "@/lib/growthbook/server";
export default async function ServerStatic() {
  await gb.loadFeatures({ timeout: 1000 });
  gb.setAttributes({
    country: "US",
  });
  const feature1Enabled = gb.isOn("feature1");
  const feature2Value = gb.getFeatureValue("feature2", "fallback");
  return (
    <div>
      <div className="text-4xl my-4">Server Component - Static Render</div>
      <p className="my-2">
        This page renders once during build time. If you change a feature flag
        in GrowthBook, you will need to rebuild the app to see it here.
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
