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

    Vue.initGrowthBook = function () {
      if (growthBook) {
        return growthBook;
      }

      return getFeaturesJson(featuresEndpoint)
        .then((json) => {
          growthBook = new GrowthBook({
            enableDevMode,
          });

          growthBook.setFeatures(json);

          return growthBook;
        })
        .catch((error) => {
          console.error("GrowthBook Vue plugin error", error);
          return null;
        })
    }
  }
}