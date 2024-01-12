<script setup>
import {ref, computed, onMounted, onUnmounted} from 'vue';
import {onBeforeRouteUpdate} from 'vue-router';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import FooterItem from './FooterItem.vue';
import WorksData from '@/data/WorksData.json';

const props = defineProps({
    projecturl: String,
})

// data initial
const prjdata = ref('null');
const shuffleprj = ref('null');
prjdata.value = WorksData.project.find(item => item.url_name == props.projecturl);
shuffleprj.value = WorksData.project.filter(item => item.url_name !== prjdata.value.url_name).sort(() => Math.random() - 0.5).slice(0, 3); // 2. shuffle array, pick top 3 item

// Transfer Data
// Other Project Random method
const vimeoPage = (item) => {return `https://vimeo.com/${ item }`}
const vimeoEmbed = (item) => {
    if (item[0]=="vimeo") {
        return `https://player.vimeo.com/video/${ item[1] }?h=6ea64f06ea&color=ffffff&title=0&byline=0&portrait=0`
    }
    else if (item[0]=="youtube") {
        return `https://www.youtube.com/embed/${ item[1] }?si=S_7EpUA151r9khLz`
    }
}
const imgLocation = (item) => {return '../src/img/'+ item}
const contextImg = computed(() => {return prjdata.value.img_md.slice(1);});

/* ---------Router Fix-----------*/
const getWorksData = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                WorksData.project.find(item => item.url_name == id),
            )
        }, 0)
    })
}

onBeforeRouteUpdate(async (to, from) => {
    // console.log("beforeRouteUpdate")
    if (to.params.projecturl !== from.params.projecturl) {
        prjdata.value = await getWorksData(to.params.projecturl);
        shuffleprj.value = WorksData.project.filter(item => item.url_name !== prjdata.value.url_name).sort(() => Math.random() - 0.5).slice(0, 3);
    }
})

/* onMounted, preloading img & gsap scrollTrigger */
const lazyloadimgs = ref(document.querySelectorAll('.lazy'));
const imgContainer = ref();
let ctx;
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
        if(img.complete) {
            loaded(img)
        } else {
            img.addEventListener("load", loaded)
        }
    });
    /* Scroll picture*/
    ctx = gsap.context((self) => {
        window.addEventListener('mousemove', (e)=>{
            heroRot(e);
        });
        //
        const herotl = gsap.timeline({
            scrollTrigger: {
                trigger: ".workitem-info",
                start: "top 80%",
                end: "bottom 30%",
                markers: true,
            },
        });
        herotl.from(".hero-1", {opacity: 0, y: 50, rotationX: 90, ease: "back.inOut(1.7)", duration: 0.8});
        herotl.from(".hero-2", {opacity: 0, y: 40, rotationX: 90, ease: "back.inOut(1.7)", duration: 0.8, stagger: 0.25}, 0.1);
        herotl.from(".hero-social", {opacity: 0, y: 30, scale: 0.1, ease: "back.inOut(1.7)", duration: 0.5, stagger: 0.25}, 0.65);
        herotl.from(".hero-3", {opacity: 0, y: 50, rotationX: 90, ease: "back.inOut(1.7)", duration: 0.8}, 0.6);
        herotl.from(".hero-4", {opacity: 0, y: 25, rotationX: 90, ease: "power3.Out(1.7)", duration: 0.8, stagger: 0.25}, 0.65);
        herotl.from(".hero-sep", {scaleX:0 , ease: "power3.Out(1.7)", duration: 0.5, stagger: 0.25}, 0.8);
        herotl.from(".head-img-container", {opacity: 0, y: 25, ease: "power3.Out(1.7)", duration: 0.8}, 1);
        herotl.from(".content-context", {opacity: 0, y: 25, ease: "power3.Out(1.7)", duration: 0.8, stagger: 0.25}, 1.1);
        /* heropic */
        const heroRot = (e)=>{
            gsap.utils.toArray(".head-img-container-img").forEach((el) => {
                let xPos = e.clientX / window.innerWidth - 0.5;
                let yPos = e.clientY / window.innerHeight - 0.5;
                let depth = el.dataset.depth;
                gsap.to(el, {
                    x: xPos * 40,
                    y: yPos * 10,
                    rotationY: xPos * 10,
                    rotationX: yPos * 10,
                    stagger: 0.055,
                });
            });
        };
        gsap.to('.head-img-container-img', {
            scrollTrigger: {
                trigger: ".head-img-container",
                start: "top bottom",
                end: "bottom 50px",
                scrub: true,
                // markers: true
            },
            y: -150,
        });
    }, imgContainer.value);
});
onUnmounted(() => {
    // Clear gsap
    ctx.revert();
});

/* --------Animation--------- */
const beforeEnter = (el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(50px)';
}
const sigleEnter = (el, done) => {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        onComplete: done,
    })
}
function ScrollTop() {
    window.scrollTo(0, 0);
}
</script>

