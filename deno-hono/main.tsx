import { Hono } from "hono";
import type { PropsWithChildren } from "hono/jsx";
import { serveStatic } from "hono/deno";
import { Navbar } from "./src/components/Navbar.tsx";
import { Footer } from "./src/components/Footer.tsx";
import { Hero } from "./src/components/Hero.tsx";
import { Copy } from "./src/components/Copy.tsx";
import { growthbookMiddleware } from "./growthbookMiddleware.ts";
import type { GrowthBook } from "@growthbook/growthbook";

const app = new Hono();

app.use("/static/*", serveStatic({ root: "./" }));
app.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }));

export type Props = { companyName?: string; gb: GrowthBook };

function Layout(
  { companyName, children }: PropsWithChildren<Omit<Props, "gb">>,
) {
  return (
    <html>
      <head lang="en">
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Deno + Hono + GrowthBook</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/static/style.css" />
      </head>

      <body>
        <Navbar companyName={companyName} />
        {children}
        <Footer companyName={companyName} />
      </body>
    </html>
  );
}

const Page = ({ companyName, gb }: Props) => {
  return (
    <Layout companyName={companyName}>
      <Hero gb={gb} />
      <Copy companyName={companyName} />
    </Layout>
  );
};

app.get("/", growthbookMiddleware, (c) => {
  const gbInstance = c.var.gb;
  return c.html(<Page companyName="Bayes Bank" gb={gbInstance} />);
});

Deno.serve(app.fetch);
