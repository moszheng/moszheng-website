import {createApp} from 'vue'
import {createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import {createPinia} from 'pinia'
import {useNavStore} from '@/stores/navstore'

import WorkPage from '@/views/WorksPage.vue'

import './assets/main.css'
// Import our custom CSS
import './scss/styles.scss'

import App from './App.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/HomePage.vue'),
    },
    {
        path: '/works',
        name: 'Works',
        // component: () => import('@/views/WorksPage.vue'),
        component: WorkPage,
        meta: {
            keepAlive: true
        },
    },
    {
        path: '/works/:projecturl',
        name: 'WorksItem',
        component: () => import('@/components/WorkItem.vue'),
        props: true,
    },
    {
        path: '/showreel',
        name: 'Showreel',
        component: () => import('@/views/Showreel.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/AboutPage.vue'),
        meta: {
            keepAlive: false
        },
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('@/views/ContactPage.vue'),
    },
    {
        path: '/:catchAll(.*)',
        component: () => import('@/views/NotFoundPage.vue'),
    },
];

// Router method
const router = createRouter({
    history: createWebHashHistory(), // Hash Mode, to avoid 404
    routes,
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return {top: 0, behavior: 'smooth',}
    },
});

// Pinia store
const pinia = createPinia()

// if enter to home page, update navbar state
router.beforeEach((to, from, next) => {
    const store = useNavStore();

    if (to.name == 'Home') {
        store.navbardarkmode = true;
    }
    else {
        store.navbardarkmode = false;
    }
    next();
})

createApp(App).use(pinia).use(router).mount('#app')