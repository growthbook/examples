<script setup lang="ts">
// Import Vue functions and the gbKey from main to preserve type info
import { inject, ref, watch } from 'vue'
import { gbKey } from '../main'

// Inject the GrowthBook instance
const growthbook = inject(gbKey)

// Create a reactive variable to store and update the feature flag result
const showBanner = ref(growthbook?.isOn('show-banner'))

// Optional: Watch the feature flag for changes (requires streaming to be enabled)
if (growthbook) {
  watch(growthbook, () => {
    showBanner.value = growthbook?.isOn('show-banner')
  })
}
</script>

<template>
  <p v-if="showBanner">The banner feature flag is <strong>on</strong>.</p>
  <p v-else>The banner feature flag is <strong>off</strong>.</p>
</template>
