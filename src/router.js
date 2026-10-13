import { createRouter, createWebHistory } from "vue-router";
import Home from "@/shared/presentation/views/home.vue";
import storageRoutes from "@/inventory/presentation/inventory-routes.js";

const pageNotFound = () => import("@/shared/presentation/views/page-not-found.vue");

/**
 * Application router.
 * @summary Semantic routes with child routes per bounded context.
 * @author Carolina Navarro Aldoradin
 */
const routes = [
    { path: '/home', name: 'home', component: Home, meta: { title: 'Home' } },
    { path: '/inventory', children: storageRoutes },
    { path: '/', redirect: '/home' },
    { path: '/:pathMatch(.*)*', name: 'page-not-found', component: pageNotFound, meta: { title: 'Page Not Found' } }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach((to) => {
    document.title = `PokéBox - ${to.meta.title ?? ''}`;
    return true;
});

export default router;
