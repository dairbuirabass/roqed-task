import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        name: "home",
        path: "/",
        component: () => import("@/Pages/Home.vue")
    },
    {
        name: "form",
        path: "/form",
        component: () => import("@/Pages/Form.vue")
    }
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
