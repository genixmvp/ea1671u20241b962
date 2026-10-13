import { createRouter, createWebHistory } from "vue-router";
import Home from "@/shared/presentation/views/home.vue";
import inventoryRoutes from "@/inventory/presentation/inventory-routes.js";

const pageNotFound = () => import("@/shared/presentation/views/page-not-found.vue");

/**
 * Application router.
 * @summary Semantic routes with child routes per bounded context.
 * @author Carolina Navarro Aldoradin
 */
const routes = [
    { path: '/home', name: 'home', component: Home, meta: { title: 'Home' } },
    { path: '/games', children: inventoryRoutes },
    { path: '/', redirect: '/home' },
    { path: '/:pathMatch(.*)*', name: 'page-not-found', component: pageNotFound, meta: { title: 'Page Not Found' } }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach((to) => {
    document.title = `RAWG Game Collection - ${to.meta.title ?? ''}`;
    return true;
});

export default router;