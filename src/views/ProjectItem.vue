<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import ProjectItemInfo from "@/components/ProjectItem/ProjectItemInfo.vue";
import ProjectItemIntro from "@/components/ProjectItem/ProjectItemIntro.vue";
import Back2Top from "@/components/ui/back2Top.vue";
import FooterItem from "@/components/FooterItem.vue";
import WorksData from "@/data/WorksData.json";

// data initial
const props = defineProps({ projecturl: String });
const prjdata = ref("null");
const shuffleprj = ref("null");
prjdata.value = WorksData.project.find((item) => item.url_name == props.projecturl);
shuffleprj.value = WorksData.project
    .filter((item) => item.url_name !== prjdata.value.url_name)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3); // 2. shuffle array, pick top 3 item

// Transfer Data
// Other Project Random method

const videoEmbed = (item) => {
    if (item[0] == "vimeo") {
        return `https://player.vimeo.com/video/${item[1]}?h=6ea64f06ea&color=ffffff&title=0&byline=0&portrait=0`;
    } else if (item[0] == "youtube") {
        return `https://www.youtube.com/embed/${item[1]}?si=S_7EpUA151r9khLz`;
    }
};
const imgLocation = (item) => {
    return "../src/img/" + item;
};
const contextImg = computed(() => {
    return prjdata.value.img_md.slice(1);
});

/* onMounted, preloading img & gsap scrollTrigger */
const lazyPics = ref([]);
const imgContainer = ref();
let ctx;
const matchmedia = gsap.matchMedia();
onMounted(() => {
    preloadImages();
    setupDesktopAnimations();
    ctx = gsap.context((self) => {
        animateHero(self);
        animateImgTrigger(self);
        animateCredit(self);
    }, imgContainer.value);
});

/* Preloading status */
const preloadImages = () => {
    const images = document.querySelectorAll(".lazy");
    const loadImagePromises = Array.from(images).map((img) => {
        return new Promise((resolve) => {
            img.onload = () => {
                img.classList.add("loaded");
                resolve(img);
            };
        });
    });
    Promise.all(loadImagePromises);
};
/* Desktop animation */
const setupDesktopAnimations = () => {
    matchmedia.add("(min-width: 768px)", () => {
        gsap.to(".parallax", {
            scrollTrigger: { trigger: ".head-img-container", start: "clamp(top bottom)", end: "bottom 50px", scrub: 0.5 },
            yPercent: -16,
        });
    });
};
const animateHero = (self) => {
    // Hero GSAP
    const herotl = gsap.timeline({
        scrollTrigger: {
            trigger: ".workitem-info",
            start: "top 80%",
            end: "bottom 30%",
            // markers: true,
        },
        defaults: { ease: "back.inOut(1.7)", duration: 0.8 },
    });
    herotl.from("#prj-name", { opacity: 0, yPercent: 50, rotationX: 90, stagger: 0.05 });
    herotl.from(".hero-2", { opacity: 0, yPercent: 40, rotationX: 90, stagger: 0.25 }, 0.1);
    herotl.from(".hero-social", { opacity: 0, yPercent: 30, scale: 0.1, duration: 0.5, stagger: 0.25 }, 0.65);
    herotl.from(".hero-3", { opacity: 0, yPercent: 50, rotationX: 90 }, 0.6);
    herotl.from(".hero-4", { opacity: 0, yPercent: 25, rotationX: 90, ease: "power3.Out(1.7)", stagger: 0.25 }, 0.65);
    herotl.from(".hero-sep", { scaleX: 0, ease: "power3.Out(1.7)", stagger: 0.25 }, 0.8);
    herotl.from(".head-img-container", { clipPath: "inset(0 100% 0 0)", duration: 2.5, ease: "expo.out" }, 0.7);
    herotl.from("#content-context", { opacity: 0, yPercent: 25, ease: "power3.Out(1.7)", stagger: 0.1 }, 1.1);
};
const animateImgTrigger = (self) => {
    gsap.utils.toArray(".prj-img").forEach((layer) => {
        gsap.from(layer, { scrollTrigger: { trigger: layer, start: "clamp(top 65%)" }, opacity: 0, yPercent: 10, duration: 0.8 });
    });
};
/* Credit */
const animateCredit = (self) => {
    const credittl = gsap.timeline({
        scrollTrigger: { trigger: ".workitem-credit", start: "top 65%" },
        defaults: { ease: "back.inOut(1.7)", duration: 0.8 },
    });
    credittl.from(".credit-title", { opacity: 0, yPercent: 50 });
    credittl.from(".credit-text", { opacity: 0, yPercent: 50, stagger: 0.06 }, 0.2);
};

