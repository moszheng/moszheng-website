<script setup>
import { ref, onMounted } from "vue";
import { splitPara, splitText } from "@/utils/SplitText.js";
import ExpData from "@/data/Experience.json";
import Player from "@vimeo/player";
import { useHomeAnimations } from "@/composables/useHomeAnimations";

import IconMosLogo from "@/assets/icon/IconMosLogo.vue";

// Loading Page
const finishloading = ref(false);
const loadingProgress = ref(0);
const iframeRef = ref(null);

onMounted(() => {
    // Vimeo API
    if (iframeRef.value) {
        const player = new Player(iframeRef.value);

        player.on("progress", function (data) {
            loadingProgress.value = Math.min(Math.round(data.percent * 100), 100);
            if (data.percent > 0.1) {
                finishloading.value = true;
            }
        });
    }
});

const { beforeEnter, onEnter, loadingLeave } = useHomeAnimations();
</script>

<template>
    <main class="index">
        <!-- Loading Page -->
        <Transition
            name="move"
            mode="out-in"
            @before-enter="beforeEnter"
            @enter="onEnter"
            @leave="loadingLeave"
        >
            <div
                class="index-loading absolute top-0 z-20 h-full w-full bg-white"
                v-show="!finishloading"
            >
                <div class="d-flex-center container mx-auto h-full sm:px-4 flex-col">
                    <IconMosLogo class="h-[14vh] w-[21vh] animate-pulse" id="index-logo" />
                    <!-- Progress Bar -->
                    <div class="w-[21vh] h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            class="h-full bg-main-orange transition-all duration-300 ease-out"
                            :style="{ width: loadingProgress + '%' }"
                        ></div>
                    </div>
                </div>
            </div>
        </Transition>
        <!----- BG ----->
        <div
            class="index-bgcover absolute top-0 left-0 h-screen w-screen overflow-hidden object-cover"
        >
            <iframe
                ref="iframeRef"
                class="absolute aspect-video min-h-full min-w-full bg-black"
                src="https://player.vimeo.com/video/881388756?background=1&amp;muted=1&amp;loop=3&amp"
            >
            </iframe>
        </div>
        <!--  Intro ---->
        <div class="index-info absolute top-0 z-10 h-full w-full">
            <div
                class="container mx-auto flex h-full items-center justify-center sm:px-4 xl:justify-end"
            >
                <!----- Main Content----->
                <div class="px-4 text-white lg:px-0">
                    <h5 class="mb-2" id="index-name">Freelance 3D Generalist</h5>
                    <h2 class="mb-12 inline-block overflow-hidden pb-1 lg:mb-10">
                        <span
                            v-for="(text, index) in splitText(ExpData.index.title)"
                            :key="index"
                            class="inline-flex pe-2 xl:pe-4"
                        >
                            <span class="inline-block font-bold index-name-text"> {{ text }} </span>
                        </span>
                    </h2>
                    <div class="mb-12 max-w-[48rem] space-y-4 lg:mb-10">
                        <h5
                            v-for="(textarray, indexz) in splitPara(ExpData.index.content)"
                            :key="indexz"
                            class="intro-info leading-normal"
                        >
                            <span
                                v-for="(text, index) in textarray"
                                :key="index"
                                class="inline-block pe-2"
                            >
                                <span class="inline-block index-text-span"> {{ text }} </span>
                            </span>
                        </h5>
                    </div>
                    <div class="index-btnarea">
                        <router-link :to="{ name: 'Works' }">
                            <button
                                type="button"
                                class="index-btn inline-block rounded-lg px-3 py-1 text-xl leading-normal duration-300 select-none"
                            >
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
