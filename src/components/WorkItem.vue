<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import FooterItem from "./FooterItem.vue";
import WorksData from "@/data/WorksData.json";

const props = defineProps({
    projecturl: String,
});

// data initial
const prjdata = ref("null");
const shuffleprj = ref("null");
prjdata.value = WorksData.project.find((item) => item.url_name == props.projecturl);
shuffleprj.value = WorksData.project
    .filter((item) => item.url_name !== prjdata.value.url_name)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3); // 2. shuffle array, pick top 3 item

// Transfer Data
// Other Project Random method
const vimeoPage = (item) => {
    return `https://vimeo.com/${item[1]}`;
};
const vimeoEmbed = (item) => {
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
const lazyloadimgs = ref(document.querySelectorAll(".lazy"));
const imgContainer = ref();
let ctx;
let matchmedia = gsap.matchMedia();
onMounted(() => {
    /* Preloading status */
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
    /* Scroll picture*/
    matchmedia.add("(min-width: 768px)", (context) => {
        /* heropic */
        gsap.to(".parallax", {
            scrollTrigger: {
                trigger: ".head-img-container",
                start: "clamp(top bottom)",
                end: "bottom 50px",
                scrub: 0.5,
                // markers: true
            },
            yPercent: -16,
        });
    });
    ctx = gsap.context((self) => {
        // img
        gsap.utils.toArray(".prj-img").forEach((layer) => {
            gsap.to(layer, {
                scrollTrigger: {
                    trigger: layer,
                    // markers: true,
                    start: "clamp(top 80%)",
                },
                autoAlpha: 1,
            });
        });
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
        herotl.from(".hero-1", { opacity: 0, yPercent: 50, rotationX: 90 });
        herotl.from(".hero-2", { opacity: 0, yPercent: 40, rotationX: 90, stagger: 0.25 }, 0.1);
        herotl.from(".hero-social", { opacity: 0, yPercent: 30, scale: 0.1, duration: 0.5, stagger: 0.25 }, 0.65);
        herotl.from(".hero-3", { opacity: 0, yPercent: 50, rotationX: 90 }, 0.6);
        herotl.from(".hero-4", { opacity: 0, yPercent: 25, rotationX: 90, ease: "power3.Out(1.7)", stagger: 0.25 }, 0.65);
        herotl.from(".hero-sep", { scaleX: 0, ease: "power3.Out(1.7)", stagger: 0.25 }, 0.8);
        herotl.from(".head-img-container", { clipPath: "inset(0 100% 0 0)", duration: 2.5, ease: "expo.out" }, 0.7);
        herotl.from("#content-context", { opacity: 0, yPercent: 25, ease: "power3.Out(1.7)", stagger: 0.1 }, 1.1);
        /* Credit */
        const credittl = gsap.timeline({
            scrollTrigger: {
                trigger: ".workitem-credit",
                start: "top 80%",
                end: "bottom 30%",
                // markers: true,
            },
            defaults: { ease: "back.inOut(1.7)", duration: 0.8 },
        });
        credittl.from(".credit-title", { opacity: 0, yPercent: 50 });
        credittl.from(".credit-text", { opacity: 0, yPercent: 50, stagger: 0.08 }, 0.25);
    }, imgContainer.value);
});
/* ---------Router Fix-----------*/
const getWorksData = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(WorksData.project.find((item) => item.url_name == id));
        }, 0);
    });
};
onBeforeRouteUpdate(async (to, from) => {
    ctx.revert();
    matchmedia.revert();
    /* Route Fix */
    if (to.params.projecturl !== from.params.projecturl) {
        prjdata.value = await getWorksData(to.params.projecturl);
        shuffleprj.value = WorksData.project
            .filter((item) => item.url_name !== prjdata.value.url_name)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
    }
});
onUnmounted(() => {
    // Clear gsap
    ctx.revert();
    matchmedia.revert();
});

/* --------Animation--------- */
function ScrollTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
}
</script>

