import { useGrowthBook } from "@growthbook/growthbook-react";

export default function VisualExperimentsDisplay() {
  const gb = useGrowthBook();
  const experiments = gb?.getExperiments();

  if (!experiments?.length) {
    return <h3>No Visual Experiments found.</h3>;
  }

  return (
    <>
      <h3>Visual experiments:</h3>
      <ul>
        {experiments.map((e, i) => (
          <li key={i}>
            {e.name} ({e.status})
            <ul>
              <li>
                Target URLs
                <ul>
                  {e?.urlPatterns?.map((p, i) => (
                    <li key={i}>
                      <table border={1} cellPadding={4}>
                        <thead>
                          <th>Type</th>
                          <th>Pattern</th>
                          <th>Include?</th>
                        </thead>
                        <tbody>
                          <td>{p.type}</td>
                          <td>{p.pattern}</td>
                          <td>{p.include ? "true" : "false"}</td>
                        </tbody>
                      </table>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                Preview links
                <ul>
                  {e.variations.map((_v, i) => (
                    <li key={i}>
                      <a
                        href={`${window.location.href}?${e.name}=${i}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {`${window.location.href}?${e.name}=${i}`}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
