<script setup>
import {ref, computed} from 'vue'
import {useNavStore} from '@/stores/navstore'
import gsap from 'gsap'

import LinkData from '@/data/LinkData.json'

/* ---------- Color mode --------*/
const store = useNavStore();

// update Darkmode
const colormode = computed(() => {
    // console.log(store.navbardarkmode)
    return store.navbardarkmode ? 'fill:#FFF; color:#FFF;' : 'fill:#000; color:#000;';
});

/* Click toggle than Change BG */
const ChangBGtoggle = ref(false);
const ChangBG = () => {
    ChangBGtoggle.value = !ChangBGtoggle.value
    const h = document.getElementsByTagName('header')[0]

    if (ChangBGtoggle.value) { 
        h.style.backgroundColor = "#FFF";
        store.navbardarkmode = false;
    }
    else { 
        h.style.backgroundColor = "hsla(0, 0%, 100%, 0)";
        // store.navbardarkmode = true;
    }
}

/* Nav Bar social */
const showIcon = ref(false);

const rotateButton = () => {
    showIcon.value = !showIcon.value;
    // motion
    gsap.to('#icon_plus', {
        rotation: '+=135',
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
            // button.style.transform = 'none';
        },
    });
};

/* Enter animation */
function onBeforeEnter(el) {
    gsap.set(el, {
        // x: 40 - el.dataset.index * 5,
        width: 0,
        opacity: 0,
    });
};
function onEnter(el, done) {
    gsap.to(el, {
        width: '4.5vh',
        duration: 1,
    });
    gsap.to(el, {
        delay: 0.5 - 0.1 * el.dataset.index,
        opacity: 1,
        duration: 1,
        onComplete: done,
    });
};
function onLeave(el, done) {
    gsap.to(el, {
        delay: 0.2 - 0.05 * el.dataset.index,
        opacity: 0,
        duration: 1,
    });
    gsap.to(el, {
        // delay: 0.1 * el.dataset.index,
        width: 0,
        opacity: 0,
        duration: 1,
        onComplete: done,
        // ease: 'elastic.inOut(1.5, 1)' // amp, duration
    });
};
</script>

<template>
<header class="sticky-top">
    <nav class="container navbar navbar-expand-lg flex-wrap flex-lg-nowrap">
        <div class="container-fluid">
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
            <button @click="ChangBG" class="navbar-toggler collapsed d-flex d-lg-none flex-column justify-content-around" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="toggler-icon top-bar">
                    <svg id="icon_twitter" :style="colormode">
                        <use xlink:href="#icon-line"></use>
                    </svg>
                </span>
                <span class="toggler-icon mid-bar">
                    <svg id="icon_twitter" :style="colormode">
                        <use xlink:href="#icon-line"></use>
                    </svg>
                </span>
                <span class="toggler-icon bot-bar">
                    <svg id="icon_twitter" :style="colormode">
                        <use xlink:href="#icon-line"></use>
                    </svg>
                </span>
            </button>
            <!-- Canvas -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!--   flex-wrap  -->
                <div class="d-flex ms-md-auto">
                    <ul class="navbar-nav mx-lg-4">
                        <li class="nav-item d-flex align-items-center">
                            <router-link :to="{ name : 'WorksPage' }" class="nav-link px-2 me-md-4" :style="colormode">Works</router-link>
                        </li>
                        <li class="nav-item d-flex align-items-center">
                            <router-link :to="{ name : 'Showreel' }" class="nav-link px-2 me-md-4" :style="colormode">Showreel</router-link>
                        </li>
                        <li class="nav-item d-flex align-items-center">
                            <router-link :to="{ name : 'About' }" class="nav-link px-2 me-md-4" :style="colormode">About</router-link>
                        </li>
                        <li class="nav-item d-flex align-items-center">
                            <router-link :to="{ name : 'Contact' }" class="nav-link px-2 me-md-4" :style="colormode">Contact</router-link>
                        </li>
                        <li class="nav-item d-flex align-items-center">
                            <!--   icons  -->
                            <div class="navbar-nav flex-row flex-wrap ms-md-auto">
                                <TransitionGroup
                                    @before-enter="onBeforeEnter"
                                    @enter="onEnter"
                                    @leave="onLeave"
                                >
                                    <div v-for="(item, index) in LinkData.socialmedia" v-show="showIcon" :key="item.url" :data-index="index" class="nav-item col col-md-auto">
                                        <a class="nav-link nav-link link-dark px-lg-2 mx-1" :href="item.url" target="_blank" rel="noopener">
                                            <svg id="icon_twitter" :style="colormode">
                                                <use :xlink:href="item.icon"></use>
                                            </svg>
                                        </a>
                                    </div>
                                </TransitionGroup>
                            </div>
                            <button class="toggler-icon-xl px-2 py-2" type="button" @click="rotateButton">
                                <svg id="icon_plus" :style="colormode">
                                    <use xlink:href="#icon-plus"></use>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
             </div>
        </div>
    </nav>
<!-- <div class="border-bottom"></div> -->
</header>
</template>
<style>
header  {
  background-color: hsla(0, 0%, 100%, 0);
  transition: .5s ease;
}

#mos-logo {
    width: 150px;
    height: 100px;
    transition: .8s ease;
}
.nav-link, .icon_plus{
    transition: .8s ease;
}
/*-------- nav bar toggler icon------*/
.navbar-toggler{
  width: 20px;
  height: 20px;
  position: relative;
  transition: .5s ease-in-out;
}

.toggler-icon-xl{
    background: none;
}
/*Cancel default outline*/
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
  transform: rotate(0deg);
  transition: .25s ease-in-out;
}
.middle-bar {
  margin-top: 0px;
}

/*-----*/
.navbar-toggler .top-bar{
  margin-top: 0px;
  transform: rotate(135deg);
}
.navbar-toggler .mid-bar{
  opacity: 0;
  filter: alpha(opacity=0);
}
.navbar-toggler .bot-bar{
  margin-top: 0px;
  transform: rotate(-135deg);
}
/*-----*/
.navbar-toggler.collapsed .top-bar{
  margin-top: -15px;
  transform: rotate(0deg);
}
.navbar-toggler.collapsed .mid-bar{
  opacity: 1;
  filter: alpha(opacity=100);
}
.navbar-toggler.collapsed .bot-bar{
  margin-top: 15px;
  transform: rotate(0deg);
}
</style>
