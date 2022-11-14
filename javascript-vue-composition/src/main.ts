import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { growthBookPlugin } from "@/utils/growthbook/growthbook";

import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.use(growthBookPlugin, {
  featuresEndpoint:
    "https://cdn.growthbook.io/api/features/java_NsrWldWd5bxQJZftGsWKl7R2yD2LtAK8C8EUYh9L8",
  enableDevMode: true,
});

app.mount("#app");
