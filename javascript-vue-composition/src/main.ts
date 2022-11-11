import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import { growthBookPlugin } from "@/utils/growthbook/growthbook";

const app = createApp(App);

app.use(router);
app.use(growthBookPlugin, {
  featuresEndpoint:
    "https://cdn.growthbook.io/api/features/java_NsrWldWd5bxQJZftGsWKl7R2yD2LtAK8C8EUYh9L8",
});

app.mount("#app");
