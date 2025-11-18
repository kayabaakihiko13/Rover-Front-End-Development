// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
const routes = [
    { path: '/', component: HomeView },
    { path: '/register', component: RegisterView },
]

export default createRouter({
    history: createWebHistory(),
    routes,
})
