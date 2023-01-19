## GrowthBook Next.js Example

### Installation

Install dependencies

```bash
yarn install
```

### Set Up GrowthBook

First, create a GrowthBook account (either self-hosted or Cloud) - https://www.growthbook.io

Then, create a `.env.local` file in this repo with some environment variables:

```
NEXT_PUBLIC_GROWTHBOOK_HOST=
NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY=
```

Finally, create 2 simple feature flags in GrowthBook.

1. Feature key: `feature1`, Type: `Boolean (on/off)`
2. Feature key: `feature2`, Type: `String`

### Running the Example

Start the development server:

```bash
yarn dev
```

and open [http://localhost:3000](http://localhost:3000) with your browser to see it running
