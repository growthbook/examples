import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>GrowthBook Next.js Example</h1>
      <p>
        In order for this demo to work, you need to specify some environment
        variables:
        <ul>
          <li>
            <code>NEXT_PUBLIC_GROWTHBOOK_HOST</code>
          </li>
          <li>
            <code>NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY</code>
          </li>
          <li>
            <code>NEXT_PUBLIC_GROWTHBOOK_DECRYPTION_KEY</code> (optional)
          </li>
        </ul>
      </p>
      <h3>Rendering Strategies</h3>
      <ul>
        <li>
          <Link href="/client">Client Side Rendering</Link>
        </li>
        <li>
          <Link href="/server">Pure Server Side Rendering</Link>
        </li>
        <li>
          <Link href="/server-hybrid">
            Server Hybrid (Server + Client Rendering)
          </Link>
        </li>
        <li>
          <Link href="/static">Pure Static</Link>
        </li>
        <li>
          <Link href="/static-hybrid">
            Static Hybrid (Static + Client Rendering)
          </Link>
        </li>
        <li>
          <Link href="/api/hello">API Route</Link>
        </li>
      </ul>
    </>
  );
}
