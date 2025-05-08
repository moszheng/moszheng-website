import { createApp } from "vue";
import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import { createPinia } from "pinia";
import { useNavStore } from "@/stores/navstore";

import Project from "@/views/Project.vue";

import "./assets/main.css";

import App from "./App.vue";

const routes = [
    { path: "/", name: "Index", component: () => import("@/views/Index.vue") },
    {
        path: "/works",
        name: "Works",
        // component: () => import('@/views/WorksPage.vue'),
        component: Project,
        meta: { keepAlive: true },
    },
    { path: "/works/:projecturl", name: "WorksItem", component: () => import("@/views/ProjectItem.vue"), props: true },
    { path: "/showreel", name: "Showreel", component: () => import("@/views/Showreel.vue") },
    { path: "/about", name: "About", component: () => import("@/views/AboutPage.vue"), meta: { keepAlive: false } },
    { path: "/contact", name: "Contact", component: () => import("@/views/ContactPage.vue") },
    { path: "/:catchAll(.*)", component: () => import("@/views/NotFoundPage.vue") },
];

// Router method
const router = createRouter({
    history: createWebHashHistory(), // Hash Mode, to avoid 404
    routes,
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top

        // return new Promise((resolve) => {
        //     resolve({ top: 0, behavior: "smooth" });
        // });
        return { top: 0, behavior: "smooth" };
    },
});

// Pinia store
const pinia = createPinia();

// if enter to index, update navbar state
router.beforeEach((to, from, next) => {
    const store = useNavStore();

    // Collapse navbar, When router change.
    const navbarToggler = document.querySelector(".navbar-toggler");
    if (store.isNavbarExpanded) {
        navbarToggler.click();
    }
    if (to.name == "Index") {
        store.navbardarkmode = true;
    } else {
        // dark mode
        store.navbardarkmode = false;
    }
    next();
});

createApp(App).use(pinia).use(router).mount("#app");
