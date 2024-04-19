import {
  getGrowthBookSSRData,
  GrowthBookSSRData,
  useGrowthBookSSR,
} from "@growthbook/growthbook-react";
import { getServerSideGrowthBookContext } from "@/util/gb-server";
import { GetServerSideProps } from "next";
import ComponentWithFeatures from "@/components/ComponentWithFeatures";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const gbContext = getServerSideGrowthBookContext(context);
  const gbData = await getGrowthBookSSRData(gbContext);

  return {
    props: {
      gbData,
    },
  };
};

export default function ServerHybridPage({
  gbData,
}: {
  gbData: GrowthBookSSRData;
}) {
  useGrowthBookSSR(gbData);

  return (
    <div>
      <h1>Server Hybrid (Server + Client Rendering)</h1>
      <p>
        This page first renders on the server, then the client takes over and
        watches for feature flag updates.
      </p>
      <ComponentWithFeatures />
    </div>
  );
}
