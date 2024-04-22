"use client";
import { useEffect } from "react";
import { GrowthBookProvider } from "@growthbook/growthbook-react";
import Cookies from "js-cookie";
import gb from "@/lib/growthbook/client";
import ClientComponent from "./ClientComponent";

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
