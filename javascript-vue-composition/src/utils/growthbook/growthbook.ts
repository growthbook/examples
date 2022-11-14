import type { App, InjectionKey } from "vue";
import { GrowthBook } from "@growthbook/growthbook";

/**
 * Configuration for the options passed to the app.use() call
 */
export type GrowthBookVuePluginConfig = {
  /**
   * The endpoint that your features are hosted on. Get this from the Environments -> SDK Endpoints section
   */
  featuresEndpoint: string;

  /**
   * Allows you to use the Chrome DevTools Extension to test/debug.
   * Learn more: https://docs.growthbook.io/tools/chrome-extension
   */
  enableDevMode: boolean;
};

/**
 * The provided GrowthBook would be null in the event that the API call to the features endpoint fails.
 */
type GrowthBookProvider = {
  init: () => Promise<GrowthBook | null>;
};

export const growthBookKey = Symbol() as InjectionKey<GrowthBookProvider>;

const getFeaturesJson = async (
  featuresEndpoint: string
): Promise<Record<string, any>> => {
  const response = await fetch(featuresEndpoint);
  return await response.json();
};

export const growthBookPlugin = {
  install(
    app: App,
    { featuresEndpoint, enableDevMode = false }: GrowthBookVuePluginConfig
  ) {
    let growthBook: GrowthBook | null = null;

    const init = async (): Promise<GrowthBook | null> => {
      if (growthBook) {
        return growthBook;
      }

      try {
        const json = await getFeaturesJson(featuresEndpoint);

        growthBook = new GrowthBook({
          enableDevMode,
        });

        growthBook.setFeatures(json.features);

        return growthBook;
      } catch (e) {
        console.error("GrowthBook Vue plugin error", e);
        return null;
      }
    };

    app.provide<GrowthBookProvider>(growthBookKey, {
      init,
    });
  },
};
