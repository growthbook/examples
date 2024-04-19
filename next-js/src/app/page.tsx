import Link from "next/link";
export default function Home() {
  return (
    <main>
      <div className="my-4">
        <p>
          In order for this demo to work, you&apos;ll need to specify some
          environment variables:
        </p>
        <ul className="my-2">
          <li>
            <code>NEXT_PUBLIC_GROWTHBOOK_API_HOST</code>
          </li>
          <li>
            <code>NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY</code>
          </li>
          <li>
            <code>NEXT_PUBLIC_GROWTHBOOK_DECRYPTION_KEY</code> (optional)
          </li>
        </ul>
        <p>
          This demo will work best with two feature flags defined in your
          GrowthBook instance:
        </p>
        <ul className="my-2">
          <li>
            <code>feature1</code> - a boolean type flag
          </li>
          <li>
            <code>feature2</code> - a string type flag
          </li>
        </ul>
      </div>
      <div className="text-3xl">Rendering Strategies</div>
      <div className="my-4">
        <ul>
          <li>
            Server components
            <ul>
              <li>
                <Link href="/server/static">Static</Link>
              </li>
              <li>
                <Link href="/server/dynamic">Dynamic</Link>
              </li>
              <li>
                <Link href="/server/streaming">
                  Streaming (and Partial Prerendering)
                </Link>
              </li>
              <li>
                <Link href="/server/combo">Server + Client combo</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/client">Client components</Link>
          </li>
          <li>
            <Link href="/middleware">Middleware</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
