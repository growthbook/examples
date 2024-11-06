This example codebase is a Next.js app that demonstrates how to integrate **Contentful** CMS and **GrowthBook** for A/B testing and feature flag management. This integration enables teams to run experiments directly from their familiar Contentful interface while leveraging GrowthBook's powerful experimentation capabilities.

## Requirements

Before you begin ensure you have the following:

[] [GrowthBook account](https://www.growthbook.io) (free tier available)
[] [Contentful account](https://www.contentful.com) (free tier available)

## Overview

// TODO

## Setup Instructions

### 1. Setting Up GrowthBook

**Create Your SDK Connection**

1. Log in to GrowthBook
2. Navigate to **SDK Configuration** &rarr; **SDK Connections** in the sidebar
3. Click **Add SDK Connection**
4. Select **JavaScript** or **React** as your language
5. Save your **API Host** URL and **Client Key** for later use

**Configure Your Data Source**

1. Go to **Metrics and Data** &rarr; **Data Sources** in GrowthBook
2. Click **Add Data Source**
3. Choose your preferred analytics platform
4. Follow the connection guide
5. Note your data source ID for later use

**Generate API Key**

1. Navigate to **Settings** &rarr; **API Keys**
2. Click **Create New Key**
3. Select `admin` role
4. Save the generated key securely

### 2. Setting Up Contentful

**Create API Access**

1. Log in to your Contentful Space
2. Click the gear icon (Settings)
3. Navigate to **API keys**
4. Click **Add API key**
5. Save the **Space ID**, **Content Delivery API** token, and **Content Preview API** token

**Generate CMA Token**

1. Still in Settings, go to **CMA tokens**
2. Click **Create new token**
3. Name it "GrowthBook Content Management Access"
4. Be sure to securly save the token, as you won't be able to access it again.

**Install GrowthBook Plugin**

// TODO May need revision

1. Go to **Apps** &rarr; **Marketplace**
2. Search for GrowthBook
3. Click **Install**
4. Configure the plugin:

- Enter your GrowthBook API host URL
- Paste your Admin API key
- Set your data source
- Click **Save**

### 3. Configuring the Example App

1. Clone the repository and install dependencies

```bash
git clone https://github.com/growthbook/examples.git
cd examples/contentful
npm install
```

2. Set up environmental variables:

```bash
cp .env.local.example .env.local
```

3. Fill in your `.env.local` with the saved keys:

```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token
CONTENTFUL_MANAGEMENT_TOKEN=CMA_token
GROWTHBOOK_API_HOST=your_growthbook_url
```

4. Create initial content models:

```bash
npm run create-contentful-content
```

5. Start the development server:

```bash
npm run dev
```

**Running Your First Experiment**

Let's create a simple A/B test comparing two product variants:

// TODO screenshot

1. Access Product Page

- Open Contentful
- Navigate to **GrowthBook Example: Product Page**
- Click the overflow menu and remove the "Control t-shirt" from the Products collection

2. Create Experiment

- Click **Add content**
- Select **GrowthBook Experiment**
- Add an **Experiment Name**

3. Add Variations

- Click **Add Variation** &rarr; **Link an existing variant**
- Select **Control t-shirt**
- Repeat for **Variant t-shirt**

4. Launch Experiment

- Click **Create New Experiment**
- Click **Start Experiment**
- Click **Publish**

5. Update Product Page

- Return to Product Page
- Click **Publish**

6. View Results

- View your product page
- Refresh to see different variations
- Notice how GrowthBook alternates between control and variant 😎

## Technical Implementation

This integration uses GrowthBook's server-side Next.js implementation for optimal performance. For additional examples of integrating GrowthBook with Next.js, including client-side implementation, see our other [Next.js examples](https://github.com/growthbook/examples/tree/main/next-js).

### Content Model Structure

The **GrowthBook Experiment** content model is fetched via the following GraphQL code, which contains the `featureFlagId` and the `variationsCollection`. The response contains data about your experiment content, as you set it up in Contentful.

To get specific Variation content, make an additional call to the Contentful API using its `id` and `_typname`, or, as in the example below, add the fields for each Content Type you want to be able to experiment on.

```graphql
// src/app/lib/growthbookExperiment.ts
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

### Variation Selection Logic

The `getVariation` function uses your GrowthBook data to determine the variation's state. Calling `gb.getFeatureValue` with the `featureFlagId` returns the index of the variation to show in the `variationsCollection`.

```ts
export function getVariation(
  gb: GrowthBook,
  growthbookExperiment: GrowthbookExperimentInterface
) {
  const featureFlagId = growthbookExperiment.featureFlagId;
  const variationsCollection = growthbookExperiment.variationsCollection;
  const index = gb.getFeatureValue(featureFlagId ?? "", 0);

  if (index > variationsCollection.items.length + 1) {
    return variationsCollection.items[0];
  }
  return variationsCollection.items[index];
}
```

### GrowthBook Initializiation and Content Rendering

In `src/app/page.tsx`, we configure and initialize GrowthBook. The following code uses the `getVariation` function from above to conditionally render the variation the user should see.

```ts
const items = page.productsCollection.items.map((item) => {
  if (item.__typename === "GrowthbookExperiment") {
    return getVariation(gb, item);
  }

  return item;
});
```

### Caching

Server-fetched feature flags and experiment definitions are persisted in the Next.js data cache for 60 seconds (configurable in `src/app/lib/growthbookServer.ts`). For faster updates, use the `POST /revalidate` route handler via an SDK Webhook in GrowthBook.

### Tracking CallBack

Data about which variation the user saw is sent to the client where an analytics event is triggered (or `console.log` in these examples). This happens via the `GrowthBookTracking` client component defined in `src/app/lib/GrowthBookTracking.ts`.

## Troubleshooting

### Common Issues

1. Content Model Not Appearing

- Verify CMA token permissions
- Run `create-contentful-content` script again
- Check Contentful Space access

2. Variations Not Switching

- Confirm experiment is published
- Check Growthbook connection
- Verify targeting attributes

3. Plugin Installation Fails

- Verify admin API key permissions
- Check Growthbook URL format
- Confirm data source ID

### Getting Help

- Join our Community Forum
- Submit issue on GitHuB
