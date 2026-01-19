import { createRouter, createWebHashHistory } from "vue-router";
import { useNavStore } from "@/stores/navstore";

const routes = [
    {
        path: "/",
        name: "Index",
        component: () => import("@/views/Index.vue"),
        meta: { title: "Mos Zheng - Portfolio" }
    },
    {
        path: "/works",
        name: "Works",
        component: () => import("@/views/Project.vue"),
        meta: { keepAlive: true, title: "Works - Mos Zheng" },
    },
    {
        path: "/works/:projecturl",
        name: "WorksItem",
        component: () => import("@/views/ProjectItem.vue"),
        props: true,
        meta: { title: "Project - Mos Zheng" }
    },
    {
        path: "/showreel",
        name: "Showreel",
        component: () => import("@/views/Showreel.vue"),
        meta: { title: "Showreel - Mos Zheng" }
    },
    {
        path: "/about",
        name: "About",
        component: () => import("@/views/AboutPage.vue"),
        meta: { keepAlive: false, title: "About - Mos Zheng" }
    },
    {
        path: "/contact",
        name: "Contact",
        component: () => import("@/views/ContactPage.vue"),
        meta: { title: "Contact - Mos Zheng" }
    },
    {
        path: "/:catchAll(.*)",
        component: () => import("@/views/NotFoundPage.vue"),
        meta: { title: "404 Not Found - Mos Zheng" }
    },
    {
        path: "/admin",
        name: "Admin",
        component: () => import("@/views/AdminPage.vue"),
        meta: { title: "Admin - Mos Zheng" }
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

    // Update Document Title
    document.title = to.meta.title || "Mos Zheng";

    next();
});

export default router;
