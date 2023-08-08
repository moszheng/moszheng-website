import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue'
import Works from './Works.vue'
import About from './About.vue'
import Contact from './Contact.vue'

const routes = [
    { path: '/', component: App },
    { path: '/works', component: Works },
    { path: '/about', component: About },
    { path: '/contact', component: Contact }
];
  

//old method
// createApp(App).mount('#app')

// Router method
const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp({});
app.use(router);
app.mount('#app');