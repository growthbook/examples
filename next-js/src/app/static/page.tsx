import RevalidateMessage from "@/app/revalidate/RevalidateMessage";
import { getInstance } from "@/lib/growthbookServer";

export default async function ServerStatic() {
  // By not using cookies or headers, this page can be statically rendered
  // Note: This means you can't target individual users or run experiments
  const gb = await getInstance();

  const feature1Enabled = gb.isOn("feature1");
  const feature2Value = gb.getFeatureValue("feature2", "fallback");
  return (
    <div>
      <h2>Static Pages</h2>
      <p>
        This page is fully statically rendered at build time. As a consequence,
        targeting rules and experiments will not work since they depend on
        user-specific attributes.
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
