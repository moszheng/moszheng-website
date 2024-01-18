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
        gsap.to('.navbar', { top: -90, duration: .5, ease: 'back.inOut(1.7)' });
    }
    else if (deltaPos < 0 && navfolder.value==true) {
        navfolder.value=false;
        gsap.to('.navbar', { top: 0, duration: .75, ease: 'back.inOut(1.7)' });
    }
    lastPos = currentPos;
};
/* Toggle Nav BG */
const navbarExpand = () => {
    const tl = gsap.timeline({ defaults: { overwrite: true } });
    const outtl = gsap.timeline({ defaults: { overwrite: true } });
    store.isNavbarExpanded = !store.isNavbarExpanded;
    if (store.isNavbarExpanded) {
        store.navbardarkmode = false; // insure homepage
        /* Button */
        tl.to(".top-bar", { rotation: 135, y: "8px", ease: "power3.Out", duration: .25 }, 0);
        tl.to(".mid-bar", { opacity: 0, scaleX: 0.4, ease: "power3.Out", duration: .25 }, 0);
        tl.to(".bot-bar", { rotation: -135, y: "-8px", ease: "power3.Out", duration: .25 }, 0);
        /* collapse */
        tl.to(".navbar-collapse", { height: 300, ease: "back.Out(1.7)", duration: .5 }, 0.01);
        /* -- bg -- */
        tl.to(".navcontainer", { backgroundColor: 'rgba(255, 255, 255, 1)', ease: "power3.inOut", duration: 0.3 }, 0.05);
        tl.to(".dark-overlay", { autoAlpha: 0.7, ease: "power3.inOut", duration: 1 }, 0);
        /* -Links-- */
        tl.fromTo(".nav-item",
            { xPercent: 60, autoAlpha: 0 },
            { xPercent: 0, autoAlpha: 1, ease: "back.inOut(1.7)", duration: 1, stagger: 0.04 }, 0);
    } else {
        /* Button */
        outtl.to(".top-bar", {
            keyframes: {
                "0%": { rotation: 135, y: "8px" },
                "50%": { y: 0 },
                "100%": { rotation: 360, y: 0 },
                ease: "none",
            },
            ease: "power3.Out", duration: .3 }, 0.001);
        outtl.to(".mid-bar", { opacity: 1, scaleX: 1, ease: "power3.Out", duration: .25 }, 0.001);
        outtl.to(".bot-bar", {
            keyframes: {
                "0%": { rotation: -135, y: "-8px" },
                "50%": { y: 0 },
                "100%": { rotation: 360, y: 0 },
                ease: "none",
            },
            ease: "power3.Out", duration: .3 }, 0.001);
        /* -Links-- */
        outtl.to(".nav-item", { xPercent: 60, autoAlpha: 0, ease: "back.inOut(1.7)", duration: .5, stagger: 0.04 }, 0);
        /* -- bg -- */
        outtl.to(".navcontainer", { backgroundColor: 'rgba(255, 255, 255, 0)', ease: "power3.inOut", duration: 0.4 }, 0.5);
        outtl.to(".dark-overlay", { autoAlpha: 0, ease: "power3.inOut", duration: 0.7 }, 0.3);
        /* collase */
        outtl.to(".navbar-collapse", { height: 0, ease: "back.inOut(1.7)", duration: 0.5 }, 0.4);
        if (route.name == "Home") {
            store.navbardarkmode = true; // insure homepage
        } else {
            store.navbardarkmode = false;
        }
    }
};
/* Nav Bar social */
const showIcon = ref(false);

