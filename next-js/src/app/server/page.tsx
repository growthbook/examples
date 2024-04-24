import { getInstance } from "@/lib/growthbookServer";
import { GrowthBookTracking } from "@/lib/growthbookClient";
import { cookies } from "next/headers";
import { GB_UUID_COOKIE } from "@/middleware";
import RevalidateMessage from "@/app/revalidate/RevalidateMessage";

export default async function ServerDynamic() {
  // create instance per request, server-side
  const gb = await getInstance();

  // using cookies means next will render this page dynamically
  await gb.setAttributes({
    id: cookies().get(GB_UUID_COOKIE)?.value || "",
  });

  const feature1Enabled = gb.isOn("feature1");
  const feature2Value = gb.getFeatureValue("feature2", "fallback");

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

      <GrowthBookTracking data={gb.getDeferredTrackingCalls()} />
    </div>
  );
}
