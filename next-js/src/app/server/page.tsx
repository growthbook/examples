import { cookies } from "next/headers";
import { GB_UUID_COOKIE } from "@/middleware";
import RevalidateMessage from "@/app/revalidate/RevalidateMessage";
import { GrowthBook } from "@growthbook/growthbook";
import { configureServerSideGrowthBook } from "@/lib/growthbookServer";
import { growthbookManagedWarehouseServerPlugins } from "@/lib/growthbookManagedWarehouse";

export default async function ServerDynamic() {
  // Helper to configure cache for next.js
  configureServerSideGrowthBook();

  // Create and initialize a GrowthBook instance
  const gb = new GrowthBook({
    apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    decryptionKey: process.env.NEXT_PUBLIC_GROWTHBOOK_DECRYPTION_KEY,
    plugins: growthbookManagedWarehouseServerPlugins(),
  });
  await gb.init({ timeout: 1000 });

  // Set targeting attributes for the user
  await gb.setAttributes({
    id: cookies().get(GB_UUID_COOKIE)?.value || "",
  });

  // Evaluate any feature flags
  const feature1Enabled = gb.isOn("feature1");
  const feature2Value = gb.getFeatureValue("feature2", "fallback");

  // Cleanup
  gb.destroy();

  return (
    <div>
      <h2>Dynamic Server Rendering</h2>
      <p>
        This page renders dynamically for every request. You can use feature
        flag targeting and run A/B experiments entirely server-side.
      </p>
      <ul>
        <li>
          feature1: <strong>{feature1Enabled ? "ON" : "OFF"}</strong>
        </li>
        <li>
          feature2: <strong>{feature2Value}</strong>
        </li>
      </ul>

      <RevalidateMessage />
    </div>
  );
}
