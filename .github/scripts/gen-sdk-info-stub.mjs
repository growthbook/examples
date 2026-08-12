#!/usr/bin/env node
// STUB stand-in for the main app's pre-commit `gen-sdk-resources-for-docs`.
//
// In growthbook/growthbook, a pre-commit hook regenerates docs/src/data/SDKInfo.ts
// whenever anything under shared/src/sdk-versioning changes. That generator needs
// the full shared + sdk-js build, which we deliberately do NOT pull into this
// sandbox. This stub reproduces the essential behaviour — deriving a docs artifact
// from the sdk-versions JSON — so we can prove the "edit JSON -> regenerate derived
// file -> commit both" loop end to end without the main-app dependency graph.
//
// It reads every sdk-versions/*.json and writes docs/src/data/SDKInfo.generated.json
// mapping each SDK to its latest version and the capabilities it declares. Both a
// version bump and a capability edit change this file, exactly like SDKInfo.ts.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dir = path.join(root, "packages/shared/src/sdk-versioning/sdk-versions");
const out = path.join(root, "docs/src/data/SDKInfo.generated.json");

const info = {};
for (const file of readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
  const sdk = file.replace(/\.json$/, "");
  const data = JSON.parse(readFileSync(path.join(dir, file), "utf8"));
  const versions = data.versions || [];
  const capabilities = [];
  for (const v of versions) {
    for (const c of v.capabilities || []) {
      if (!capabilities.includes(c)) capabilities.push(c);
    }
  }
  info[sdk] = { latest: versions[0]?.version || "0.0.0", capabilities };
}

writeFileSync(out, JSON.stringify(info, null, 2) + "\n");
console.log(`Wrote ${out} for ${Object.keys(info).length} SDK(s).`);