const rotateButton = () => {
    showIcon.value = !showIcon.value;
    const tl = gsap.timeline();
    // motion
    tl.to('#icon-plus-area', { rotation: '+=135', duration: 0.8, ease: 'elastic.Out' });
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
<header class="position-absolute w-100 top-0">
    <nav class="navbar navbar-expand-lg flex-wrap flex-lg-nowrap">
        <div class="navcontainer container-fluid px-6 pt-2 pb-xl-2 pb-4">
            <!-- LOGO -->
            <div class="navbar-brand flex-column flex-md-row align-items-center">
                <router-link :to="{ name : 'Home' }" class="nav-link link-dark active" aria-current="page">
                    <Transition name="fade" mode="out-in">
                        <svg id="mos-logo" :style="colormode">
                            <use xlink:href="#icon-mosLogo"></use>
                        </svg>
                    </Transition>
                </router-link>
            </div>
            <!-- navbar responsive button -->
            <button @click="navbarExpand" class="navbar-toggler collapsed" type="button">
                <span class="toggler-icon top-bar">
                    <svg id="icon_collapse" :style="colormode">
                        <use xlink:href="#icon-line"></use>
                    </svg>
                </span>
                <span class="toggler-icon mid-bar">
                    <svg id="icon_collapse" :style="colormode">
                        <use xlink:href="#icon-line"></use>
                    </svg>
                </span>
                <span class="toggler-icon bot-bar">
                    <svg id="icon_collapse" :style="colormode">
                        <use xlink:href="#icon-line"></use>
                    </svg>
                </span>
            </button>
            <!-- Canvas -->
            <div class="navbar-collapse" id="navbarSupportedContent">
                <!--   flex-wrap  -->
                <div class="d-flex ms-md-auto">
                    <ul class="navbar-nav" :style="colormode">
                        <NavLink :to="'Works'"/>
                        <NavLink :to="'Showreel'"/>
                        <NavLink :to="'About'" />
                        <NavLink :to="'Contact'"/>
                        <li class="nav-item navtext d-flex align-items-center">
                            <!--   icons  -->
                            <div class="navbar-nav flex-row flex-wrap ms-xl-auto">
                                <TransitionGroup
                                    @before-enter="onBeforeEnter"
                                    @enter="onEnter"
                                    @leave="onLeave"
                                >
                                    <li class="nav-item col-2 col-md-auto" v-for="(item, index) in LinkData.socialmedia" v-show="showIcon" :key="item.url" :data-index="index" >
                                        <a class="nav-link p-2" :href="item.url" target="_blank" rel="noopener">
                                            <svg id="icon_social" :style="colormode">
                                                <use :xlink:href="item.icon"></use>
                                            </svg>
                                        </a>
                                    </li>
                                </TransitionGroup>
                            </div>
                            <button class="toggler-icon-xl px-2 py-2" type="button" @click="rotateButton">
                                <svg id="icon-plus-area" :style="colormode">
                                    <use xlink:href="#icon-plus"></use>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
             </div>
        </div>
        <div class="dark-overlay top-0 start-0 w-100 h-100"></div>
    </nav>
<!-- <div class="border-bottom"></div> -->
</header>
</template>
<style scoped>
@media only screen and (max-width: 1025px) {
    .nav-item{
        visibility: hidden;
    }
}
.navcontainer  {
    z-index: 50;
    background-color: rgba(255, 255, 255, 0);
}
.navbar-collapse {
    height: 0;
    /* display: none; */
}
.dark-overlay {
    position: fixed;
    z-index: 2;
    background-color: #000;
    visibility: hidden;
}
#mos-logo {
    width: 150px;
    height: 100px;
    transition: .8s ease;
}
/*-------- nav bar toggler icon------*/
.navbar-toggler{
  width: 20px;
  height: 20px;
  position: relative;
  /* transition: .5s ease-in-out; */
}
.toggler-icon-xl{
    background: none;
}
/*--- Cancel default outline ----*/
.toggler-icon-xl,
.navbar-toggler,
.navbar-toggler:focus,
.navbar-toggler:active,
.navbar-toggler-icon:focus{
  outline: none;
  box-shadow: none;
  border: 0;
}
.navbar-toggler span {
  margin: 0;
  padding: 0;
}
.toggler-icon{
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  opacity: 1;
  left: 0;
}
/*-----*/
.navbar-toggler.collapsed .top-bar{
  margin-top: -8px;
}
.navbar-toggler.collapsed .bot-bar{
  margin-top: 8px;
}
</style>
