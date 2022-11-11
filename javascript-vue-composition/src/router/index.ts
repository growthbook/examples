import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/public",
      name: "public",
      component: () => import("../views/PublicPage.vue"),
    },
    {
      path: "/employee",
      name: "employee",
      component: () => import("../views/EmployeePage.vue"),
    },
  ],
});

export default router;
