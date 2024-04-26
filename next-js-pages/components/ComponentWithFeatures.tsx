import { useFeatureIsOn, useFeatureValue, useGrowthBook } from "@growthbook/growthbook-react";
import FeatureDisplay from "./FeatureDisplay";

export default function ComponentWithFeatures() {
  const feature1Enabled = useFeatureIsOn("feature1");
  const feature2Value = useFeatureValue("feature2", "fallback");
  const gb = useGrowthBook();

  return (
    <div>
      <FeatureDisplay
        feature1Enabled={feature1Enabled}
        feature2Value={feature2Value}
      />
      <p>
        If you are using the GrowthBook Proxy, the features above will update in
        realtime as you make changes in GrowthBook.
      </p>
      <p>
        Otherwise, you can manually{" "}
        <button
          onClick={(e) => {
            e.preventDefault();
            gb?.refreshFeatures({
              skipCache: true,
            });
          }}
        >
          Refresh Features
        </button>
      </p>
    </div>
  );
}
