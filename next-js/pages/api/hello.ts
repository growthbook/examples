import { GrowthBook } from '@growthbook/growthbook-react'
import { getServerSideGrowthBookContext } from '@/util/gb-server'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  feature1Enabled: boolean;
  feature2Value: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Load feature flags
  const gbContext = getServerSideGrowthBookContext();
  const gb = new GrowthBook(gbContext);
  await gb.loadFeatures();

  const feature1Enabled = gb.isOn("feature1");
  const feature2Value = gb.getFeatureValue("feature2", "fallback");

  res.status(200).json({ 
    feature1Enabled,
    feature2Value
   })
}
