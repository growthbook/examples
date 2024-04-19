"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const FeatureValues = () => {
  const params = useSearchParams();
  const feature1Enabled = params.get("feature1") === "true";
  const feature2Value = params.get("feature2");
  return (
    <Suspense>
      <div className="text-4xl my-4">Middleware example</div>
      <p className="my-2">
        Feature flag values were fetched during the middleware step and the
        values were appended to the URL as query params before the page was
        loaded. This method could be used for URL redirect tests.
      </p>
      <ul>
        <li>
          feature1: <strong>{feature1Enabled ? "ON" : "OFF"}</strong>
        </li>
        <li>
          feature2: <strong>{feature2Value}</strong>
        </li>
      </ul>
    </Suspense>
  );
};

export default function ClientPage() {
  return (
    <Suspense>
      <FeatureValues />
    </Suspense>
  );
}