/* ---------Router Fix-----------*/
const getWorksData = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(WorksData.project.find((item) => item.url_name == id));
        }, 0);
    });
};
onBeforeRouteUpdate((to, from) => {
    ctx.revert();
    matchmedia.revert();
    /* Route Fix */
    (async () => {
        if (to.params.projecturl !== from.params.projecturl) {
            prjdata.value = await getWorksData(to.params.projecturl);
            shuffleprj.value = WorksData.project
                .filter((item) => item.url_name !== prjdata.value.url_name)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);
        }
    })();
});
onUnmounted(() => {
    // Clear gsap
    ctx.revert();
    matchmedia.revert();
});

/* --------Animation--------- */
function ScrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
    <div class="WorksItem">
        <main class="mt-12 pt-5">
            <!-- video -->
            <section class="relative mb-12">
                <iframe
                    class="aspect-video w-full"
                    :src="videoEmbed(prjdata.video)"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </section>
            <section class="container mx-auto sm:px-4" ref="imgContainer">
                <ProjectItemInfo :prjdata="prjdata" />
                <hr class="hero-sep my-10" />
                <!-- Workitem-Content -->
                <section class="workitem-content mx-1 mb-12 px-3 md:mx-4 xl:px-12">
                    <ProjectItemIntro :prjdata="prjdata" />
                    <!-- imgs -->
                    <div class="prj-imgs mb-12">
                        <figure class="prj-img mb-3 bg-gray-300" v-for="(item, index) in contextImg" :key="item">
                            <img :src="imgLocation(contextImg[index])" class="aspect-16/9 w-full object-cover" alt="contextImg" ref="lazyPics" />
                        </figure>
                    </div>
                    <hr />
                </section>
                <!-- credit -->
                <section class="workitem-credit mx-1 mb-5 flex flex-wrap px-3 md:mx-4 xl:px-12">
                    <div class="flex overflow-hidden px-4 lg:h-16 lg:justify-center xl:w-2/5">
                        <h3 class="credit-title mb-10 text-stone-950 xl:mb-0">Credit</h3>
                    </div>
                    <div class="px-4 xl:w-3/5">
                        <div v-for="(value, key) in prjdata.credit" class="credit-text mb-5 flex flex-wrap" :key="value">
                            <p class="relative max-w-full flex-1 grow lg:w-1/3">{{ key }}</p>
                            <p class="relative max-w-full flex-1 grow pl-4 lg:w-2/3">{{ value }}</p>
                        </div>
                    </div>
                </section>
                <Back2Top />
            </section>
            <!-- Other Prj -->
            <section class="workitem-otherprj d-flex-center bg-main-black min-h-[40vh] px-1 md:px-12" data-scroll-section>
                <div class="container mx-auto sm:px-4">
                    <h3 class="mx-4 my-4 text-white md:mx-0">Other Projects</h3>
                    <!-- projects -->
                    <div class="bd-content px-3 md:py-4 xl:px-0">
                        <div class="flex flex-wrap">
                            <div v-for="item in shuffleprj" class="group w-full max-w-full shrink-0 px-2 lg:w-1/3" :key="item.url_name">
                                <div class="card relative mb-4 flex overflow-hidden bg-gray-800 text-white">
                                    <!-- routerlink -->
                                    <router-link :to="{ name: 'WorksItem', params: { projecturl: item.url_name } }" :title="item.name">
                                        <img
                                            :src="imgLocation(item.img_md[0])"
                                            class="absolute top-0 left-0 h-full w-full object-cover"
                                            alt="otherprjImg"
                                            ref="lazyPics"
                                        />
                                        <div class="opacity-0 duration-500 group-hover:opacity-100">
                                            <div
                                                class="works-black absolute bottom-0 h-1/5 w-full overflow-hidden duration-500 group-hover:h-3/5"
                                            ></div>
                                            <div
                                                class="works-desktop-title absolute bottom-0 w-full px-5 text-white duration-500 group-hover:bottom-4"
                                            >
                                                <h4 class="mb-3">{{ item.en_name }}</h4>
                                                <p class="mb-0">{{ item.date }}</p>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <FooterItem />
    </div>
</template>
<style scoped>
/* Mobile */
@media only screen and (max-width: 1500px) {
    /* img */
    .head-img-container {
        height: 25vh;
    }
}
.workitem-content,
.workitem-credit {
    min-height: 60vh;
}

/* First Img */
.head-img-container {
    height: 50vh;
    clip-path: inset(0 0% 0 0);
    -webkit-clip-path: inset(0 0% 0 0);
}
.head-img-container-img {
    max-width: none;
    max-height: none;
}
/* Card */
.card {
    background-color: rgb(49, 49, 49);
    height: 25vh;
}
</style>
