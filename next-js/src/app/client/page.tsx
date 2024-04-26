"use client";
import Cookies from "js-cookie";
import { GrowthBookProvider } from "@growthbook/growthbook-react";
import { useEffect } from "react";
import ClientComponent from "./ClientComponent";
import { gb } from "@/lib/growthbookClient";
import { GB_UUID_COOKIE } from "@/middleware";

export default function ClientPage() {
  useEffect(() => {
    const load = async () => {
      try {
        await gb.loadFeatures();

        let uuid = Cookies.get(GB_UUID_COOKIE);
        if (!uuid) {
          uuid = Math.random().toString(36).substring(2);
          Cookies.set(GB_UUID_COOKIE, uuid);
        }

        gb.setAttributes({
          id: uuid,
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
