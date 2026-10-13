/**
 - Inventory routes.
 - @summary Child routes of the inventory bounded context (mounted under /inventory o /games).
 - @author Carolina Navarro
 */
const gameItemForm = () => import('./views/game-inventory-item-form.vue');

const inventoryRoutes = [
    { path: 'items/new', name: 'game-inventory-item-new', component: gameItemForm, meta: { title: 'New Game Inventory Item' } }
];

export default inventoryRoutes;