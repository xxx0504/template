import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        name: 'home',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/pages/Home/Home'),
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), //可传参数，配置base路径，例如'/app'
    routes,
});
export default router;
