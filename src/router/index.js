// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import DashboardView from "../views/DashboardView.vue";

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
