<script setup lang="ts">
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Vue SDK</template>

    GrowthBook’s
    <a href="https://docs.growthbook.io/lib/vue" target="_blank" rel="noopener"
      >official Vue.js documentation</a
    >
    to get started
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>More Examples</template>

    See more
    <a
      href="https://github.com/growthbook/examples"
      target="_blank"
      rel="noopener"
      >GrowthBook implementation examples</a
    >
  </WelcomeItem>
</template>
