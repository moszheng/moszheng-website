<script setup>
import {ref, watch, computed} from 'vue';
import {useRoute} from 'vue-router';
import {useNavStore} from '@/stores/navstore';
import gsap from 'gsap';

const props = defineProps({
    to: String,
});

/* Active Route */
const route = useRoute();
const currentRouteName = ref('');
watch(route, (to, from) => {
    currentRouteName.value = to.path;
});
const isActive = computed(() => {
    return route.name === props.to;
});

/* ---------- Color mode --------*/
const store = useNavStore();

// update Darkmode
const colormode = computed(() => {
    return store.navbardarkmode ? 'fill:#FFF; color:#FFF;' : 'fill:#000; color:#000;';
});

/* Animation */
function onBeforeEnter(el) {
    gsap.set(".navactive::after", {xPercent: -50, width: 0, scaleX: 0.5, opacity: 0});
};
function onEnter(el, done) {
    gsap.to(".navactive::after", {xPercent: 0, width: '70%', opacity: 1, scaleX: 1, duration: 0.5, ease: "expo.out"});
};
function onLeave(el, done) {
    gsap.to(".navactive::after", {xPercent: 30, width: 0, opacity: 0, scaleX: 0.5, duration: 0.5, ease: "back.inOut(1.7)"});
};
</script>
<template>
<li class="nav-item my-2">
    <div class="d-flex align-items-center">
        <router-link :to="{ name : to }"
            class="nav-link px-1 py-1 me-md-4"
            :class="{ navactive: isActive }"
            :style="colormode"
        >
            {{ props.to }}
        </router-link>
    </div>
</li>
</template>

<style>
.navactive{
    position: relative;
}
.nav-link{
    transition: .2s ease-in-out;
}
/* .nav-link:hover{
    transform: scale(1.05);
} */
.navactive::after{
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.35em;
    width: 100%;
    height: 10px;
    border-top: 0.2em solid #000;
}
</style>
