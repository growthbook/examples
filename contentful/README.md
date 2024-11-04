## Description

This is an example front-end app that uses Contentful as its Content Management System. In Contentful, there is a Growthbook app plugin that, once installed, will let your content creators create experiments on their own. This app has an example of how you can take a `Growthbook Experiment` content model and show the right variation to the user.

## Configuration

1. **Setting up Growthbook**

   a. First, create a free [GrowthBook Account](https://www.growthbook.io) and add a new SDK Connection, selecting JavaScript (or React) as the language.

   b. Create a new [datasource](https://docs.growthbook.io/warehouses) and connect it to your data warehouse.

   c. Go to **Settings -> API keys** and create a key with an `admin` role. (This is needed for Contentful to connect to Growthbook and add experiments and feature flags.)

2. **Setting up Contentful**

   a. Next, create a free [Contentful Account](https://www.contentful.com).

   b. Click the gear icon in the upper right and go to **API keys** and create a new API key. (This is used by your front-end app/this example app to connect to Contentful to get the content.)

   c. Also go to the gear icon and click on **CMA tokens** and create a new token. (This is used by a script within this example app to create example Content Models and Content within Contentful without you having to set it up manually.)

   d. Add the Growthbook App to your Contentful Space by going to **Apps -> Marketplace -> A/B tests -> Growthbook** and clicking Install. On the configuration page, enter the URL of your Growthbook instance, the API Key from step 1c, and the Datasource from step 1b. This will create a new content model called `Growthbook Experiment` that you can use to create experiments in Contentful.

3. **Setting up this example app**

   a. Next, in this example root, copy `.env.local.example` to `.env.local` and fill in the values from your GrowthBook SDK Connection (step 1a), the Contentful API key info (step 2b), and the Contentful CMA token (step 2c).

   b. In the terminal run: `npm run create-contentful-content`. This will create the `Growthbook Example Page` and the `Growthbook Example Product` Content Models in Contentful. It will also create a `Growthbook Example Product Page` and four products as Contentful Content.

   c. Run `npm run dev` and go to the [product page](http://localhost:3000) to see the Contentful content.

4. **Pretend to be a Content Editor creating a GB A/B test**

   a. In the Contentful app, go to the **Growthbook Example Product Page**, click the three dots next to the **Control** t-shirt in the Products collection, and click **Remove**.

   b. Click **Add content** and select **Growthbook Experiment** as the Content Type.

   c. Enter `Contentful Example` for the Experiment name.

   d. Click "Add Variation" and select the Link an existing variant option. Select the **Control t-shirt**.

   e. Click "Add Variation" and select the Link an existing variant option. Select the **Variant t-shirt**.

   f. The **Create New Experiment** should now be clickable. Click it.

   g. Click start experiment.

   h. Click **publish**.

   i. Click `<-` to go back to the Product Page.

   j. Click **Publish** on the Product Page.

   k. Go to the [product page](http://localhost:3000) to see which content Growthbook has chosen to show. As this example initialized Growthbook with a random targeting attribute id, it pretends each page load is a new user. You can refresh a few times to see Growthbook serve the control t-shirt sometimes and the variant t-shirt other times.

## How it Works

This example uses server-side Growthbook. For client-side Growthbook, see the next-js example.

The code in `src/app/lib/growthbookExperiment.ts` shows the GraphQL to get the **Growthbook Experiment** content model which contains the `featureFlagId` and the `variationsCollection`. In order to get the Variation you can either load the variation content by it's id and \_\_typename in a separate call to Contentful API, or add the fields for each Content Type you want to be able to experiment on like in the example below:

```
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
```

The `getVariation` function shows how to get the variation from it. Basically, calling `gb.getFeatureValue` with the `featureFlagId` will return the index of the variation to show in the `variationsCollection`.

```
export function getVariation(
  gb: GrowthBook,
  growthbookExperiment: GrowthbookExperimentInterface
) {
  const featureFlagId = growthbookExperiment.featureFlagId;
  const variationsCollection = growthbookExperiment.variationsCollection;
  const index = gb.getFeatureValue(featureFlagId ?? "", 0);

  // This can only happen if the experiment is out of sync with the published version.
  if (index > variationsCollection.items.length + 1) {
    return variationsCollection.items[0];
  }
  const variation = variationsCollection.items[index];

  return variation;
}
```

The `src/app/page.tsx` file contains the Growthbook object and initialization. It also shows how you can convert GrowthbookExperiment to the variation the user should see.

```
 const items = page.productsCollection.items.map((item) => {
    if (item.__typename === "GrowthbookExperiment") {
      return getVariation(gb, item);
    }
    return item;
  });
```

Server-fetched feature flags and experiment definitions are persisted in the Next.js data cache for 60 seconds (configurable in `src/app/lib/growthbookServer.ts`). For faster updates, there is a `POST /revalidate` route handler that can be triggered from an SDK Webhook in GrowthBook.

Data about which variation the user saw is sent to the client where an analytics event is triggered (or console.log in these examples). This happens via the `GrowthBookTracking` client component defined in `src/app/lib/GrowthBookTracking`.
