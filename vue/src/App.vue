<script setup lang="ts">
import OptionsApi from './components/OptionsApi.vue'
import CompositionApi from './components/CompositionApi.vue'
</script>

<template>
  <header>
    <a
      href="https://growthbook.io"
      aria-label="GrowthBook, feature flagging and experimentation platform"
    >
      <img alt="Vue logo" class="logo" src="./assets/gb-logo-color.svg" width="150" height="24" />
    </a>
    <h1>GrowthBook + Vue Integration Example</h1>
    <p>Learn more in the <a href="https://docs.growthbook.io/lib/vue">official docs</a>.</p>
  </header>

  <main>
    <!-- Uncomment/comment to see the examples in action -->
    <!-- <OptionsApi /> -->
    <CompositionApi />
  </main>
</template>

<style scoped>
header {
  margin-block-end: 2rem;
}

.logo {
  display: block;
  margin-block-end: 0.5rem;
}

h1 {
  margin-block-end: 0.5rem;
}
</style>
