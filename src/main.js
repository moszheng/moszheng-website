import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import {useNavStore} from '@/stores/navstore'

import './assets/main.css'
// import Lenis from '@studio-freight/lenis'
// Import our custom CSS
import './scss/styles.scss'

import App from './App.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./views/HomePage.vue'),
    },
    {
        path: '/works',
        name: 'Works',
        component: () => import('./views/WorksPage.vue'),
    },
    {
        path: '/works/:projecturl',
        name: 'WorksPage',
        component: () => import('./components/WorkItem.vue'),
        // beforeEnter: (to, from) => {
        //     console.log("beforeEnter")
        //     return true
        // },
        props: true,
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('./views/AboutPage.vue'),
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('./views/ContactPage.vue'),
    },
    {
        path: '/:catchAll(.*)',
        component: () => import('./views/NotFoundPage.vue'),
    },
];

// Lenis
// const lenis = new Lenis()

// lenis.on('scroll', (e) => {
// //   console.log(e)
// })

// function raf(time) {
//   lenis.raf(time)
//   requestAnimationFrame(raf)
// }

// requestAnimationFrame(raf)

// Router method
const router = createRouter({
    history: createWebHistory(),
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

// const store = createStore({
//     state() {
//         return {
//             navbardarkmode: true,
//         }
//     },
//     mutations: {
//         changeNavbarState(state, isActive) {
//             state.navbardarkmode = isActive;
//         },
//     }
// })

createApp(App).use(pinia).use(router).mount('#app')