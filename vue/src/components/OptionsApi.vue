<script lang="ts">
// Import Vue functions and the gbKey from main to preserve type info
import { inject, watch } from 'vue'
import { gbKey } from '../main'

export default {
  // Define a variable to store the feature flag result
  data() {
    return {
      showBanner: false
    }
  },
  mounted() {
    const gb = inject(gbKey) // Inject the GrowthBook instance

    // Set the showBanner variable to the feature flag value
    if (gb) {
      this.showBanner = gb.isOn('show-banner')

      // Optional: Watch the feature flag for changes (requires streaming to be enabled)
      watch(gb, () => {
        this.showBanner = gb.isOn('show-banner')
      })
    }
  }
}
</script>

<template>
  <p v-if="showBanner">The banner feature flag is <strong>on</strong>.</p>
  <p v-else>The banner feature flag is <strong>off</strong>.</p>
</template>
