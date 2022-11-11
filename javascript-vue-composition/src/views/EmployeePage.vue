<script setup lang="ts">
import { growthBookKey } from "@/utils/growthbook/growthbook";
import { inject, onMounted, ref } from "vue";

const growthBook = inject(growthBookKey);

// Default value. We shouldn't see this if everything works right.
const donutPrice = ref<number>(999);
const bannerText = ref<string>("");

onMounted(() => {
  if (!growthBook) return;

  growthBook.setAttributes({
    loggedIn: true,
    country: "canada",
    employee: true,
    id: "user-employee-123456789",
  });

  // Fallback value. We shouldn't see this if donut_price is a valid feature
  const evaluatedDonutPrice = growthBook.getFeatureValue("donut_price", 1337);
  if (typeof evaluatedDonutPrice !== "undefined") {
    donutPrice.value = evaluatedDonutPrice;
  }

  const evaluatedBannerText = growthBook.getFeatureValue("banner_text", "");
  if (typeof evaluatedBannerText !== "undefined") {
    bannerText.value = evaluatedBannerText;
  }
});
</script>

<template>
  <div class="">
    <h1>This is an Employee page</h1>
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
