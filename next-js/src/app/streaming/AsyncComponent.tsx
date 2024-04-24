import { getInstance } from "@/lib/growthbookServer";
import { GrowthBookTracking } from "@/lib/growthbookClient";
import { cookies } from "next/headers";
import { GB_UUID_COOKIE } from "@/middleware";

export default async function AsyncComponent() {
  // create instance per request, server-side
  const gb = await getInstance();

  // Artificial 2 second delay to simulate a slow server
  await new Promise((resolve) => setTimeout(resolve, 2000));

  gb.setAttributes({
    id: cookies().get(GB_UUID_COOKIE)?.value || "",
  });

  const feature1Enabled = gb.isOn("feature1");
  const feature2Value = gb.getFeatureValue("feature2", "fallback");

  return (
    <div>
      <p>
        This component is streamed inside a server component (with an artificial
        2s delay).
      </p>
      <p>
        The code implemented here will automatically leverage{" "}
        <a
          href="https://nextjs.org/docs/app/api-reference/next-config-js/partial-prerendering"
          target="_blank"
        >
          Partial Prerendering (PPR)
        </a>{" "}
        in newer versions of Next.js that have it enabled.
      </p>
      <ul>
        <li>
          feature1: <strong>{feature1Enabled ? "ON" : "OFF"}</strong>
        </li>
        <li>
          feature2: <strong>{feature2Value}</strong>
        </li>
      </ul>

      <GrowthBookTracking data={gb.getDeferredTrackingCalls()} />
    </div>
  );
}
