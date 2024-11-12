import { PRODUCT_GRAPHQL_FIELDS } from "./product";
import { GrowthBook } from "@growthbook/growthbook";

// This contains GraphQL for the Growthbook Experiment content type
// and explicitly hardcodes the types of content the experiment can contain
// (in this case, a product).  You can either add all the different
// Content Model types or you could remove them and do another query
// to get the content based on the sys.id and __typename.
export const GROWTHBOOK_EXPERIMENT_GRAPHQL_FIELDS = `
    sys {
        id
    }
    featureFlagId
    variationsCollection {
        items {
            sys {
                id
            }
            __typename
            ... on GbExampleProduct {
                ${PRODUCT_GRAPHQL_FIELDS}
            }
        }
    }
`;

export interface GrowthbookExperimentInterface {
  sys: {
    id: string;
  };
  __typename: "GrowthbookExperiment";
  featureFlagId: string;
  variationsCollection: {
    items: any[];
  };
}

export function getVariation(
  gb: GrowthBook,
  growthbookExperiment: GrowthbookExperimentInterface
) {
  const featureFlagId = growthbookExperiment.featureFlagId;
  const variationsCollection = growthbookExperiment.variationsCollection;
  const index = gb.getFeatureValue(featureFlagId ?? "", 0);

  if (
    !variationsCollection ||
    !variationsCollection.items ||
    variationsCollection.items.length === 0
  ) {
    return null;
  }

  const variation = variationsCollection.items[index];
  if (!variation) {
    return null;
  }

  return variation;
}
