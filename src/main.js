import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue'
import Home from './views/Home.vue'
import Works from './views/Works.vue'
import WorksPage from './components/WorksPage.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'
import NotFound from './views/NotFound.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/works', component: Works },
    { path: '/works/:projecturl', name:'WorksPage',component: WorksPage, props: true},
    { path: '/about', component: About },
    { path: '/contact', component: Contact },
    { path: '/:catchAll(.*)', component: NotFound },
];

// Router method
const router = createRouter({
    history: createWebHistory(),
    routes
});

createApp(App).use(router).mount('#app')