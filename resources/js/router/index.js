import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        name: "home",
        path: "/",
        component: () => import("@/Pages/Home.vue"),
        params: {
            'p': 1,
            'search': ''
        }
    },
    {
        name: "form",
        path: "/form",
        component: () => import("@/Pages/Form.vue")
    },
        {
        name: "formEdit",
        path: "/form/:id",
        component: () => import("@/Pages/Form.vue"),
        props: true
    }
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
