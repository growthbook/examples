"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import gb from "@/lib/growthbook";

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
        This component renders client-side. The page initially delivered to the
        client will not have FF values loaded, which can result in a 'flicker'
        when values are loaded asynchronously client-side.
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
