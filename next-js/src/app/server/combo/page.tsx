import gb from "@/lib/growthbook";
import { cookies } from "next/headers";
import ClientComponent from "./ClientComponent";

export default async function ServerDynamic() {
  await gb.loadFeatures({ timeout: 1000 });

  const cookieStore = cookies();
  const userId = cookieStore.get("gb-next-example-userId");

  gb.setAttributes({
    id: userId,
  });

  const features = gb.getFeatures();

  return (
    <div>
      <div className="text-4xl my-4">Server / Client Component Combination</div>
      <p className="my-2">
        This server component fetches feature flags from GB server-side, then
        passes the features object to a client-side component. The object passed
        needs to be{" "}
        <a
          href="https://react.dev/reference/react/use-server#serializable-parameters-and-return-values"
          target="_blank"
        >
          serializable
        </a>{" "}
        for this to work.
      </p>

      <ClientComponent gbFeatures={features} />
    </div>
  );
}
