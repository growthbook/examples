import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createGB } from "@/lib/growthbook";

export async function middleware(request: NextRequest) {
  // create instance per request, server-side
  const gb = createGB();

  await gb.loadFeatures({ timeout: 1000 });

  const cookieStore = cookies();
  const userId = cookieStore.get("gb-next-example-userId");

  gb.setAttributes({
    id: userId,
  });

  const feature1Enabled = gb.isOn("feature1");
  const feature2Value = gb.getFeatureValue("feature2", "fallback");

  return NextResponse.redirect(
    new URL(
      `/client/middleware?feature1=${feature1Enabled}&feature2=${feature2Value}`,
      request.url
    )
  );
}

export const config = {
  matcher: "/middleware",
};
