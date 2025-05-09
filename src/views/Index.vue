<script setup>
import { ref, onMounted } from "vue";
import { splitPara, splitText } from "@/module/SplitText.js";
import ExpData from "@/data/Experience.json";
import gsap from "gsap";
import Player from "@vimeo/player";

import IconMosLogo from "@/assets/icon/IconMosLogo.vue";

// Loading Page
const finishloading = ref(false);

onMounted(() => {
    // Vimeo API
    const iframe = document.querySelector("iframe");
    const player = new Player(iframe);

    player.on("progress", function (data) {
        // console.log(data)
        if (data.percent > 0.1) {
            finishloading.value = true;
        }
    });
});

/* Transition GSAP */
const beforeEnter = (el) => {
    el.style.opacity = 0;
};
const onEnter = (el, done) => {
    gsap.to(el, { opacity: 1, duration: 1, ease: "power3.Out", onComplete: done });
};
/* Loading */
const loadingLeave = (el, done) => {
    const tl = gsap.timeline();
    tl.to("#index-logo", { filter: "blur(60px)", fill: "#FFF", duration: 2, ease: "power3.Out" }, 0.7);
    tl.to(el, { opacity: 0, duration: 0.75, ease: "power3.Out", onComplete: done, onStart: indexmotion }, 1);
};
/* ---------- Enter ---------- */
const indexmotion = () => {
    const tl = gsap.timeline({ defaults: { ease: "back.inOut(1.7)", duration: 0.8 } });
    tl.from("#index-name", { opacity: 0, yPercent: 65, stagger: 0.05 }, 0.1);
    tl.from("#index-text", { opacity: 0, yPercent: 20, stagger: 0.02 }, 0.6);
    tl.from(".index-btnarea", { opacity: 0, yPercent: 65 }, 1.1);
};
</script>

<template>
    <main class="index">
        <!-- Loading Page -->
        <Transition name="move" mode="out-in" @before-enter="beforeEnter" @enter="onEnter" @leave="loadingLeave">
            <div class="index-loading absolute top-0 z-20 h-full w-full bg-white" v-show="!finishloading">
                <div class="d-flex-center container mx-auto h-full sm:px-4">
                    <IconMosLogo class="h-[14vh] w-[21vh]" id="index-logo" />
                </div>
            </div>
        </Transition>
        <!----- BG ----->
        <div class="index-bgcover absolute top-0 left-0 h-screen w-screen overflow-hidden object-cover">
            <iframe
                class="absolute aspect-video min-h-full min-w-full bg-black"
                src="https://player.vimeo.com/video/881388756?background=1&amp;muted=1&amp;loop=3&amp"
            >
            </iframe>
        </div>
        <!--  Intro ---->
        <div class="index-info absolute top-0 z-10 h-full w-full">
            <div class="container mx-auto flex h-full items-center justify-center sm:px-4 xl:justify-end">
                <!----- Main Content----->
                <div class="px-4 text-white lg:px-0">
                    <h5 class="mb-2" id="index-name">Freelance 3D Generalist</h5>
                    <h2 class="mb-12 inline-block overflow-hidden pb-1 lg:mb-10">
                        <span v-for="(text, index) in splitText(ExpData.index.title)" :key="index" class="inline-flex pe-2 xl:pe-4">
                            <span class="inline-block font-bold" id="index-name"> {{ text }} </span>
                        </span>
                    </h2>
                    <div class="mb-12 max-w-[48rem] space-y-4 lg:mb-10">
                        <h5 v-for="(textarray, indexz) in splitPara(ExpData.index.content)" :key="indexz" class="intro-info leading-normal">
                            <span v-for="(text, index) in textarray" :key="index" class="inline-block pe-2">
                                <span class="inline-block" id="index-text"> {{ text }} </span>
                            </span>
                        </h5>
                    </div>
                    <div class="index-btnarea">
                        <router-link :to="{ name: 'Works' }">
                            <button type="button" class="index-btn inline-block rounded-lg px-3 py-1 text-xl leading-normal duration-300 select-none">
                                Explore
                            </button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
/* Mobile */
@media only screen and (max-width: 1025px) {
    .index-btnarea {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .index-btn {
        width: 90vw;
    }
}
.index-btn {
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    background-color: hsla(0, 0%, 95.3%, 0.25);
    min-width: 20vh;
    box-shadow: none;
    color: #fff;
}
.index-btn:hover {
    background-color: hsla(0, 0%, 95.3%, 0.6);
    color: #000;
}
.index-bgcover {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    filter: brightness(55%);
}
iframe {
    height: 60vw;
    width: 170vh;
    max-width: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    pointer-events: none;
}
</style>
