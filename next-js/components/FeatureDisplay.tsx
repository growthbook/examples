export default function FeatureDisplay({
  feature1Enabled,
  feature2Value,
}: {
  feature1Enabled: boolean;
  feature2Value: string;
}) {
  return (
    <ul>
      <li>
        feature1: <strong>{feature1Enabled ? "ON" : "OFF"}</strong>
      </li>
      <li>
        feature2: <strong>{feature2Value}</strong>
      </li>
    </ul>
  );
}
