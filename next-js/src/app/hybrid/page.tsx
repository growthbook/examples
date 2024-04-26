import { getInstance, getPayload } from "@/lib/growthbookServer";
import { cookies } from "next/headers";
import { GrowthBookTracking } from "@/lib/growthbookClient";
import { GB_UUID_COOKIE } from "@/middleware";
import ClientApp from "./ClientApp";
import RevalidateMessage from "@/app/revalidate/RevalidateMessage";

export default async function ServerCombo() {
  // create instance per request, server-side
  const gb = await getInstance();

  // using cookies means next will render this page dynamically
  gb.setAttributes({
    id: cookies().get(GB_UUID_COOKIE)?.value || "",
  });

  const feature1Enabled = gb.isOn("feature1");
  const feature2Value = gb.getFeatureValue("feature2", "fallback");

  return (
    <div>
      <h2>Server / Client Hybrid</h2>
      <p>
        This page fetches and uses feature flags server-side, then hydrates the
        client-side GrowthBook instance. This gives you maximum flexibility and
        performance.
      </p>
      <p>These features were rendered server-side:</p>
      <ul>
        <li>
          feature1: <strong>{feature1Enabled ? "ON" : "OFF"}</strong>
        </li>
        <li>
          feature2: <strong>{feature2Value}</strong>
        </li>
      </ul>

      <ClientApp payload={getPayload(gb)} />

      <RevalidateMessage />

      <GrowthBookTracking data={gb.getDeferredTrackingCalls()} />
    </div>
  );
}
