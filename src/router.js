// router.js
import { createRouter, createWebHistory } from "vue-router";
import LiveScoreboard from "./components/LiveScoreboard.vue";
import UpdateScoreboard from "./components/UpdateScoreboard.vue";

const routes = [
    { path: "/", component: UpdateScoreboard },
    { path: "/live", component: LiveScoreboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;