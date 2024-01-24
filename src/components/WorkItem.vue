<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import FooterItem from './FooterItem.vue';
import WorksData from '@/data/WorksData.json';

const props = defineProps({
    projecturl: String,
});

// data initial
const prjdata = ref('null');
const shuffleprj = ref('null');
prjdata.value = WorksData.project.find(item => item.url_name == props.projecturl);
shuffleprj.value = WorksData.project.filter(item => item.url_name !== prjdata.value.url_name).sort(() => Math.random() - 0.5).slice(0, 3); // 2. shuffle array, pick top 3 item

// Transfer Data
// Other Project Random method
const vimeoPage = (item) => {return `https://vimeo.com/${ item[1] }`};
const vimeoEmbed = (item) => {
    if (item[0]=="vimeo") {
        return `https://player.vimeo.com/video/${ item[1] }?h=6ea64f06ea&color=ffffff&title=0&byline=0&portrait=0`;
    }
    else if (item[0]=="youtube") {
        return `https://www.youtube.com/embed/${ item[1] }?si=S_7EpUA151r9khLz`;
    }
};
const imgLocation = (item) => {return '../src/img/'+ item};
const contextImg = computed(() => {return prjdata.value.img_md.slice(1);});

/* onMounted, preloading img & gsap scrollTrigger */
const lazyloadimgs = ref(document.querySelectorAll('.lazy'));
const imgContainer = ref();
let ctx;
let matchmedia = gsap.matchMedia();
onMounted(() => {
    /* Preloading status */
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
    /* Scroll picture*/
    matchmedia.add("(min-width: 768px)", (context) => {
        /* heropic */
        gsap.to('.parallax', {
            scrollTrigger: {
                trigger: ".head-img-container",
                start: "clamp(top bottom)",
                end: "bottom 50px",
                scrub: .5,
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
        herotl.from(".head-img-container", { opacity: 0, yPercent: 25, ease: "power3.Out(1.7)" }, 1);
        herotl.from("#content-context", { opacity: 0, yPercent: 25, ease: "power3.Out(1.7)", duration: 0.5, stagger: 0.1 }, 1.1);
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
            resolve(
                WorksData.project.find(item => item.url_name == id),
            );
        }, 0);
    });
};
onBeforeRouteUpdate(async (to, from) => {
    ctx.revert();
    matchmedia.revert();
    /* Route Fix */
    if (to.params.projecturl !== from.params.projecturl) {
        prjdata.value = await getWorksData(to.params.projecturl);
        shuffleprj.value = WorksData.project.filter(item => item.url_name !== prjdata.value.url_name).sort(() => Math.random() - 0.5).slice(0, 3);
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
            <iframe class="aspect-video w-full" :src=vimeoEmbed(prjdata.video) allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
        </section>
        <section class="container mx-auto sm:px-4" ref="imgContainer">
            <!-- Workitem-info -->
            <section class="workitem-info flex flex-wrap lg:flex-row flex-col justify-between md:mx-4 mx-2 xl:px-12 px-3">
                <!-- Left -->
                <div class="pr-4 pl-4 xl:mb-0 mb-10">
                    <h3 class="hero-1 mb-4">{{ prjdata.en_name}}</h3>
                    <h5 class="hero-2 mb-3">@{{prjdata.company}}</h5>
                    <h6 class="hero-2 mb-4">{{prjdata.date}}</h6>
                    <div class="flex">
                        <a class="hero-social me-3" :href=prjdata.behance target="_blank" rel="noopener">
                            <svg id="icon_social">
                                <use xlink:href="#icon-behance"></use>
                            </svg>
                        </a>
                        <!-- vimeo Link -->
                        <a class="hero-social" :href=vimeoPage(prjdata.video) target="_blank" rel="noopener">
                            <svg id="icon_social">
                                <use xlink:href="#icon-vimeo"></use>
                            </svg>
                        </a>
                    </div>
                </div>
                <!-- Right -->
                <div class="xl:ml-auto pr-4 pl-4">
                    <h3 class="hero-3 mb-4">Roles</h3>
                    <h5 class="hero-4 mb-2" v-for="item in prjdata.roles" :key="item"> {{item}} </h5>
                </div>
            </section>
            <hr class="hero-sep my-10">
            <!-- Workitem-Content -->
            <section class="workitem-content md:mx-4 mx-1 mb-5 xl:px-12 px-3">
                <div class="flex flex-wrap md:mb-0 mb-5">
                    <!-- first-img -->
                    <div class="xl:w-1/2 xl:mb-6 mb-5 max-w-full">
                        <div class="head-img-container w-full d-flex-center overflow-hidden">
                            <div class="parallax">
                                <img :src="imgLocation(prjdata.img_md[0])" class="head-img-container-img lazy w-[1920px] h-[1080px] object-cover" alt="firstImg">
                            </div>
                        </div>
                    </div>
                    <!-- Right Content -->
                    <div class="xl:w-1/2 flex justify-center xl:mb-0 mb-5">
                        <div class="content-container  space-y-5 max-w-2xl px-5">
                            <p v-for="item in prjdata.msg" :key="item" class="text-lg" id="content-context">
                                {{item}}
                            </p>
                        </div>
                    </div>
                </div>
                <!-- imgs -->
                <div class="prj-imgs">
                    <div class="prj-img d-flex-center mb-3 bg-gray-300" v-for="(item, index) in contextImg" :key="item">
                        <img :src="imgLocation(contextImg[index])" class="d-flex-center flex-grow max-w-full flex-1 h-full lazy" alt="contextImg">
                    </div>
                </div>
                <hr class="mt-5">
            </section>
            <!-- credit -->
            <section class="workitem-credit flex flex-wrap md:mx-4 mx-1 mb-5 xl:px-12 px-3 ">
                <div class="xl:w-2/5 px-4 flex lg:justify-center">
                    <h3 class="credit-title xl:mb-0 mb-10"> Credit </h3>
                </div>
                <div class="xl:w-3/5 px-4">
                    <div v-for = "value, key in prjdata.credit" class="credit-text flex flex-wrap mb-5" :key="value">
                        <p class="lg:w-1/3 relative flex-grow max-w-full flex-1">{{key}}</p>
                        <p class="lg:w-2/3 relative flex-grow max-w-full flex-1 pl-4">{{value}}</p>
                    </div>
                </div>
            </section>
            <div class="work-end w-full mx-auto sm:px-4 max-w-full">
                <a @click="ScrollTop" class="d-flex-center flex-col p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chevron-compact-up mb-1" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"/>
                    </svg>
                    <p class="text-sm">BACK TO TOP</p>
                </a>
            </div>
        </section>
        <!-- Other Prj -->
        <section class="workitem-otherprj d-flex-center md:px-12 px-1 " data-scroll-section>
            <div class="container mx-auto sm:px-4">
                <h3 class="text-white my-4">Other Projects</h3>
                <!-- projects -->
                <div class="md:py-4 xl:px-0 px-3 bd-content">
                    <div class="flex flex-wrap ">
                        <div v-for="item in shuffleprj" class="lg:w-1/3 w-full max-w-full shrink-0 px-2" :key="item.url_name">
                            <div class="card relative flex mb-4 bg-gray-800  text-white">
                                <!-- routerlink -->
                                <router-link :to="{ name : 'WorksItem' , params : { projecturl: item.url_name } }" :title="item.name">
                                    <img :src=imgLocation(item.img_md[0]) class="card-img lazy absolute top-0 left-0 w-full object-cover" alt="otherprjImg">
                                    <div class="works-black"></div>
                                    <div class="works-destop-title text-white px-4">
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
.prj-img{
    opacity: 0;
}
/* -----Section------ */
@media only screen and (min-width: 1200px) {
    .workitem-info{
        min-height: 20vh;
    }
}
/* Mobile */
@media only screen and (max-width: 1500px) {
    /* img */
    .head-img-container{
        height: 25vh;
    }
}
.workitem-content, .workitem-credit{
    min-height: 60vh;
}
.workitem-otherprj{
    min-height: 40vh;
    background-color: var(--main-black);
}

/* First Img */
.head-img-container{
    /* width: 35vmax; */
    height: 50vh;
}
.head-img-container-img{
    max-width: none;
    max-height: none;
}
/* Card */
.card{
    background-color: rgb(49, 49, 49);
    height: 25vh;
}
</style>
