<script setup>
import gsap from "gsap";
import Navbar from "./components/NavbarItem.vue";
import IconSprite from "@/components/icons/IconSprite.vue";

const beforeEnter = (el) => {
    gsap.to(el, { opacity: 0 });
};

const onEnter = (el, done) => {
    gsap.to(el, { opacity: 1, duration: 1, ease: "power4.inOut", onComplete: done });
};

const onLeave = (el, done) => {
    gsap.to(el, { opacity: 0, duration: 1, ease: "power4.inOut", onComplete: done });
};
</script>
<template>
    <Navbar />

    <router-view v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
            <component :is="Component" :key="route.path"></component>
        </Transition>
    </router-view>

    <IconSprite />
</template>

<style>
/*---------Vue Transition--------*/

.fade-enter-active {
    transition: opacity 1s ease;
}
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
