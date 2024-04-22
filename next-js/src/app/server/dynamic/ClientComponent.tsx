"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { createGB } from "@/lib/growthbook";

const gb = createGB({
  // client-side feature
  subscribeToChanges: true,
});

export default function ClientPage() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      await gb.loadFeatures({ timeout: 1000 });

      const userId = Cookies.get("gb-next-example-userId");

      gb.setAttributes({
        id: userId,
      });
    };
    try {
      setIsLoading(true);
      load();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const feature1Enabled = gb.isOn("feature1");
  const feature2Value = gb.getFeatureValue("feature2", "fallback");

  return (
    <div>
      <div className="text-4xl my-4">Client Component</div>
      <p className="my-2">
        This component renders client-side. If you change a feature flag in
        GrowthBook, you should see it refresh here automatically??
      </p>
      {isLoading ? (
        <div className="text-2xl animate-bounce">Loading...</div>
      ) : (
        <ul>
          <li>
            feature1: <strong>{feature1Enabled ? "ON" : "OFF"}</strong>
          </li>
          <li>
            feature2: <strong>{feature2Value}</strong>
          </li>
        </ul>
      )}
    </div>
  );
}
