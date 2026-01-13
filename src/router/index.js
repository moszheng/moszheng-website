import { createRouter, createWebHashHistory } from "vue-router";
import { useNavStore } from "@/stores/navstore";

const routes = [
    { 
        path: "/", 
        name: "Index", 
        component: () => import("@/views/Index.vue") 
    },
    {
        path: "/works",
        name: "Works",
        component: () => import("@/views/Project.vue"),
        meta: { keepAlive: true },
    },
    { 
        path: "/works/:projecturl", 
        name: "WorksItem", 
        component: () => import("@/views/ProjectItem.vue"), 
        props: true 
    },
    { 
        path: "/showreel", 
        name: "Showreel", 
        component: () => import("@/views/Showreel.vue") 
    },
    { 
        path: "/about", 
        name: "About", 
        component: () => import("@/views/AboutPage.vue"), 
        meta: { keepAlive: false } 
    },
    { 
        path: "/contact", 
        name: "Contact", 
        component: () => import("@/views/ContactPage.vue") 
    },
    { 
        path: "/:catchAll(.*)", 
        component: () => import("@/views/NotFoundPage.vue") 
    },
    {
        path: "/admin",
        name: "Admin",
        component: () => import("@/views/AdminPage.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (savedPosition) {
                    resolve(savedPosition);
                } else {
                    resolve({ top: 0, behavior: "smooth" });
                }
            }, 500);
        });
    },
});

router.beforeEach((to, from, next) => {
    const store = useNavStore();

    // Close navbar if open (Reactive handling)
    if (store.isNavbarExpanded) {
        store.isNavbarExpanded = false;
    }

    // Update navbar dark mode state based on route
    if (to.name === "Index") {
        store.navbardarkmode = true;
    } else {
        store.navbardarkmode = false;
    }
    
    next();
});

export default router;
