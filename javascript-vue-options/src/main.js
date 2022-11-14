import Vue from 'vue'
import App from './App.vue'
import { GrowthBookVuePlugin } from './utils/growthbook/growthbook'

Vue.config.productionTip = false

Vue.use(GrowthBookVuePlugin, {
  featuresEndpoint: "https://cdn.growthbook.io/api/features/java_NsrWldWd5bxQJZftGsWKl7R2yD2LtAK8C8EUYh9L8",
  enableDevMode: true,
})

new Vue({
  render: h => h(App),
}).$mount('#app')
