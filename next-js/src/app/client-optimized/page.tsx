import { getInstance, getPayload } from "@/lib/growthbookServer";
import ClientApp from "./ClientApp";

export default async function PrerenderedClientPage() {
  // Get server-side GrowthBook instance in order to fetch the feature flag payload
  const gb = await getInstance();

  return <ClientApp payload={getPayload(gb)} />;
}
