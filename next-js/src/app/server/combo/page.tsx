import { createGB } from "@/lib/growthbook";
import ClientComponent from "./ClientComponent";

export const revalidate = 3600; // refresh cache every hour

export default async function ServerCombo() {
  // create instance per request, server-side
  const gb = createGB();

  await gb.loadFeatures({ timeout: 1000 });

  const features = gb.getFeatures();

  return (
    <div>
      <div className="text-4xl my-4">Server / Client Component Combination</div>
      <p className="my-2">
        This server component fetches feature flags from GB, then passes the
        features object to a client-side component. Since the object passed is{" "}
        <a
          href="https://react.dev/reference/react/use-server#serializable-parameters-and-return-values"
          target="_blank"
        >
          serializable
        </a>
        , we can avoid redundantly fetching the features object client-side.
      </p>

      <ClientComponent gbFeatures={features} />
    </div>
  );
}
