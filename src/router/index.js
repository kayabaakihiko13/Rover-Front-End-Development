// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import DashbroadView from "../views/DashbroadView.vue";
const routes = [
  { path: "/", component: HomeView },
  { path: "/register", component: RegisterView },
  { path: "/login", component: LoginView },
  { path: "/forgot-password", component: ForgotPasswordView },
  { path: "/dashboard", component: DashbroadView }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
