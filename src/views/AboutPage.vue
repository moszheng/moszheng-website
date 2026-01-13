<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useNavStore } from "@/stores/navstore";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

import AboutHero from "@/components/AboutPage/AboutPageHero.vue";
import AboutIntro from "@/components/AboutPage/AboutPageIntro.vue";
import AboutExp from "@/components/AboutPage/AboutPageExp.vue";
import AboutSkill from "@/components/AboutPage/AboutPageSkill.vue";
import AboutContact from "@/components/AboutPage/AboutPageContact.vue";
import IconMosLogo from "../assets/icon/IconMosLogo.vue";

/* -------------- Store --------------------*/
const store = useNavStore();
const changeNavbarState = (state) => {
    store.navbardarkmode = state;
};
const finishloading = ref(false);
const imgContainer = ref();
let ctx;
const matchmedia = gsap.matchMedia();
onMounted(() => {
    /* -------------- Preloading status --------------------- */
    // Simulating wait for resources or waiting for window load
    // The LazyImage component handles individual image fade-ins.
    // We just need to hide the main loading overlay.
    // For a smoother experience, we can wait a bit or track loaded count.
    // For now, let's keep it simple:
    setTimeout(() => {
        finishloading.value = true;
    }, 1000); 

    setupDesktopAnimations(matchmedia);
    // let smoother = ScrollSmoother.create({
    //     content: imgContainer.value,
    //     smooth: 2,
    //     effects: true,
    //     normalizeScroll: true
    // });
    ctx = gsap.context((self) => {
        animateIntro(self);
        animateExp(self);
        animateSkill(self);
        animateContact(self);
    }, imgContainer.value);
});
/* --------- Desktop only Motion ----------------------*/
const noScroll = ref(true);
/* Enter AboutPage Motion */
const loadingEnter = (el, done) => {
    // gsap.set("#about-loadinglogo", { scale: 60, rotationZ: -30, });
    // gsap.fromTo(el, { yPercent: -200 },{ yPercent: 0, duration: 1.2, ease: "power4.inOut" });
};
const loadingLeave = (el, done) => {
    const tl = gsap.timeline();
    tl.to(el, { yPercent: -70, scaleY: 0.1, duration: 1, ease: "power4.in", onStart: animateHero, 
        onComplete: ()=> {
            noScroll.value = false;
        }
    }, 0.75);
    tl.to(el, { display: "none" }, 1.65);
};

// Import animations
import { useAboutAnimations } from "@/composables/useAboutAnimations";
const { 
    setupDesktopAnimations,
    animateHero, 
    animateIntro, 
    animateExp, 
    animateSkill, 
    animateContact 
} = useAboutAnimations(changeNavbarState);
</script>
<template>
    <div class="About" id="smooth-wrapper">
        <Transition name="move" mode="out-in" appear @enter="loadingEnter" @leave="loadingLeave">
            <section class="d-flex-center fixed top-0 z-90 h-full w-full" v-show="!finishloading" id="about-loading">
                <div class="d-flex-center z-91 container mx-auto h-full sm:px-4" id="about-loadinglogo">
                    <IconMosLogo class="h-24 w-72 fill-black" />
                </div>
                <div class="about-loadingbg bg-main-orange absolute h-[300vh] w-[150vw] rounded-full"></div>
            </section>
        </Transition>
        <main class="bg-main-black" :class="{'no-scroll': noScroll}" ref="imgContainer">
            <div class="about-herointro duration-500" :class="{ 'bg-stone-100': !store.navbardarkmode, 'bg-main-black': store.navbardarkmode }">
                <AboutHero />
                <AboutIntro />
            </div>
            <AboutExp />
            <AboutSkill />
            <AboutContact />
        </main>
    </div>
</template>

<style scoped>
@keyframes rotation {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@keyframes gearRotation {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(25deg);
    }
}
.icon-gear {
    /* animation: gearRotation 1s cubic-bezier(0.075, 0.82, 0.165, 1) infinite; */
    animation: rotation 10s linear infinite;
}
.no-scroll {
    height: 100vh;
    overflow: hidden;
}

</style>
