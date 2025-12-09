// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import DashboardView from "../views/DashboardView.vue";
import DetectionView from "../views/DectectionView.vue";
import ResultDetectionView from "../views/ResultDetectionView.vue";


const routes = [
  { path: "/", component: HomeView },

  {
    path: "/register",
    component: RegisterView,
    meta: { guestOnly: true }
  },

  {
    path: "/login",
    component: LoginView,
    meta: { guestOnly: true }
  },

  {
    path: "/forgot-password",
    component: ForgotPasswordView,
    meta: { guestOnly: true }
  },

  {
    path: "/dashboard",
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: "/detection",
    component: DetectionView,
    meta: { requiresAuth: true }
  },
  {
    path: "/hasil-deteksi",
    name: 'result-detection',
    component: ResultDetectionView,
    meta: { requiresAuth: true },
    props: route => ({
      // decode imageUrl so component receives a clean URL
      imageUrl: route.query.imageUrl ? decodeURIComponent(route.query.imageUrl) : "",
      // parse JSON strings into arrays/objects
      classLabels: (() => {
        try { return JSON.parse(route.query.classLabels || "[]"); } catch { return []; }
      })(),
      yamlLabels: (() => {
        try { return JSON.parse(route.query.yamlLabels || "[]"); } catch { return []; }
      })(),
      classCount: (() => {
        const n = route.query.classCount;
        const parsed = n === undefined ? 0 : parseInt(n, 10);
        return isNaN(parsed) ? 0 : parsed;
      })()
    })
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("token");

  if (to.meta.requiresAuth && !isLoggedIn) return next("/login");
  if (to.meta.guestOnly && isLoggedIn) return next("/dashboard");

  next();
});

export default router;
