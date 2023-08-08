import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue'
import Home from './Home.vue'
import Works from './Works.vue'
import WorksPage from './components/WorksPage.vue'
import About from './About.vue'
import Contact from './Contact.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/works', component: Works },
    { path: '/works/:projecturl', name:'WorksPage',component: WorksPage, props: true},
    { path: '/about', component: About },
    { path: '/contact', component: Contact }
];

// Router method
const router = createRouter({
    history: createWebHistory(),
    routes
});

createApp(App).use(router).mount('#app')