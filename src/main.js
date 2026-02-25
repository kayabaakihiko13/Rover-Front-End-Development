// main.js
import { createApp, ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";

// Views
import App from "./App.vue";
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import ForgotPasswordView from "@/views/ForgotPasswordView.vue";
import ResetPasswordView from "@/views/ResetPasswordView.vue";
import DashboardView from "@/views/DashboardView.vue";
import DetectionView from "@/views/DectectionView.vue";
import ResultDetectionView from "@/views/ResultDetectionView.vue";
import HistoryView from "@/views/HistoryView.vue";

// -----------------------------
// ENV FILE 
// -----------------------------
export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// -----------------------------
// AUTH HANDLING
// -----------------------------
export const emitAuthChange = () => {
    window.dispatchEvent(new Event("auth-changed"));
};

const isLoggedIn = ref(false);
const username = ref(null);

const syncAuth = () => {
    const token = localStorage.getItem("token");
    isLoggedIn.value = !!token;
    username.value = localStorage.getItem("username");
};

// Initial sync
syncAuth();

// Listen for global auth changes
window.addEventListener("auth-changed", syncAuth);

// Custom hook
export const useAuth = () => ({
    isLoggedIn,
    username,
    syncAuth,
});

// -----------------------------
// ROUTES
// -----------------------------
const routes = [
    {
        path: "/",
        component: HomeView,
        meta: { guestOnly: true }
    },

    { path: "/register", component: RegisterView, meta: { guestOnly: true } },
    { path: "/login", component: LoginView, meta: { guestOnly: true } },
    { path: "/forgot-password", component: ForgotPasswordView, meta: { guestOnly: true } },
    { path: "/reset-password", component: ResetPasswordView, meta: { guestOnly: true } },

    { path: "/dashboard", component: DashboardView, meta: { requiresAuth: true } },
    { path: "/detection", component: DetectionView, meta: { requiresAuth: true } },

    {
        path: "/hasil-deteksi",
        name: "result-detection",
        component: ResultDetectionView,
        meta: { requiresAuth: true },
        props: route => ({
            imageUrl: route.query.imageUrl ? decodeURIComponent(route.query.imageUrl) : "",
            classLabels: parseJSON(route.query.classLabels),
            yamlLabels: parseJSON(route.query.yamlLabels),
            classCount: parseIntSafe(route.query.classCount)
        })
    },

    { path: "/history", name: "history", component: HistoryView, meta: { requiresAuth: true } },
];

// Helper functions for parsing
const parseJSON = (value) => {
    try {
        return value ? JSON.parse(value) : [];
    } catch {
        return [];
    }
};

const parseIntSafe = (value) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 0 : parsed;
};

// -----------------------------
// ROUTER
// -----------------------------
const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _, next) => {
    syncAuth();

    if (to.meta.requiresAuth && !isLoggedIn.value) {
        return next("/login");
    }

    if (to.meta.guestOnly && isLoggedIn.value) {
        return next("/dashboard");
    }

    next();
});

// -----------------------------
// MOUNT APP
// -----------------------------
createApp(App).use(router).mount("#app");
