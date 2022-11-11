import type { App, InjectionKey } from "vue";
import { GrowthBook } from "@growthbook/growthbook";

export type GrowthBookVuePluginConfig = {
  featuresEndpoint: string;
};

export const growthBookKey = Symbol() as InjectionKey<GrowthBook>;

export const growthBookPlugin = {
  async install(app: App, { featuresEndpoint }: GrowthBookVuePluginConfig) {
    const growthBook = new GrowthBook({
      enableDevMode: true, // allows you to use the Chrome DevTools Extension to test/debug.
    });

    try {
      const response = await fetch(featuresEndpoint);
      const json = await response.json();

      growthBook.setFeatures(json.features);

      app.provide<GrowthBook>(growthBookKey, growthBook);
    } catch (e) {
      console.error("GrowthBook Vue plugin error", e);
    }
  },
};