<template>
<div class="WorksItem">
    <!-- video -->
    <div class="ratio ratio-16x9 mb-5" data-scroll-section>
        <iframe :src=vimeoEmbed(prjdata.video) allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
    </div>
    <main class="container" ref="imgContainer">
        <!-- Workitem-info -->
        <div class="workitem-info row mb-5 mx-md-3 mx-2 px-xl-5 px-3">
            <!-- Left -->
            <div class="col-9">
                <h3 class="hero-1 mb-4">{{ prjdata.en_name}}</h3>
                <h6 class="hero-2 mb-3">@{{prjdata.company}}</h6>
                <p class="hero-2 mb-4">{{prjdata.date}}</p>
                <div>
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
            <div class="col-3 justify-content-end">
                <h3 class="hero-3 mb-4">Roles</h3>
                <p class="hero-4 mb-2" v-for="item in prjdata.roles" :key="item">
                    {{item}}
                </p>
            </div>
            <hr class="mt-5 hero-sep">
        </div>
        <!-- Workitem-Content -->
        <section class="workitem-content mx-md-3 mx-1 mb-5 px-xl-5 px-3">
            <div class="row">
                <!-- img -->
                <div class="col-xxl-7 mb-md-4 mb-5">
                    <div class="head-img-container img-container d-flex-center">
                        <img :src="imgLocation(prjdata.img_md[0])" class="head-img-container-img d-flex-center img-fluid lazy" alt="firstImg">
                    </div>
                </div>
                <!-- Right Content -->
                <div class="col-xxl-5">
                    <div class="content-context">
                        <p v-for="item in prjdata.msg" :key="item">
                            {{item}}
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <div class="row mb-3">
                    <div class="img-container d-flex-center mb-3" v-for="(item, index) in contextImg" :key="item">
                        <img :src="imgLocation(contextImg[index])" class="d-flex-center col img-fluid lazy" alt="contextImg">
                    </div>
                </div>
            </div>
            <hr class="mt-5">
        </section>
        <!-- credit -->
        <div class="workitem-credit row mx-md-3 mx-1 mb-5 px-xl-5 px-3 ">
            <div class="col-xl-5">
            </div>
            <!-- Right Content -->
            <div class="col-xl-7">
                <h4 class="mb-5">Credit</h4>
                <div v-for = "value, key in prjdata.credit" class="row" :key="value">
                    <p class="col-lg-4 col">{{key}}</p>
                    <p class="col-lg-8 col">{{value}}</p>
                </div>
            </div>
        </div>
        <div class="workitem-end container-fluid text-center">
            <a @click="ScrollTop()" class="nav-link p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chevron-compact-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"/>
                </svg>
                <p>BACK TO TOP</p>
            </a>
        </div>
    </main>
    <!-- Other Prj -->
    <section class="container-fluid workitem-otherprj px-md-5 px-1 " data-scroll-section>
        <div class="container ">
            <h3 class="text-white my-4">Other Project</h3>
            <div class="py-md-3 pl-md-5 px-xl-3 bd-content">
                <div class="row">
                    <div v-for="item in shuffleprj" class="col-xl-4" :key="item.url_name">
                        <div class="card mb-4 text-white">
                            <!-- routerlink -->
                            <router-link :to="{ name : 'WorksItem' , params : { projecturl: item.url_name } }" :title="item.name">
                                <img :src=imgLocation(item.img_md[0]) class="card-img lazy" alt="otherprjImg">
                                <div class="works-black"></div>
                                <div class="works-text text-white px-4">
                                    <h4 class="card-title">{{ item.name }}</h4>
                                    <h6 class="card-title">@{{ item.company }}</h6>
                                    <p class="card-text">{{ item.date }}</p>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <FooterItem />
</div>
</template>
<style scoped>
/* -----Section------ */
main{
    padding-right: 0 !important;
    padding-left: 0 !important;
}
/* img lazy loading */
.img-container{
    background-color: rgb(235, 235, 235);
    margin-bottom: 35px;
}
.card{
    background-color: rgb(49, 49, 49);
    margin-bottom: 35px;
}
.lazy.loaded{
    opacity: 1;
    transition: all 0.5s;
}
.lazy{
    opacity: 0;
}

@media only screen and (min-width: 1200px) {
    .workitem-info{
        min-height: 20vh;
    }
}

.workitem-content, .workitem-credit{
    min-height: 60vh;
}
.workitem-otherprj{
    min-height: 40vh;
    display: flex;
    align-items: center;
    background-color: #0e0e0e;
}

/* Card */
.card{
    margin-bottom: 35px;
    height: 25vh;
}
/* Mobile */
@media only screen and (max-width: 1500px) {
    /* img */
    .head-img-container{
        width: 80vw;
        height: 25vh;
    }
}
/* First Img */
.head-img-container{
    /* position: relative; */
    width: 95%;
    height: 50vh;
    overflow: hidden;
}
.head-img-container-img{
    /* position: absolute; */
    width: 1920px;
    height: 1080px;
    /* top: -50%; */
    /* left: -50%; */
    max-width: none;
    max-height: none;
    object-fit: cover;
}
</style>
