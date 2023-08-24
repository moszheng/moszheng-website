import './assets/main.css'
// import LocomotiveScroll from 'locomotive-scroll';

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue'

const routes = [
    { 
        path: '/', 
        name:'Home', 
        component: () => import('./views/Home.vue')
    },
    { 
        path: '/works', 
        name:'Works', 
        component: () => import('./views/Works.vue')
    },
    { 
        path: '/works/:projecturl', 
        name:'WorksPage', 
        component: () => import('./components/WorksPage.vue'), 
        // beforeEnter: (to, from) => {
        //     console.log("beforeEnter")
        //     return true
        // },
        props: true
    },
    { 
        path: '/about', 
        name:'About', 
        component: () => import('./views/About.vue') 
    },
    { 
        path: '/contact', 
        name:'Contact', 
        component: () => import('./views/Contact.vue') 
    },
    { 
        path: '/:catchAll(.*)', 
        component: () => import('./views/NotFound.vue') 
    },
];


// const scroll = new LocomotiveScroll({
//     el: document.querySelector('[data-scroll-container]'),
//     smooth: true,
//     lerp: 0.08
// });
// console.log(scroll)

// Router method
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0,behavior: 'smooth', }
    },
});

// router.beforeEach((to, from, next) => {
//     console.log("beforeEach_to : " , to)
//     next()
// })

createApp(App).use(router).mount('#app')