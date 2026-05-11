import { growthbookErrorTrackingPlugin } from "@growthbook/growthbook";
import {
  autoAttributesPlugin,
  growthbookTrackingPlugin,
} from "@growthbook/growthbook/plugins";
import { GB_UUID_COOKIE } from "@/middleware";

const MANAGED_WAREHOUSE_INGESTOR_HOST = "http://localhost:3003";

const trackingPlugin = () =>
  growthbookTrackingPlugin({
    ingestorHost: MANAGED_WAREHOUSE_INGESTOR_HOST,
    debug: true,
  });

/** Install after {@link growthbookTrackingPlugin} on the same GrowthBook instance. */
const errorTrackingPlugin = () =>
  growthbookErrorTrackingPlugin({
    release: process.env.NEXT_PUBLIC_APP_RELEASE,
  });

/**
 * Managed Warehouse event tracking for browser GrowthBook instances.
 * Pass `includeAutoAttributes` only when `typeof window !== "undefined"` so SSR
 * does not run `autoAttributesPlugin` (it requires `window`).
 * @see https://docs.growthbook.io/app/managed-warehouse#client-side-javascript--react
 */
export function growthbookManagedWarehouseClientPlugins(
  includeAutoAttributes: boolean
) {
  const plugins = [trackingPlugin(), errorTrackingPlugin()];
  if (includeAutoAttributes) {
    plugins.unshift(
      autoAttributesPlugin({
        uuidCookieName: GB_UUID_COOKIE,
        uuidKey: "id",
      })
    );
  }
  return plugins;
}

/** Same ingest pipeline without auto-attributes (server has no `window`). */
export function growthbookManagedWarehouseServerPlugins() {
  return [trackingPlugin(), errorTrackingPlugin()];
}
