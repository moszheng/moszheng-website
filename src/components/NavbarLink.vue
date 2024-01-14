<script setup>
import {ref, watch, computed} from 'vue';
import {useRoute} from 'vue-router';
import {useNavStore} from '@/stores/navstore';
import gsap from 'gsap';

const props = defineProps({
    to: String,
});

const route = useRoute();
const currentRouteName = ref('');
watch(route, (to, from) => {
  currentRouteName.value = to.path;
})
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
    gsap.set(el, {x: -50, width: 0, scaleX: 0.5, opacity: 0});
};
function onEnter(el, done) {
    gsap.to(el, {x: 0, width: '70%', opacity: 1, scaleX: 1, duration: 0.3, ease: "back.Out(2.5)"});
};
function onLeave(el, done) {
    gsap.to(el, {x: 30, width: 0, opacity: 0, scaleX: 0.5, duration: 1, ease: "back.inOut(1.7)"});
};
</script>
<template>
<li class="nav-item ">
    <div class="d-flex align-items-center">
        <router-link :to="{ name : to }" class="nav-link px-2 me-md-4" :style="colormode">{{ props.to }}</router-link>
    </div>
    <Transition :css="false"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
    >
        <span v-show="isActive" class="" :class="{ navactive: isActive}" :style="colormode"></span>
    </Transition>
</li>
</template>

<style>
.navactive {
    display: block;
    height: 7.5px;
    width: 70%;
    background-color: rgb(0, 0, 0);
}
</style>