<template>
<div class="WorksItem">
    <main class="mt-5 pt-5">
        <!-- video -->
        <section class="relative mb-12">
            <iframe class="aspect-video w-full" :src="vimeoEmbed(prjdata.video)" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
        </section>
        <section class="container mx-auto sm:px-4" ref="imgContainer">
            <!-- Workitem-info -->
            <section class="workitem-info mx-2 flex flex-col flex-wrap justify-between px-3 md:mx-4 lg:flex-row xl:px-12">
                <!-- Left-info -->
                <div class="mb-8 pl-4 pr-4 md:mb-12 xl:mb-0">
                    <h3 class="hero-1 mb-8">{{ prjdata.en_name }}</h3>
                    <div class="flex flex-row justify-between md:flex-col">
                        <div>
                            <h5 class="hero-2 mb-3">@{{ prjdata.company }}</h5>
                            <h6 class="hero-2 mb-6">{{ prjdata.date }}</h6>
                        </div>
                        <div class="flex">
                            <a class="hero-social me-6" :href="prjdata.behance" target="_blank" rel="noopener">
                                <svg id="icon_social">
                                    <use xlink:href="#icon-behance"></use>
                                </svg>
                            </a>
                            <!-- vimeo Link -->
                            <a class="hero-social" :href="vimeoPage(prjdata.video)" target="_blank" rel="noopener">
                                <svg id="icon_social">
                                    <use xlink:href="#icon-vimeo"></use>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- Right - Roles -->
                <div class="pl-4 pr-4 xl:ml-auto">
                    <h3 class="hero-3 mb-4">Roles</h3>
                    <h5 class="hero-4 mb-2" v-for="item in prjdata.roles" :key="item">{{ item }}</h5>
                </div>
            </section>
            <hr class="hero-sep my-10" />
            <!-- Workitem-Content -->
            <section class="workitem-content mx-1 mb-5 px-3 md:mx-4 xl:px-12">
                <div class="mb-5 flex flex-wrap md:mb-0">
                    <!-- first-img -->
                    <div class="mb-5 max-w-full xl:mb-6 xl:w-1/2">
                        <div class="head-img-container d-flex-center w-full overflow-hidden">
                            <div class="parallax">
                                <img :src="imgLocation(prjdata.img_md[0])" class="head-img-container-img lazy h-[1080px] w-[1920px] object-cover" alt="firstImg" />
                            </div>
                        </div>
                    </div>
                    <!-- Right Content -->
                    <div class="mb-5 flex justify-center xl:mb-0 xl:w-1/2">
                        <div class="content-container max-w-2xl space-y-5 px-5">
                            <p v-for="item in prjdata.msg" :key="item" class="text-lg" id="content-context">
                                {{ item }}
                            </p>
                        </div>
                    </div>
                </div>
                <!-- imgs -->
                <div class="prj-imgs">
                    <div class="prj-img d-flex-center mb-3 bg-gray-300" v-for="(item, index) in contextImg" :key="item">
                        <img :src="imgLocation(contextImg[index])" class="d-flex-center lazy h-full max-w-full flex-1 flex-grow" alt="contextImg" />
                    </div>
                </div>
                <hr class="mt-5" />
            </section>
            <!-- credit -->
            <section class="workitem-credit mx-1 mb-5 flex flex-wrap px-3 md:mx-4 xl:px-12">
                <div class="flex px-4 lg:justify-center xl:w-2/5">
                    <h3 class="credit-title mb-10 xl:mb-0">Credit</h3>
                </div>
                <div class="px-4 xl:w-3/5">
                    <div v-for="(value, key) in prjdata.credit" class="credit-text mb-5 flex flex-wrap" :key="value">
                        <p class="relative max-w-full flex-1 flex-grow lg:w-1/3">{{ key }}</p>
                        <p class="relative max-w-full flex-1 flex-grow pl-4 lg:w-2/3">{{ value }}</p>
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
        </section>
        <!-- Other Prj -->
        <section class="workitem-otherprj d-flex-center px-1 md:px-12" data-scroll-section>
            <div class="container mx-auto sm:px-4">
                <h3 class="my-4 text-white">Other Projects</h3>
                <!-- projects -->
                <div class="bd-content px-3 md:py-4 xl:px-0">
                    <div class="flex flex-wrap">
                        <div v-for="item in shuffleprj" class="w-full max-w-full shrink-0 px-2 lg:w-1/3" :key="item.url_name">
                            <div class="card relative mb-4 flex bg-gray-800 text-white">
                                <!-- routerlink -->
                                <router-link :to="{ name: 'WorksItem', params: { projecturl: item.url_name } }" :title="item.name">
                                    <img :src="imgLocation(item.img_md[0])" class="card-img lazy absolute left-0 top-0 w-full object-cover" alt="otherprjImg" />
                                    <div class="works-black"></div>
                                    <div class="works-destop-title px-4 text-white">
                                        <h4 class="mb-3">{{ item.en_name }}</h4>
                                        <p class="mb-0">{{ item.date }}</p>
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
.prj-img {
    opacity: 0;
}
/* -----Section------ */
@media only screen and (min-width: 1200px) {
    .workitem-info {
        min-height: 20vh;
    }
}
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
.workitem-otherprj {
    min-height: 40vh;
    background-color: var(--main-black);
}

/* First Img */
.head-img-container {
    /* width: 35vmax; */
    height: 50vh;
    /* clip-path: rect(0px 500px 500px 0px); */
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

