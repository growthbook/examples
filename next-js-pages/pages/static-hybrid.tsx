import {
  getGrowthBookSSRData,
  GrowthBookSSRData,
  useGrowthBookSSR,
} from "@growthbook/growthbook-react";
import { getServerSideGrowthBookContext } from "@/util/gb-server";
import { GetStaticProps } from "next";
import ComponentWithFeatures from "@/components/ComponentWithFeatures";

export const getStaticProps: GetStaticProps = async () => {
  const gbContext = getServerSideGrowthBookContext();
  const gbData = await getGrowthBookSSRData(gbContext);

  return {
    props: {
      gbData,
    },
  };
};

export default function StaticHybridPage({
  gbData,
}: {
  gbData: GrowthBookSSRData;
}) {
  useGrowthBookSSR(gbData);

  return (
    <div>
      <h1>Static Hybrid (Static + Client Rendering)</h1>
      <p>
        This page renders once at build time using the feature flags available
        at that time. Then, client rendering takes over and updates the feature
        flags to their current value.
      </p>
      <ComponentWithFeatures />
    </div>
  );
}
