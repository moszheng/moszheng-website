<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useNavStore } from '@/stores/navstore';
import gsap from 'gsap';

import NavLink from './NavbarLink.vue';
import LinkData from '@/data/LinkData.json';

/* ---------- Color mode --------*/
const store = useNavStore();
const route = useRoute();

// update Darkmode
const colormode = computed(() => {
    return store.navbardarkmode ? 'fill:#FFF; color:#FFF;' : 'fill:#000; color:#000;';
});

let navctx;
onMounted(() => {
    // Scroll movement
    window.addEventListener('scroll', handleScroll);

    /* ---------- Enter Motion ----------- */
    navctx = gsap.context((self) => {
        const herotl = gsap.timeline({});
        herotl.from(".navbar-brand", { yPercent: -75, ease: "back.inOut(1.7)", duration: .8 }, 0);
    });
});

/* --- Scroll Folder ---- */
const navfolder = ref(false);
let lastPos = 0;
let deltaPos = 0;
const handleScroll = () => {
    const currentPos = window.scrollY;
    deltaPos = currentPos - lastPos;
    if (deltaPos > 10 && navfolder.value==false) {
        navfolder.value=true;
        gsap.to('.navcontainer', { yPercent: -90, duration: .5, ease: 'back.inOut(1.7)' });
    }
    else if (deltaPos < 0 && navfolder.value==true) {
        navfolder.value=false;
        gsap.to('.navcontainer', { yPercent: 0, duration: .75, ease: 'back.inOut(1.7)' });
    }
    lastPos = currentPos;
};
/* Toggle Nav BG */

const navbarExpand = () => {
    const tl = gsap.timeline({ defaults: { overwrite: true, ease: "power3.Out" } });
    const outtl = gsap.timeline({ defaults: { overwrite: true, ease: "power3.Out" } });

    const navContainer = document.querySelector(".navcontainer");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const darkOverlay = document.querySelector(".dark-overlay");
    const navItems = document.querySelectorAll(".nav-item");

    store.isNavbarExpanded = !store.isNavbarExpanded;

    if (store.isNavbarExpanded) {
        store.navbardarkmode = false; // insure homepage
        /* Button */
        tl.to(".top-bar", { rotation: 135, y: "6px", duration: .25 }, 0);
        tl.to(".mid-bar", { opacity: .5, scaleX: 0, duration: .2 }, 0);
        tl.to(".bot-bar", { rotation: -135, y: "-6px", duration: .25 }, 0);
        /* collapse */
        tl.to(navbarCollapse, { height: "50vh", ease: "back.Out(1.7)", duration: .5 }, 0.01);
        /* -- bg -- */
        tl.to(navContainer, { backgroundColor: 'rgba(255, 255, 255, 1)', duration: 0.3 }, 0.05);
        tl.to(darkOverlay, { autoAlpha: 0.7, duration: 1 }, 0);
        /* -Links-- */
        tl.fromTo(navItems,
            { xPercent: 60, autoAlpha: 0 },
            { xPercent: 0, autoAlpha: 1, ease: "back.inOut(1.7)", duration: 1, stagger: 0.04 }, 0);
    } else {
        /* Button */
        outtl.to(".top-bar", {
            keyframes: {
                "0%": { rotation: 135 },
                "45%": { y: "6px" },
                "100%": { rotation: 360, y: 0 },
                ease: "none",
            },
            duration: .3 }, 0);
        outtl.to(".mid-bar", { opacity: 1, scaleX: 1, duration: .25 }, 0.01);
        outtl.to(".bot-bar", {
            keyframes: {
                "0%": { rotation: -135 },
                "45%": { y: "-6px" },
                "100%": { rotation: -360, y: 0 },
                ease: "none",
            },
            duration: .3 }, 0);
        /* -Links-- */
        outtl.to(navItems, { xPercent: 60, autoAlpha: 0, ease: "back.inOut(1.7)", duration: .5, stagger: 0.04, onComplete: navComplete }, 0);
        /* -- bg -- */
        outtl.to(navContainer, { backgroundColor: 'rgba(255, 255, 255, 0)', ease: "power3.inOut", duration: 0.4 }, 0.5);
        outtl.to(darkOverlay, { autoAlpha: 0, ease: "power3.inOut", duration: 0.7 }, 0.3);
        /* collase */
        outtl.to(navbarCollapse, { height: 0, ease: "back.inOut(1.7)", duration: 0.5 }, 0.4);
    }
};
const navComplete = () => {
    if (route.name == "Home") {
        store.navbardarkmode = true; // insure homepage
    } else {
        store.navbardarkmode = false;
    }
};
/* Nav Bar social */
const showIcon = ref(false);

