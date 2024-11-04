import { getPage } from "@/app/lib/page";
import { ProductInterface } from "@/app/lib/product";
import { getVariation } from "@/app/lib/growthbookExperiment";
import { GrowthBook } from "@growthbook/growthbook";
import { randomUUID } from "crypto";
import { GrowthBookTracking } from "@/app/lib/growthbookTracking";

const Product = ({ product }: { product: ProductInterface }) => (
  <div className="product">
    <div className="product-inner">
      <div className="product-content">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>From ${product.price}</p>
      </div>
      <div className="product-footer">
        <img width="200px" src={product.image} alt={product.title} />
        <a href={product.buyLink} target="_blank">
          Buy on Growthbook Store
        </a>
      </div>
    </div>
  </div>
);

export default async function Home() {
  const slug = "products";

  const page = await getPage(slug);

  if (!page) {
    return (
      <div>
        Product page not found. Run `npm run create-contentful-content` to add
        the exaple Growthbook Page to your Contentful space.
      </div>
    );
  }

  const gb = new GrowthBook({
    apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
  });

  await gb.init({ timeout: 1000 });

  // Set targeting attributes for the user
  // Normally this is set based on a cookie on logged in user data, but here
  // we use a random ID so we can see different variations
  await gb.setAttributes({
    id: randomUUID(),
  });

  const items = page.productsCollection.items.map((item) => {
    if (item.__typename === "GrowthbookExperiment") {
      return getVariation(gb, item);
    }
    return item;
  });

  // If the code above ran any experiments, get the tracking call data
  // This is passed into the <GrowthBookTracking> client component below
  const trackingData = gb.getDeferredTrackingCalls();

  return (
    <div>
      <h1>{page.title}</h1>
      <p>{page.description}</p>
      <h2>Products</h2>
      <div className="product-container">
        {items.map((item) => (
          <Product key={item.sys.id} product={item} />
        ))}
      </div>
      <GrowthBookTracking data={trackingData} />
    </div>
  );
}
