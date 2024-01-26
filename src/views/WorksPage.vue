<script setup>
import { ref, onMounted, onBeforeUnmount, onUnmounted } from "vue";
import Masonry from "masonry-layout";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import FooterItem from "@/components/FooterItem.vue";
import WorksData from "@/data/WorksData.json";

// Return Real route
const imgLocation = (item) => {
    return "../src/img/" + item;
};
const lazyloadimgs = ref(document.querySelectorAll(".lazy"));
let ctx;
let matchmedia = gsap.matchMedia();
onMounted(() => {
    // initialize masonry (breakpoint not work?)
    if (window.innerWidth > 1025) {
        const row = document.querySelector("[data-masonry]");
        new Masonry(row, {
            percentPosition: true,
        });
    }
    // Preloading status
    lazyloadimgs.value = document.querySelectorAll(".lazy");
    function loaded(img) {
        if (img instanceof HTMLImageElement) {
            // is HTMLImageElement, for some reason will escape addEvetlis and enter loaded() directly.
            img.classList.add("loaded");
        } else {
            // is Object Event
            img.target.classList.add("loaded");
        }
    }
    lazyloadimgs.value.forEach(function (img) {
        if (img.complete) {
            loaded(img);
        } else {
            img.addEventListener("load", loaded);
        }
    });
    matchmedia.add("(min-width: 1024px)", (context) => {
        /* ----------- Depth --------------- */
        gsap.utils.toArray(".parallax").forEach((layer, index) => {
            const rand = [1, 0.8, 0.7];
            const movement = -15 * rand[index % 3];
            gsap.to(layer, {
                scrollTrigger: {
                    trigger: ".works",
                    start: "clamp(top top)",
                    end: "bottom 30%",
                    // markers: true,
                    scrub: 0.75,
                },
                yPercent: movement,
                ease: "none",
            });
        });
    });
    /* ------------Main GSAP Animation----------*/
    ctx = gsap.context((self) => {
        /* ---------- Enter ---------- */
        const herotl = gsap.timeline({ defaults: { ease: "back.inOut(1.7)", duration: 0.8 } });
        herotl.from(".card", { opacity: 0, yPercent: 65, scaleY: 1.1, scaleX: 0.95, stagger: 0.05 });
        herotl.from(".work-mobile-title", { opacity: 0, yPercent: 65, stagger: 0.05 }, 0.1);
    });
});
onBeforeUnmount(() => {
    const herotl = gsap.timeline({});
    herotl.to(".card", { xPercent: -250, scaleY: 0.4, ease: "back.inOut(1.7)", duration: 0.8, stagger: 0.05 });
});
onUnmounted(() => {
    ctx.revert();
    matchmedia.revert();
});

function randomHeight(index) {
    if (window.screen.width > 960) {
        const rndarray = [50, 35, 45, 45, 30];
        return `height: ${rndarray[index % 5]}vh`;
    } else {
        return `height: 30vh`;
    }
}

function ScrollTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
}
</script>
<template>
<div class="works">
    <main class="container mx-auto mt-4 overflow-hidden pt-5 sm:px-4">
        <section class="mx-1 flex flex-wrap pt-5 md:mx-0" data-masonry='{"percentPosition": true }'>
            <div v-for="(item, index) in WorksData.project" :key="index" class="w-full px-4 lg:mb-4 lg:w-1/3 lg:px-2">
                <div class="card relative mb-3 flex min-w-0 flex-col bg-gray-600 text-white lg:mb-0" :style="randomHeight(index)">
                    <router-link :to="{ name: 'WorksItem', params: { projecturl: item.url_name } }" :title="item.name" class="d-flex-center h-full">
                        <!-- replace-image -->
                        <div class="parallax absolute h-full">
                            <img :src="imgLocation(item.img_md[0])" class="lazy left-0 min-h-[110%] w-auto object-cover" :alt="item.name" />
                        </div>
                        <!-- desktop title -->
                        <div class="works-black"></div>
                        <div class="works-destop-title px-5 text-white">
                            <h4 class="mb-3">{{ item.en_name }}</h4>
                            <p class="mb-0">{{ item.date }}</p>
                        </div>
                    </router-link>
                </div>
                <!-- mobile title -->
                <div class="work-mobile-title mb-3 px-1">
                    <h4 class="mb-1 break-keep">{{ item.en_name }}</h4>
                    <p>{{ item.date }}</p>
                </div>
            </div>
        </section>
        <div class="work-end mx-auto w-full max-w-full sm:px-4">
            <a @click="ScrollTop" class="d-flex-center flex-col p-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chevron-compact-up mb-1" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z" />
                </svg>
                <p class="text-sm">BACK TO TOP</p>
            </a>
        </div>
    </main>
    <FooterItem />
</div>
</template>
