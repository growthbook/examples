<template>
  <div>
    <div v-if="loading">
      <p>⌚️ Loading...</p>
    </div>

    <div v-if="!loading">
      <h1>Public Section</h1>
      <h2>{{ bannerText }}</h2>
      <p>Donut Price: ${{ donutPrice.toFixed(2).toString() }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PublicPage',

  props: {},

  mounted() {
    this
      .initGrowthBook()
      .then((growthBook) => {
        if (!growthBook) {
          console.warn('GrowthBook failed to initialize. Feature flags and experiments not active.')
          return
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
          this.donutPrice = evaluatedDonutPrice;
        }

        const evaluatedBannerText = growthBook.getFeatureValue("banner_text", "");
        if (typeof evaluatedBannerText !== "undefined") {
          this.bannerText = evaluatedBannerText;
        }
      })
      .catch((error) => {
        console.error('Unknown Error', error)
      })
      .finally(() => {
        this.loading = false
      })
  },

  data() {
    return {
      loading: true,
      bannerText: '',
      donutPrice: 999,
    }
  }
}
</script>

<style scoped>
</style>