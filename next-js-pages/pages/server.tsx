import { GrowthBook } from "@growthbook/growthbook-react";
import { getServerSideGrowthBookContext } from "@/util/gb-server";
import { GetServerSideProps } from "next";
import FeatureDisplay from "@/components/FeatureDisplay";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const gbContext = getServerSideGrowthBookContext(context);

  const gb = new GrowthBook(gbContext);
  await gb.loadFeatures({ timeout: 1000 });

  const feature1Enabled = gb.isOn("feature1");
  const feature2Value = gb.getFeatureValue("feature2", "fallback");

  return {
    props: {
      feature1Enabled,
      feature2Value,
    },
  };
};

export default function ServerPage({
  feature1Enabled,
  feature2Value,
}: {
  feature1Enabled: boolean;
  feature2Value: string;
}) {
  return (
    <div>
      <h1>Pure Server Side Rendering</h1>
      <p>
        This page renders entirely on the server using feature flags. If you
        change a feature flag in GrowthBook, you will need to refresh the page
        to see it here.
      </p>
      <FeatureDisplay
        feature1Enabled={feature1Enabled}
        feature2Value={feature2Value}
      />
    </div>
  );
}
