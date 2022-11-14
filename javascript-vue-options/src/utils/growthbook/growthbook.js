import { GrowthBook } from "@growthbook/growthbook";

const getFeaturesJson = (featuresEndpoint) => {
  return fetch(featuresEndpoint)
    .then((response) => {
      return response.json()
    })
}

export const GrowthBookVuePlugin = {
  install: function (Vue, { featuresEndpoint, enableDevMode = false }) {
    let growthBook = null;

    Vue.prototype.initGrowthBook = function initGrowthBook() {
      if (growthBook) {
        return Promise.resolve(growthBook);
      }

      return getFeaturesJson(featuresEndpoint)
        .then((json) => {
          growthBook = new GrowthBook({
            enableDevMode,
          });

          growthBook.setFeatures(json.features);

          return growthBook;
        })
        .catch((error) => {
          console.error("GrowthBook Vue plugin initialization error", error);
          return null;
        })
    }
  }
}