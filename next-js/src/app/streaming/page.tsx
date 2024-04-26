import { Suspense } from "react";
import AsyncComponent from "./AsyncComponent";
import RevalidateMessage from "@/app/revalidate/RevalidateMessage";
const Loading = () => {
  return <div className="text-fuchsia-500">Loading...</div>;
};
export default async function ServerStreaming() {
  return (
    <>
      <h2>Streaming Server Rendering</h2>
      <Suspense fallback={<Loading />}>
        <AsyncComponent />
      </Suspense>

      <RevalidateMessage />
    </>
  );
}
