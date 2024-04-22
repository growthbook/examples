import { cookies } from "next/headers";
import { createGB } from "@/lib/growthbook";

export default async function AsyncComponent() {
  // create instance per request, server-side
  const gb = createGB();

  await gb.loadFeatures({ timeout: 1000 });

  const cookieStore = cookies();
  const userId = cookieStore.get("gb-next-example-userId");

  gb.setAttributes({
    id: userId,
  });

  const feature1Enabled = gb.isOn("feature1");
  const feature2Value = gb.getFeatureValue("feature2", "fallback");

  return (
    <div>
      <p className="my-2">
        This component is streamed inside a server component.
      </p>
      <p className="my-2">
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
    </div>
  );
}
