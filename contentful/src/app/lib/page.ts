import { PRODUCT_GRAPHQL_FIELDS, ProductInterface } from "./product";
import {
  GROWTHBOOK_EXPERIMENT_GRAPHQL_FIELDS,
  GrowthbookExperimentInterface,
} from "./growthbookExperiment";
import { fetchGraphQL } from "./api";

export const PAGE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  description
  slug
  productsCollection {
    items {
      ... on GbExampleProduct {
        __typename
        ${PRODUCT_GRAPHQL_FIELDS}
      }
      ... on GrowthbookExperiment {
        __typename
        ${GROWTHBOOK_EXPERIMENT_GRAPHQL_FIELDS}
      }
    }
  }
`;

export interface Page {
  sys: {
    id: string;
  };
  title: string;
  description: string;
  slug: string;
  productsCollection: {
    sys: {
      id: string;
    };
    items: (ProductInterface | GrowthbookExperimentInterface)[];
  };
}

export async function getPage(slug: string): Promise<Page> {
  const result = await fetchGraphQL(
    "gbExamplePage",
    `query {
        gbExamplePageCollection(limit: 1, where: {slug: "${slug}"}) {
            items {
            ${PAGE_GRAPHQL_FIELDS}
            }
        }
        }`
  );

  return result?.data?.gbExamplePageCollection?.items?.[0] ?? null;
}
