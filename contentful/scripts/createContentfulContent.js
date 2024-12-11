require("dotenv").config({ path: ".env.local" });
const contentfulManagement = require("contentful-management");
const { create } = require("domain");

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_CMA_TOKEN = process.env.CONTENTFUL_CMA_TOKEN;
const CONTENTFUL_ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT;

const client = contentfulManagement.createClient({
  accessToken: CONTENTFUL_CMA_TOKEN,
});

async function createPageContentModel(environment) {
  try {
    const contentType = await environment.createContentTypeWithId(
      "gbExamplePage",
      {
        name: "Growthbook Example Page",
        displayField: "title",
        fields: [
          {
            id: "title",
            name: "Title",
            type: "Symbol",
            required: true,
          },
          {
            id: "slug",
            name: "Slug",
            type: "Symbol",
            required: true,
          },
          {
            id: "description",
            name: "Description",
            type: "Text",
            required: false,
          },
          {
            id: "products",
            name: "Products",
            type: "Array",
            items: {
              type: "Link",
              linkType: "Entry",
            },
          },
        ],
      }
    );

    await contentType.publish();
    console.log("Growthbook Example Page Content Model created successfully!");
  } catch (error) {
    if (JSON.parse(error.message).status === 409) {
      console.log(
        "Growthbook Example Page Content Model already exists, skipping creation."
      );
      return;
    }

    console.error(
      "Error creating Growthbook Example Page Content Model:",
      error
    );
  }
}

async function createProductContentModel(environment) {
  try {
    const contentType = await environment.createContentTypeWithId(
      "gbExampleProduct",
      {
        name: "Growthbook Example Product",
        displayField: "title",
        fields: [
          {
            id: "title",
            name: "Title",
            type: "Symbol",
            required: true,
          },
          {
            id: "description",
            name: "Description",
            type: "Text",
            required: false,
          },
          {
            id: "price",
            name: "Price",
            type: "Number",
            required: true,
          },
          {
            id: "image",
            name: "Image",
            type: "Symbol",
            required: false,
          },
          {
            id: "buyLink",
            name: "Buy Link",
            type: "Symbol",
            required: false,
          },
        ],
      }
    );

    await contentType.publish();
    console.log(
      "Growthbook Example Product Content model created successfully!"
    );
  } catch (error) {
    if (JSON.parse(error.message).status === 409) {
      console.log(
        "Growthbook Example Product already exists, skipping creation."
      );
      return;
    }

    console.error("Growthbook Example Product Content Model:", error);
  }
}

async function createContent(environment, type, title, id, data) {
  try {
    const page = await environment.createEntryWithId(type, id, data);

    await page.publish();
    console.log(title + " Content created successfully!");
  } catch (error) {
    if (JSON.parse(error.message).status === 409) {
      console.log(title + " already exists, skipping creation.");
      return;
    }
    console.error("Error creating " + title + " content:", error);
  }
}

async function createProduct(environment, title, id, data) {
  createContent(environment, "gbExampleProduct", title, id, data);
}

async function createPage(environment, title, id, data) {
  createContent(environment, "gbExamplePage", title, id, data);
}

async function createContentfulContent() {
  try {
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(CONTENTFUL_ENVIRONMENT);
    await createPageContentModel(environment);
    await createProductContentModel(environment);
    await createProduct(
      environment,
      "Data Driven Unisex Tshirt",
      "growthbook-example-data-driven-unisex-tshirt",
      {
        fields: {
          title: {
            "en-US": "Growthbook Example: Data Driven Unisex Tshirt",
          },
          description: {
            "en-US":
              "Product teams run on data driven decisions. This unisex t-shirt is soft and lightweight.",
          },
          price: {
            "en-US": 20,
          },
          image: {
            "en-US":
              "https://shop.growthbook.io/cdn/shop/files/unisex-staple-t-shirt-navy-front-654db5d4f1c72.jpg?v=1699591661&width=533",
          },
          buyLink: {
            "en-US":
              "https://shop.growthbook.io/products/dd-data-driven-unisex-t-shirt",
          },
        },
      }
    );
    await createProduct(
      environment,
      "Control Tshirt",
      "growthbook-example-control-tshirt",
      {
        fields: {
          title: {
            "en-US": "Growthbook Example: Control Tshirt",
          },
          description: {
            "en-US":
              "Show you are in control with this AB testing focused T-shirt. Even better if you can pair it with the 'VARIANT' t-shirt when you're feeling a bit less in control. It’s super soft, breathable, and has just the right amount of stretch. Need we say more?",
          },
          price: {
            "en-US": 20,
          },
          image: {
            "en-US":
              "https://shop.growthbook.io/cdn/shop/files/unisex-staple-t-shirt-maroon-front-654b51f519108.jpg?v=1699435032&width=533",
          },
          buyLink: {
            "en-US":
              "https://shop.growthbook.io/products/control-unisex-t-shirt",
          },
        },
      }
    );

    await createProduct(
      environment,
      "Variant Tshirt",
      "growthbook-example-variant-tshirt",
      {
        fields: {
          title: {
            "en-US": "Growthbook Example: Variant Tshirt",
          },
          description: {
            "en-US":
              "Variant: a form or version of something that differs in some respect from other forms of the same thing or from a standard. This shirt is a play on AB testing, which typically has a control vs a variant. This t-shirt is to celebrate the variant. It feels soft and lightweight, with the right amount of stretch. It's comfortable and flattering for all.",
          },
          price: {
            "en-US": 20,
          },
          image: {
            "en-US":
              "https://shop.growthbook.io/cdn/shop/files/unisex-staple-t-shirt-orange-front-654b4d9dcf9ae.jpg?v=1699433938&width=533",
          },
          buyLink: {
            "en-US":
              "https://shop.growthbook.io/products/variant-unisex-t-shirt",
          },
        },
      }
    );

    await createProduct(
      environment,
      "Experiment Tshirt",
      "growthbook-example-experiment-tshirt",
      {
        fields: {
          title: {
            "en-US": "Growthbook Example: Experiment Upside-down Tshirt",
          },
          description: {
            "en-US":
              "Show your dedication to experimenting with this t-shirt featuring bold 'experiment' text playfully printed upside down. This t-shirt is super soft, breathable, and has just the right amount of stretch. Need we say more?",
          },
          price: {
            "en-US": 20,
          },
          image: {
            "en-US":
              "https://shop.growthbook.io/cdn/shop/files/unisex-staple-t-shirt-true-royal-left-front-666cd875a4407.jpg?v=1718409392&width=533",
          },
          buyLink: {
            "en-US":
              "https://shop.growthbook.io/products/experiment-upside-down-unisex-t-shirt",
          },
        },
      }
    );

    await createPage(
      environment,
      "Product Page",
      "growthbook-example-product-page",
      {
        fields: {
          title: {
            "en-US": "Growthbook Example: Product Page",
          },
          slug: {
            "en-US": "product",
          },
          description: {
            "en-US":
              "This is an example product page for Growthbook. It showcases a few products from the Growthbook Store",
          },
          products: {
            "en-US": [
              {
                sys: {
                  type: "Link",
                  linkType: "Entry",
                  id: "growthbook-example-data-driven-unisex-tshirt",
                },
              },
              {
                sys: {
                  type: "Link",
                  linkType: "Entry",
                  id: "growthbook-example-control-tshirt",
                },
              },
              {
                sys: {
                  type: "Link",
                  linkType: "Entry",
                  id: "growthbook-example-experiment-tshirt",
                },
              },
            ],
          },
        },
      }
    );
  } catch (error) {
    console.error("Error getting space and environment:", error);
  }
}

createContentfulContent();
