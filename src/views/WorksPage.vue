<script setup>
import { ref, onMounted, onBeforeUnmount, onUnmounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import Back2Top from "@/components/ui/back2Top.vue";
import FooterItem from "@/components/FooterItem.vue";
import WorksData from "@/data/WorksData.json";

// Return Real route
const imgLocation = (item) => {
    return "../src/img/" + item;
};
const lazyPics = ref([]);
let ctx;
let matchmedia = gsap.matchMedia();
onMounted(() => {
    // Preloading status
    function loaded(img) {
        if (img instanceof HTMLImageElement) {
            // is HTMLImageElement, for some reason will escape addEvetlis and enter loaded() directly.
            img.classList.add("loaded");
        } else {
            // is Object Event
            img.target.classList.add("loaded");
        }
    }
    lazyPics.value.forEach(function (img) {
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
        const herotl = gsap.timeline({ defaults: { ease: "back.inOut(1.7)", duration: 0.8 } });
        herotl.from(".card", { opacity: 0, yPercent: 65, scaleY: 1.1, scaleX: 0.95, stagger: 0.05 });
        herotl.from(".work-mobile-title", { opacity: 0, yPercent: 65, stagger: 0.05 }, 0.1);
    });
});
onBeforeUnmount(() => {
    const herotl = gsap.timeline({});
    // herotl.to(".card", { xPercent: -250, scaleY: 0.4, ease: "back.inOut(1.7)", duration: 0.8, stagger: 0.02 });
    herotl.to(".work-mobile-title", { xPercent: -150, ease: "back.inOut(1.7)", duration: 0.5, stagger: 0.2 }, 0.2);
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
                            <img
                                class="lazy left-0 min-h-[110%] w-auto object-cover group-hover:scale-105"
                                :src="imgLocation(item.img_md[0])"
                                :alt="item.name"
                                ref="lazyPics"
                            />
                        </figure>
                        <!-- desktop title -->
                        <div class="opacity-0 duration-500 group-hover:opacity-100">
                            <div class="works-black absolute bottom-0 h-1/5 w-full overflow-hidden duration-500 group-hover:h-3/5"></div>
                            <div
                                class="works-destop-title absolute bottom-0 hidden w-full px-5 text-white duration-500 group-hover:bottom-4 lg:block"
                            >
                                <h4 class="mb-3">{{ item.en_name }}</h4>
                                <p class="mb-0">{{ item.date }}</p>
                            </div>
                        </div>
                    </router-link>
                    <!-- mobile title -->
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
