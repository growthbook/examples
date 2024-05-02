import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h2>Configuration</h2>
      <section>
        <ol>
          <li>
            First, create a free{" "}
            <a href="https://www.growthbook.io" target="_blank">
              GrowthBook Account
            </a>{" "}
            and add a new SDK Connection, selecting JavaScript (or React) as the
            language.
          </li>
          <li>
            Next, in this example root, copy <code>.env.local.example</code> to{" "}
            <code>.env.local</code> and fill in the values from your GrowthBook
            SDK Connection.
          </li>
          <li>
            <p>
              Finally, create these two feature flags in your GrowthBook
              account. These will be referenced in the examples below.
            </p>
            <ul>
              <li>
                Key: <code>feature1</code>, Type:{" "}
                <code>Boolean (true/false)</code>
              </li>
              <li>
                Key: <code>feature2</code>, Type: <code>String</code>
              </li>
            </ul>
          </li>
        </ol>
      </section>
      <h2>Examples</h2>
      <section>
        <ul>
          <li>
            <Link href="/server">Dynamic Server Rendering</Link> - Use flags
            within Server Components
          </li>
          <li>
            <Link href="/client-optimized">Optimized Client Rendering</Link> -
            Use flicker-free flags within Client Components
          </li>
          <li>
            <Link href="/hybrid">Server/Client Hybrid</Link> - Combine the above
            two approaches in a single page
          </li>
          <li>
            <Link href="/static">Static Pages</Link> - Use feature flags only
            during build time
          </li>
          <li>
            <Link href="/streaming">Streaming Server Components</Link> -
            Supports experimental Partial Prerendering
          </li>
          <li>
            <Link href="/client">Client Rendering (Unoptimized)</Link> - Fetch
            and use flags client-side (flicker warning)
          </li>
        </ul>
      </section>
      <section>
        <h2>How it Works</h2>
        <p>
          There is a <code>middleware.ts</code> file that ensures a UUID cookie
          is available before the first request is processed. This UUID is
          shared between the client and server and is used to assign consistent
          feature values to visitors when a percentage rollout or experiment is
          running.
        </p>
        <p>
          Feature and experiment definitions are fetched from the server in all
          examples (except in the Unoptimized Client example). This ensures that
          the values are known at the initial render time, which lets us avoid
          the flicker commonly associated with client-side feature flags and
          experiments.
        </p>
        <p>
          Server-fetched feature flags and experiment definitions are persisted
          in the Next.js data cache for 60 seconds (configurable in{" "}
          <code>src/lib/growthbookServer.ts</code>). For faster updates, there
          is a <code>POST /revalidate</code> route handler that can be triggered
          from an SDK Webhook in GrowthBook.
        </p>
        <p>
          If an experiment is run server-side, data about which variation the
          user saw is sent to the client where an analytics event is triggered
          (or console.log in these examples). This happens via the{" "}
          <code>GrowthBookTracking</code> client component defined in{" "}
          <code>src/lib/GrowthBookTracking</code>.
        </p>
      </section>
    </main>
  );
}
