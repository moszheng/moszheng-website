import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex'

import './assets/main.css'
// import LocomotiveScroll from 'locomotive-scroll';
import Lenis from '@studio-freight/lenis'
// Import our custom CSS
import './scss/styles.scss'

import App from './App.vue'

const routes = [
    { 
        path: '/', 
        name:'Home', 
        component: () => import('./views/Home.vue'),
    },
    { 
        path: '/works', 
        name:'Works', 
        component: () => import('./views/Works.vue'),
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

// Lenis
const lenis = new Lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Router method
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0,behavior: 'smooth', }
    },
});

// if enter to home page, update navbar state
router.beforeEach((to, from, next) => {
    
    if(to.name == 'Home'){
        store.commit('changeNavbarState', true);
    }
    else{
        store.commit('changeNavbarState', false);
    }
    next()
})

const store = createStore({
    state () {
        return {
            navbardarkmode: true,
        }
    },
    mutations: {
        changeNavbarState(state, isActive) {
            state.navbardarkmode = isActive;
        },
    }
})

createApp(App).use(store).use(router).mount('#app')