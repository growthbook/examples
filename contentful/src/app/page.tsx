import Link from "next/link";

export default function Home() {
  return (
    <main className="instructions">
      <div className="home">
        <h2>Description</h2>
        <p>
          This is an example front-end app that uses Contentful as it's Content
          Management System. In Contentful there is a Growthbook app plugin that
          once installed, will let your content creators create experiments on
          their own. This app has an example of how you can take a `Growthbook
          Experiment` content model and show the right variation to the user.
        </p>
        <h2>Configuration</h2>
        <section>
          <ol>
            <li>Setting up Growthbook</li>
            <ol>
              <li>
                First, create a free{" "}
                <a href="https://www.growthbook.io" target="_blank">
                  GrowthBook Account
                </a>{" "}
                and add a new SDK Connection, selecting JavaScript (or React) as
                the language.
              </li>
              <li>
                {" "}
                Create a new{" "}
                <a href="https://docs.growthbook.io/warehouses" target="_blank">
                  datasource
                </a>{" "}
                and connect it to your data warehouse
              </li>
              <li>
                {" "}
                Go to <b>Settings-&gt;API keys</b> and create a key with an
                `admin` role. (This is needed for Contentful to connect to
                Growthbook and add experiments and feature flags.)
              </li>
            </ol>
            <li>Setting up Contentful</li>
            <ol>
              <li>
                Next, create a free{" "}
                <a href="https://www.contentful.com" target="_blank">
                  Contentful Account
                </a>{" "}
              </li>
              <li>
                Click the gear icon in the upper right and go to <b>API keys</b>{" "}
                and create a new API key. (This is used by your front-end
                app/this example app to connect to Contentful to get the
                content.)
              </li>
              <li>
                Also go to the gear icon and click on <b>CMA tokens</b> and
                create a new token. (This is used by a script within this
                example app to create example Content Models and Content within
                Contentful without you having to set it up manually.)
              </li>
              <li>
                Add the Growthbook App to your Contentful Space by going to{" "}
                <br /> <b>Apps-&gt;Marketplace-&gt;A/B tests-&gt;Growthbook</b>{" "}
                and clicking Install.
                <br /> On the configuration page, enter the URL of your
                Growthbook instance, the Api Key from step 1c. and the
                Datasource from step 1b. This will create a new content model
                called <code>Growthbook Experiment</code> that you can use to
                create experiments in Contentful.
              </li>
            </ol>
            <li>Setting up this example app</li>
            <ol>
              <li>
                Next, in this example root, copy <code>.env.local.example</code>{" "}
                to <code>.env.local</code> and fill in the values from your
                GrowthBook SDK Connection (step 1a), the Contentful API key info
                (step 2b), and the Contentful CMA token (step 2c).
              </li>
              <li>
                In the terminal run:{" "}
                <code>npm run create-contentful-content</code>. This will create
                the <code>Growthbook Example Page</code> and the{" "}
                <code>Growthbook Example Product</code> Content Models in
                Contentful. It will also create a{" "}
                <code>Growthbook Example Product Page</code> and four products
                as Contentful Content.
              </li>
              <li>
                Run <code>npm run dev</code> and go to the{" "}
                <a href="/product" target="_blank">
                  product page
                </a>{" "}
                to see the contentful content.
              </li>
            </ol>
            <li>Pretend to be a Content Editor creating a GB A/B test.</li>
            <ol>
              <li>
                In the Contentful app go to the{" "}
                <b>Growthbook Example Product Page</b> click the three dots next
                to the <b>Control</b> t-shirt in the Products collection and
                click <b>Remove</b>.
              </li>
              <li>
                Click <b>Add content</b> and select <b>Growthbook Experiment</b>{" "}
                as the Content Type.{" "}
              </li>
              <li>
                Enter <code>Contentful Example</code> for the Experiment name.
              </li>
              <li>
                Click "Add Variation" and select the Link an existing variant
                option. Select the <b>Control t-shirt</b>
              </li>
              <li>
                Click "Add Variation" and select the Link an existing variant
                option. Select the <b>Variant t-shirt</b>
              </li>
              <li>
                The <b>Create New Experiment</b> should now be clickable. Click
                it.
              </li>
              <li>Click start experiment.</li>
              <li>
                Click <b>publish.</b>
              </li>
              <li>Click &lt;- to go back to the Product Page</li>
              <li>
                Click <b>Publish</b> on the Product Page
              </li>
              <li>
                Go to the{" "}
                <a href="/product" target="_blank">
                  product page
                </a>{" "}
                to see which content Growthbook has chosen to show. As this
                example initialized growthbook with a random targeting attribute
                id, it pretends each page load is a new user. You can refresh a
                few times to see Growthbook serve the control t-shirt sometimes
                and the variant t-shirt the other times.
              </li>
            </ol>
          </ol>
        </section>
        <section>
          <h2>How it Works</h2>
          <p>
            This example uses server-side Growthbook. For client-side growthbook
            see the next-js example.
          </p>
          <p>
            The code in <code>src/app/lib/growthbookExperiment.ts</code> shows
            the GraphQL to get the <b>Growthbook Experiment</b> content model
            which contains the <code>featureFlagId</code> and the{" "}
            <code>variationsCollection</code>. The <code>getVariation</code>{" "}
            function show how to get the variation from it. Basically calling
            gb.getFeatureValue with the <code>featureFlagId</code> will return
            the index of the variation to show in the{" "}
            <code>variationsCollection</code>.
          </p>
          <p>
            The <code>src/app/pages/[slug]/page.tsx</code> file contains the
            growthbook object and initialization.
          </p>
          <p>
            Server-fetched feature flags and experiment definitions are
            persisted in the Next.js data cache for 60 seconds (configurable in{" "}
            <code>src/app/lib/growthbookServer.ts</code>). For faster updates,
            there is a <code>POST /revalidate</code> route handler that can be
            triggered from an SDK Webhook in GrowthBook.
          </p>
          <p>
            Data about which variation the user saw is sent to the client where
            an analytics event is triggered (or console.log in these examples).
            This happens via the <code>GrowthBookTracking</code> client
            component defined in <code>src/app/lib/GrowthBookTracking</code>.
          </p>
        </section>
      </div>
    </main>
  );
}
