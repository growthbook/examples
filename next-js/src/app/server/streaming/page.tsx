import { Suspense } from "react";
import AsyncComponent from "./AsyncComponent";
const Loading = () => {
  return <div className="my-2 text-2xl">Loading...</div>;
};
export default async function ServerStreaming() {
  return (
    <div>
      <div className="text-4xl my-4">Server Component - Streaming Render</div>
      <Suspense fallback={<Loading />}>
        <AsyncComponent />
      </Suspense>
    </div>
  );
}
