<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { growthBookKey } from "@/utils/growthbook/growthbook";

const growthBookInjectable = inject(growthBookKey);

// Default value. We shouldn't see $999 this unless the GrowthBook SDK fails to initialize
const donutPrice = ref<number>(999);
const bannerText = ref<string>("");

onMounted(() => {
  growthBookInjectable?.init().then((growthBook) => {
    if (!growthBook) {
      console.error("GrowthBook failed to initialize");
      return;
    }

    growthBook.setAttributes({
      loggedIn: true,
      country: "france",
      employee: false,
      id: "user-abc123",
    });

    // Fallback value. We shouldn't see $1337 if donut_price is a valid feature
    const evaluatedDonutPrice = growthBook.getFeatureValue("donut_price", 1337);
    if (typeof evaluatedDonutPrice !== "undefined") {
      donutPrice.value = evaluatedDonutPrice;
    }

    const evaluatedBannerText = growthBook.getFeatureValue("banner_text", "");
    if (typeof evaluatedBannerText !== "undefined") {
      bannerText.value = evaluatedBannerText;
    }
  });
});
</script>

<template>
  <div class="">
    <h1>This is a Public page</h1>
    <h2>{{ bannerText }}</h2>
    <p>Donut Price: ${{ donutPrice.toFixed(2).toString() }}</p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
