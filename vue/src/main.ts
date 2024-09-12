// Import the GrowthBook SDK
import { GrowthBook } from '@growthbook/growthbook'

// Add imports needed to create the provider
import type { InjectionKey } from 'vue'
import { createApp, reactive } from 'vue'

import App from './App.vue'
import './assets/main.css'

// Create a reactive instance of GrowthBook
const gbInstance = reactive(
  new GrowthBook({
    clientKey: 'sdk-tGsrxeKjXh7AUv',
    attributes: {
      // Add user attributes here
    },
    enableDevMode: true // Optional: Enable the Visual Editor and dev tools
  })
)

// Share the provider type with other components
export const gbKey = Symbol('gb') as InjectionKey<typeof gbInstance | null>

// Initialize GrowthBook with streaming enabled for real-time updates
const initializeGrowthBook = async () => {
  try {
    await gbInstance.init({ streaming: true })
    return gbInstance
  } catch (e) {
    console.error('Error initializing GrowthBook:', e)
    return null
  }
}

initializeGrowthBook().then((gbInstance) => {
  const app = createApp(App)

  // Provide the GrowthBook instance
  app.provide(gbKey, gbInstance)
  app.mount('#app')
})
