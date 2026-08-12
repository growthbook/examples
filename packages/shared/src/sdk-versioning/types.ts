// Copied from growthbook/growthbook packages/shared/src/sdk-versioning/types.ts
// so the capabilities validator has the same single source of truth here in the
// examples sandbox. Keep the SDKCapability union in sync with the main app.
export type SDKCapability =
  | "looseUnmarshalling"
  | "encryption"
  | "streaming"
  | "bucketingV2"
  | "visualEditor"
  | "semverTargeting"
  | "visualEditorJS"
  | "remoteEval"
  | "visualEditorDragDrop"
  | "stickyBucketing"
  | "redirects"
  | "prerequisites"
  | "savedGroupReferences"
  | "caseInsensitiveRegex"
  | "caseInsensitiveMembership"
  | "namespacesV2"
  | "contextualBandits";
