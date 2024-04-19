import ComponentWithFeatures from "@/components/ComponentWithFeatures";

export default function ClientPage() {
  return (
    <div>
      <h1>Client Side Rendering</h1>
      <p>
        This page renders with all features disabled. Then, once React hydrates
        the page and features are loaded from the network, the actual values
        will get swapped in.
      </p>
      <ComponentWithFeatures />
    </div>
  );
}
