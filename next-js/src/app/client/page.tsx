"use client";
import { GrowthBookProvider } from "@growthbook/growthbook-react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { createGB } from "@/lib/growthbook";
import ClientComponent from "./ClientComponent";

const gb = createGB({
  // client-side feature
  subscribeToChanges: true,
});

export default function ClientPage() {
  useEffect(() => {
    const load = async () => {
      try {
        await gb.loadFeatures();
        const userId = Cookies.get("gb-next-example-userId");
        gb.setAttributes({
          id: userId,
        });
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);
  return (
    <GrowthBookProvider growthbook={gb}>
      <ClientComponent />
    </GrowthBookProvider>
  );
}
