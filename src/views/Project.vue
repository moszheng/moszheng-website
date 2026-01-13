<script setup>
import { ref, onMounted, onBeforeUnmount, onUnmounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import Back2Top from "@/components/ui/back2Top.vue";
import FooterItem from "@/components/FooterItem.vue";
import WorksData from "@/data/WorksData.json";
import LazyImage from "@/components/ui/LazyImage.vue";
import { useProjectAnimations } from "@/composables/useProjectAnimations";

// Return Real route
const imgLocation = (item) => {
    return "../src/img/" + item;
};
let ctx;
let matchmedia = gsap.matchMedia();
const { setupDesktopAnimations, animateHero, animateLeave } = useProjectAnimations();

onMounted(() => {
    // ScrollTrigger setup
    setupDesktopAnimations(matchmedia);
    
    /* ------------Main GSAP Animation----------*/
    ctx = gsap.context((self) => {
        animateHero();
    });
});
onBeforeUnmount(() => {
    animateLeave();
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
</script>
<template>
    <div class="works">
        <main class="container mx-auto mt-12 overflow-hidden pt-10 sm:px-4">
            <section class="mx-1 columns-1 gap-4 md:mx-0 lg:columns-3">
                <div v-for="(item, index) in WorksData.project" :key="index" class="group w-full px-4 lg:mb-4 lg:px-0">
                    <router-link
                        :to="{ name: 'WorksItem', params: { projecturl: item.url_name } }"
                        :title="item.name"
                        class="card relative mb-3 flex min-w-0 flex-col overflow-hidden bg-gray-400 text-white lg:mb-0"
                        :style="randomHeight(index)"
                    >
                        <figure class="parallax absolute h-full">
                            <LazyImage
                                class="left-0 min-h-[110%] w-auto object-cover group-hover:scale-105"
                                :src="imgLocation(item.img_md[0])"
                                :alt="item.name"
                            />
                        </figure>
                        <div class="opacity-0 duration-500 group-hover:opacity-100">
                            <div class="works-black absolute bottom-0 h-1/5 w-full overflow-hidden duration-500 group-hover:h-3/5"></div>
                            <div
                                class="works-desktop-title absolute bottom-0 hidden w-full px-5 text-white duration-500 group-hover:bottom-4 lg:block"
                            >
                                <h4 class="mb-3">{{ item.en_name }}</h4>
                                <p class="mb-0">{{ item.date }}</p>
                            </div>
                        </div>
                    </router-link>
                    <div class="work-mobile-title mb-3 px-1 lg:hidden">
                        <h4 class="mb-1 text-stone-950">{{ item.en_name }}</h4>
                        <p>{{ item.date }}</p>
                    </div>
                </div>
            </section>
            <Back2Top />
        </main>
        <FooterItem />
    </div>
</template>
