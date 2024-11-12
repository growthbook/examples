import { GrowthBook } from "@growthbook/growthbook";
import { getCookie, setCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

export const growthbookMiddleware = createMiddleware<{
  Variables: {
    gb: GrowthBook;
  };
}>(async (c, next) => {
  // Instantiate GrowthBook with your connection details
  const gb = new GrowthBook({
    apiHost: "https://cdn.growthbook.io",
    clientKey: "sdk-QHVPAFSjyMARduDY",
    trackingCallback: (experiment, result) => {
      console.log("Tracking", { experiment, result }); // Update function to send experiment exposure to your analytics platform
    },
  });

  // Get a preexisting cookie (ensures users are kept in the same variant)
  let uuid = getCookie(c, "gb_uuid");

  // Create the UUID/cookie if it doesn't exist
  if (!uuid) {
    uuid = crypto.randomUUID();
    setCookie(c, "gb_uuid", uuid);
  }

  // Pass GrowthBook the ID and other attributes as need
  gb.setAttributes({
    id: uuid,
    // ...
  });

  // Initialize GrowthBook
  await gb.init({ timeout: 5000 });

  // Add the instance to the context
  c.set("gb", gb);

  // Continue the req/response
  await next();

  // Clean up once the request closes
  gb.destroy();
});
