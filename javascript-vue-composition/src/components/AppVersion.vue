<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { growthBookKey } from "@/utils/growthbook/growthbook";

const growthBookInjectable = inject(growthBookKey);

// if you see "unknown app version," GrowthBook didn't init successfully
const appVersionName = ref<string>("unknown app version");

onMounted(() => {
  growthBookInjectable?.init().then((growthBook) => {
    if (!growthBook) {
      console.error("GrowthBook failed to initialize");
      return;
    }

    // Assign a version string. Supported ones are below. Anything else will return "(unknown)"
    growthBook.setAttributes({
      version: "1.1.0", // Albatross for 1.x.x
      // version: "2.123.456", // Badger for 2.x.x
      // version: "3.999.55", // Capybara for 3.x.x
      // version: "99.0.0", // unsupported version results in configured default value "(unknown)"
    });

    // if you see "??" it isn't in the feature payload
    const evaluatedAppName = growthBook.getFeatureValue("app_name", "??");
    appVersionName.value = evaluatedAppName;
  });
});
</script>

<template>
  <div class="app-version-chip">
    {{ appVersionName }}
  </div>
</template>

<style>
.app-version-chip {
  font-size: 0.8rem;
  font-weight: 700;
  background: hsla(160, 100%, 37%, 1);
  color: #fff;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
}
</style>
