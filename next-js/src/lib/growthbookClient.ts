"use client";
import {
  GrowthBook,
  Experiment,
  Result,
  FeatureDefinition,
  AutoExperiment,
} from "@growthbook/growthbook";

// TODO: these are defined in the GrowthBook SDK, but not exported
interface TrackingData {
  experiment: Experiment<any>;
  result: Result<any>;
}
type TrackingCallback = (
  experiment: Experiment<any>,
  result: Result<any>
) => void;

export const onExperimentView: TrackingCallback = (experiment, result) => {
  // TODO: track with Google Analytics, Segment, etc.
  console.log("Viewed Experiment", {
    experimentId: experiment.key,
    variationId: result.key,
  });
};

export const gb = new GrowthBook({
  apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
  clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
  decryptionKey: process.env.NEXT_PUBLIC_GROWTHBOOK_DECRYPTION_KEY,

  // These are client-specific settings
  backgroundSync: true,
  subscribeToChanges: true,
  trackingCallback: onExperimentView,

  // TODO: add an option to disable autoPrefetch behavior
});

// Helper component to track experiment views from server components
export function GrowthBookTracking({ data }: { data: TrackingData[] }) {
  data.forEach(({ experiment, result }) => {
    onExperimentView(experiment, result);
  });

  return null;
}

// TODO: Swap this out with built-in SDK method from Edge work
export function setPayload(payload: {
  features: Record<string, FeatureDefinition<unknown>>;
  experiments: AutoExperiment[];
}) {
  gb.setFeatures(payload.features);
  gb.setExperiments(payload.experiments);
}
