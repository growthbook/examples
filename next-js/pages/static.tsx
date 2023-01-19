import { GrowthBook } from "@growthbook/growthbook-react";
import { getServerSideGrowthBookContext } from "@/util/gb-server";
import { GetStaticProps } from "next";
import FeatureDisplay from "@/components/FeatureDisplay";

export const getStaticProps: GetStaticProps = async () => {
  const gbContext = getServerSideGrowthBookContext();

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

export default function StaticPage({
  feature1Enabled,
  feature2Value,
}: {
  feature1Enabled: boolean;
  feature2Value: string;
}) {
  return (
    <div>
      <h1>Static Page</h1>
      <p>
        This page renders once during build time. If you change a feature flag
        in GrowthBook, you will need to rebuild the app to see it here.
      </p>
      <FeatureDisplay
        feature1Enabled={feature1Enabled}
        feature2Value={feature2Value}
      />
    </div>
  );
}