const rotateButton = () => {
    showIcon.value = !showIcon.value;
    const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
    // motion
    tl.to('#icon-plus-area', { rotation: '+=135', duration: 0.5, ease: 'elastic.Out' });
    tl.from('#icon-plus-area', { scale: 0.8, duration: 1.4, ease: 'elastic.out(1,0.3)' }, 0.1);
};

/* icon_social Enter animation */
function onBeforeEnter(el) {
    gsap.set(el, { width: 0, autoAlpha: 0, scale: 0.1 });
};
function onEnter(el, done) {
    const delay = 0.2 - 0.05 * el.dataset.index;
    gsap.to(el, { width: '45px', autoAlpha: 1, scale: 1, duration: 0.5, delay: delay, ease: "back.Out(2.5)" });
};
function onLeave(el, done) {
    const delay = 0.2 - 0.05 * el.dataset.index;
    gsap.to(el, { width: 0, autoAlpha: 0, scale: 0.5, duration: 1, delay: delay, ease: "back.inOut(1.7)" });
};
</script>

<template>
    <header class="relative flex flex-wrap items-center content-between py-3 px-4 lg:flex-no-wrap">
        <div class="navcontainer z-[100] flex flex-wrap fixed items-center justify-between w-full max-w-full top-0 left-0 mx-auto lg:px-16 px-6 pt-2 xl:pb-2 pb-6">
            <!-- LOGO -->
            <router-link :to="{ name : 'Home' }" class="navbar-brand flex justify-center py-2 pr-4 mr-4 text-2xl" aria-current="page">
                <Transition name="fade" mode="out-in">
                    <svg id="mos-logo" :style="colormode">
                        <use xlink:href="#icon-mosLogo"></use>
                    </svg>
                </Transition>
            </router-link>
            <!-- navbar responsive button -->
            <button @click="navbarExpand" class="navbar-toggler relative w-6 h-6 lg:hidden leading-normal bg-transparent collapsed" type="button">
                <span class="toggler-icon -mt-1.5 top-bar">
                    <svg id="icon_collapse" :style="colormode">
                        <use xlink:href="#icon-line"></use>
                    </svg>
                </span>
                <span class="toggler-icon mid-bar">
                    <svg id="icon_collapse" :style="colormode">
                        <use xlink:href="#icon-line"></use>
                    </svg>
                </span>
                <span class="toggler-icon mt-1.5 bot-bar">
                    <svg id="icon_collapse" :style="colormode">
                        <use xlink:href="#icon-line"></use>
                    </svg>
                </span>
            </button>
            <!-- Canvas -->
            <div class="navbar-collapse">
                <ul class="lg:h-10 h-0 lg:flex flex-wrap flex-grow lg:flex-row flex-col items-center pl-0 mb-0 lg:mt-0 mt-8 md:ml-auto lg:space-y-0 space-y-5" :style="colormode">
                    <NavLink :to="'Works'"/>
                    <NavLink :to="'Showreel'"/>
                    <NavLink :to="'About'" />
                    <NavLink :to="'Contact'"/>
                    <li class="nav-item navtext flex items-center">
                        <div class="flex flex-wrap flex-row xl:ms-auto">
                            <TransitionGroup
                                @before-enter="onBeforeEnter"
                                @enter="onEnter"
                                @leave="onLeave"
                            >
                                <li class="w-1/5 col-md-auto" v-for="(item, index) in LinkData.socialmedia" v-show="showIcon" :key="item.url" :data-index="index" >
                                    <a class="inline-block no-underline" :href="item.url" target="_blank" rel="noopener">
                                        <svg id="icon_social" :style="colormode">
                                            <use :xlink:href="item.icon"></use>
                                        </svg>
                                    </a>
                                </li>
                            </TransitionGroup>
                        </div>
                        <button class="toggler-icon-xl p-2" type="button" @click="rotateButton">
                            <svg class="size-7" id="icon-plus-area" :style="colormode">
                                <use xlink:href="#icon-plus"></use>
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="dark-overlay fixed invisible z-[60] top-0 left-0 w-full h-full bg-black"></div>
    </header>
</template>
<style scoped>
/* Mobile */
@media only screen and (max-width: 1024px) {
    .navbar-collapse {
        flex-basis: 100%;
    }
    .nav-item{
        visibility: hidden;
    }
}
.navcontainer  {
    background-color: rgba(255, 255, 255, 0);
}
#mos-logo {
    width: 150px;
    height: 1.5em;
    transition: .8s ease;
}
/*-------- nav bar toggler icon------*/
.toggler-icon{
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  opacity: 1;
  left: 0;
}
</style>
