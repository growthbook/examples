export const PRODUCT_GRAPHQL_FIELDS = `
    sys {
        id
    }
    title
    description
    price
    image 
    buyLink
`;

export interface ProductInterface {
  sys: {
    id: string;
  };
  __typename: "GbExampleProduct";
  title: string;
  description: string;
  price: number;
  image: string;
  buyLink: string;
}
