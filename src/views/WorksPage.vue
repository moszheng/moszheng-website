<script setup>
import {ref, onMounted, onBeforeUnmount, onUnmounted} from 'vue';
import Masonry from 'masonry-layout';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import FooterItem from '@/components/FooterItem.vue';
import WorksData from '@/data/WorksData.json';

// Return Real route
const imgLocation = (item) => {return '../src/img/'+ item;};
const lazyloadimgs = ref(document.querySelectorAll('.lazy'));
let ctx;
onMounted(() => {
    // initialize masonry
    const row = document.querySelector("[data-masonry]");
    new Masonry(row, {
        percentPosition: true,
    });
    // Preloading status
    lazyloadimgs.value = document.querySelectorAll('.lazy');
    function loaded(img) {
        if (img instanceof HTMLImageElement) {
            // is HTMLImageElement, for some reason will escape addEvetlis and enter loaded() directly.
            img.classList.add("loaded");
        } else {
            // is Object Event
            img.target.classList.add("loaded");
        }
    }
    lazyloadimgs.value.forEach(function(img) {
        if (img.complete) {
            loaded(img);
        } else {
            img.addEventListener("load", loaded);
        }
    });
    /* ------------Main GSAP Animation----------*/
    ctx = gsap.context((self) => {
        /* ----------- Depth --------------- */
        const depthtl = gsap.timeline({
            scrollTrigger: {
                trigger: ".works",
                start: "clamp(top top)",
                end: "bottom 30%",
                // markers: true,
                scrub: true,
            },
        });
        gsap.utils.toArray(".parallax").forEach((layer, index) => {
            const rand = [1, 0.75, 0.6];
            const movement = -4 * rand[index % 3];
            depthtl.to(layer, {yPercent: movement, ease: "none"}, 0);
        });
        /* ---------- Enter ---------- */
        const herotl = gsap.timeline({});
        herotl.from(".card", {
            opacity: 0, yPercent: 65, scaleY: 1.1, scaleX: 0.95,
            ease: "back.inOut(1.7)", duration: 0.8, stagger: 0.05,
        });
    });
});
onBeforeUnmount(() => {
    const herotl = gsap.timeline({});
    herotl.to(".card", {xPercent: -250, scaleY: 0.4, ease: "back.inOut(1.7)", duration: 0.8, stagger: 0.05});
});
onUnmounted(() => {
    ctx.revert();
});

function randomHeight(index) {
    if (window.screen.width > 960) {
        const rndarray = [50, 35, 45, 45, 30];
        return `height: ${ rndarray[index%5] }dvh`;
    } else {
        return `height: 30dvh`;
    }
};

function scrolltop() {
    window.scrollTo(0, 0);
}

</script>
<template>
<div class="works">
    <main class="container flex-xl-nowrap mt-4 pt-5">
        <div class="row pt-5" data-masonry='{"percentPosition": true }'>
            <div v-for="(item, index) in WorksData.project" :key="index" class="col-lg-4 col">
                <div class="card mb-xl-4 mb-3 text-white" :style="randomHeight(index)">
                    <router-link :to="{ name : 'WorksItem' , params : { projecturl: item.url_name } }" :title="item.name">
                        <!-- replaceimg -->
                        <div class="img-fluid">
                            <img :src=imgLocation(item.img_md[0]) class="card-img parallax lazy" :alt="item.name">
                        </div>
                        <div class="works-black"></div>
                        <div class="works-text text-white px-4">
                            <h4 class="card-title">{{ item.en_name }}</h4>
                            <p class="card-text">{{ item.date }}</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="container-fluid text-center">
            <a @click = "scrolltop" class="nav-link p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chevron-compact-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"/>
                </svg>
                <p>BACK TO TOP</p>
            </a>
        </div>
    </main>
<FooterItem />
</div>
</template>

<style scoped>
.card{
    background-color: rgb(235, 235, 235);
}
</style>

