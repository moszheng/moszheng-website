<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useNavStore } from '@/stores/navstore';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import FooterItem from '@/components/FooterItem.vue';
import LinkData from '@/data/LinkData.json';
import LogoData from '@/data/LogoData.json';
import ExpData from '@/data/Experience.json';

// Return Real route
const profileImage1 = '../src/img/profile_1_md.webp';
const profileImage2 = '../src/img/profile_2_md.webp';

// Split content
const heroHello = "Hello, I'm";
const heroName = "Sheng Wen Cheng";

const introcontent = computed(() => {
    const arr = [];
    ExpData.about.forEach((el) => {
        arr.push(el.split(" "));
    });
  return arr;
});

const splitText = (string) => {
    const arr = string.split(" ");
    return arr;
};
/* ------------ Transition GSAP --------------------*/
const store = useNavStore();
const changeNavbarState = (state) => {
    store.navbardarkmode = state;
};
const lazyloadimgs = ref(document.querySelectorAll('.lazy'));
const imgContainer = ref();
let ctx;
let matchmedia = gsap.matchMedia();
onMounted(() => {
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
    /* Desktop only Motion */
    matchmedia.add("(min-width: 768px)", (context) => {
        /* ----------- Depth --------------- */
        gsap.utils.toArray(".parallax").forEach((layer) => {
            const depth = layer.dataset.depth;
            const movement = depth * 4;
            const scale = 1.2 / layer.dataset.scale; // From 1.35 -> 1.2
            gsap.to(layer, {
                yPercent: movement,
                scale: scale,
                ease: "none",
                scrollTrigger: {
                    trigger: ".about-hero",
                    start: "clamp(top top)",
                    end: "clamp(bottom 50%)",
                    scrub: .5,
                },
            }); // scale from 1.3
        });
    });
    /* Main GSAP Animation*/
    ctx = gsap.context((self) => {
        // window.addEventListener('mousemove', (e)=>{
        //     heroRot(e);
        // });
        // const heroRot = (e)=>{
        //     gsap.utils.toArray(".heroRot").forEach((el) => {
        //         let xPos = e.clientX / window.innerWidth;
        //         let yPos = e.clientY / window.innerHeight;
        //         let depth = el.dataset.depth;
        //         gsap.to(el, {
        //             xPercent: xPos * depth * 2,
        //             yPercent: yPos * depth * 1,
        //             rotationY: xPos * depth * 10,
        //             rotationX: yPos * depth * 10,
        //         });
        //     });
        // };
        /* Hero Section */
        const herotl = gsap.timeline({ defaults: { ease: "back.inOut(1.7)", duration: 0.8 } });
        
        // herotl.fromTo(".user-container",
        //     { clipPath: "xywh(0 150px 100% 10% round 15% 0)" },
        //     { clipPath: "xywh(0 0px 100% 100% round 15% 0)", duration: 3, ease: "power4.out" }
        // , 0);
        herotl.fromTo(".user-container",
            { clipPath: "circle(10px at 50% 50%)" },
            { clipPath: "circle(120px at 50% 50%)", duration: 3, ease: "power4.out" }
        , 0);
        herotl.from(".avatar-user_1 ", { scale: 2.2, duration: 3.5, ease: "power4.out" }, 0);
        herotl.from(".avatar-user_2 ", { scale: 1.6, duration: 3.5, ease: "power4.out" }, 0);
        herotl.from("#hero-hello", { opacity: 0, yPercent: 150, rotationX: 90, stagger: 0.25 }, 0.45);
        herotl.from("#hero-name", { opacity: 0, yPercent: 150, rotationX: 90, rotationZ: 10, stagger: 0.1 }, 0.9);
        herotl.from("#hero-detail", { opacity: 0, yPercent: 20, ease: "power4.inOut", duration: 1.5 }, 1.2);
        herotl.from("#hero-4", { opacity: 0, yPercent: -15 }, 2.2);
        /* Intro Section*/
        const introtl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-intro",
                start: "top 65%",
                end: "bottom 30%",
                // markers: true,
            },
            defaults: { ease: "power3.Out(1.7)" },
        });
        // introtl.from(".intro-info", { yPercent: 15, duration: 0.7, stagger: 0.3 }, 0);
        introtl.from(".split-text", { opacity: 0, yPercent: 40, duration: 0.6, stagger: 0.01 }, 0);
        introtl.from(".intro-infosocial", { opacity: 0, xPercent: -30, scale: 0.5, duration: 0.5, stagger: 0.1 }, 0.35);
        introtl.from(".intro-infocontact", { opacity: 0, yPercent: 20, duration: 1, stagger: 0.2 }, 0.5);
        /* --------------- Exp Section--------------*/
        const navtl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-exp",
                start: "top top",
                end: "bottom top",
                // markers: true,
                onEnter: (self) => {
                    changeNavbarState(true);
                },
                onLeave: (self) => {
                    changeNavbarState(false);
                },
                onEnterBack: (self) => {
                    changeNavbarState(true);
                },
                onLeaveBack: (self) => {
                    changeNavbarState(false);
                },
            },
        });
        const exptl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-exp-block",
                start: "top 80%",
                end: "bottom+=300 top",
                // markers: true,
            },
            defaults: { ease: "power3.Out(1.7)" },
        });
        exptl.from(".timeline", { autoAlpha: 0, ease: "linear" }, 0); // init timeline or will flash to top(FOUC)
        exptl.from("#about-exp-title", { opacity: 0, xPercent: -15, ease: "back.inOut(1.7)", duration: 0.8 });
        exptl.from(".about-job", { opacity: 0, yPercent: -30, duration: 0.8, stagger: 0.25 }, 0.5);
        exptl.from(".exp-job-title", { opacity: 0, yPercent: -30, duration: 0.5, stagger: 0.15 }, 0.7);
        exptl.from(".exp-job-detail", { opacity: 0, yPercent: -30, duration: 0.8, stagger: 0.15 }, 0.9);
        exptl.from(".timeline", { scaleY: 0, ease: "back.Out(1.7)", duration: 0.5, stagger: 0.5 }, 1);
        /* -----------Skill Section--------
            1. Title
            2. skill-card
            3. Tools
        */
        const skilltl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-skill",
                start: "top center",
                end: "bottom 30%",
                // markers: true,
            },
            defaults: { ease: "power3.Out(1.7)" },
        });
        skilltl.from("#skill-title", { opacity: 0, yPercent: 20, duration: 1 });
        // Skill Card Group
        gsap.utils.toArray(".about-skill-card").forEach((item, i) => {
            const delay = i / 8 + 0.5;
            const cardtitle = item.querySelector("#skill-card-title");
            const cardtext = item.querySelectorAll("#skill-card-text");
            // Animation
            skilltl.from(item, { opacity: 0, yPercent: 25, scale: 0.8, duration: 0.3 }, delay);
            skilltl.from(cardtitle, { opacity: 0, yPercent: 20, rotateX: 45, duration: 1 }, delay + 0.1);
            skilltl.from(cardtext, { opacity: 0, yPercent: 20, duration: 0.5, stagger: 0.1 }, delay + 0.25);
        });
        // skilltl.from("#skill-sep", { scaleX: 0, ease: "back.Out(1.7)", duration: 1 }, 1);
        // Skill Icon Group
        const icontl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-skill",
                start: "35% center",
                end: "bottom 30%",
                // markers: true,
            },
            defaults: { ease: "power3.Out(1.7)", duration: 0.5 },
        });
        icontl.from("#skill-tooltitle", { opacity: 0, yPercent: 20, rotateX: 40 }, 0.5);
        icontl.from(".skill-logo-container", { opacity: 0, yPercent: 20, scale: 0.8, stagger: 0.1 }, 0.5);
    }, imgContainer.value);
});
onUnmounted(() => {
    ctx.revert();
    matchmedia.revert();
});

/* GSAP */
function ScrollTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
}

</script>
<template>
<div class="About">
    <main class="bg-main-gray" ref="imgContainer">
        <!-- Hero -->
        <section class="about-hero d-flex-center flex-wrap xl:h-screen h-svh xl:mt-0 mt-8 pt-5 xl:px-16 px-3 xl:py-12 bg-white">
            <!-- profile image -->
            <div class="d-flex-center xl:w-1/2 pr-4 pl-4">
                <div class="user-container parallax relative max-h-[600px] overflow-hidden" data-depth='5' data-scale='1.2'>
                    <div class="avatar-user_1 z-20 absolute scale-[1.35] top-[8%]" >
                        <div class="parallax heroRot" data-depth='1.05' data-scale='1.05'>
                            <img class="lazy left-0 w-full h-auto object-cover" alt="profile_image" :src=profileImage1>
                        </div>
                    </div>
                    <div class="avatar-user_2 z-10 absolute scale-[1.35] top-[8%]">
                        <div class="parallax heroRot" data-depth='3.2' data-scale='1.15'>
                            <img class="lazy left-0 w-full h-auto object-cover" alt="profile_image" :src=profileImage2>
                        </div>
                    </div>
                </div>
            </div>
            <!-- text -->
            <div class="about-hero-info xl:w-1/2 xl:ps-6 md:px-12 px-0">
                <div class="md:mb-1 mb-3">
                    <!-- Name -->
                    <h1 class="mobile-center md:mb-0 mb-2">
                        <span v-for="(text, index) in splitText(heroHello)" :key="index" class="inline-flex xl:pe-4 pe-2">
                            <span class="block font-bold" id="hero-hello"> {{ text }} </span>
                        </span>
                    </h1>
                    <!-- Name -->
                    <h1 class="mobile-center md:mb-10 mb-8">
                        <span v-for="(text, index) in splitText(heroName)" :key="index" class="inline-flex xl:pe-4 pe-2">
                            <span class="block font-bold" id="hero-name"> {{ text }} </span>
                        </span>
                    </h1>
                    <!-- Subtitle -->
                    <div class="flex">
                        <div class="mobile-center flex flex-col items-center">
                            <h4 class="md:text-left text-center md:mb-12 mb-10" id="hero-detail">
                                <strong class="text-main-orange">3D Generalist</strong> and <strong class="text-main-orange">Motion Designer</strong>
                                <br> based in Taiwan.
                            </h4>
                            <div class="text-center" id="hero-4" style="rotate: 180deg;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chevron-compact-up" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Intro 2-->
        <section class="about-intro d-flex-center xl:px-20 xl:py-12 p-6 rounded-b-lg bg-white">
            <div class="about-intro-block container xl:mb-4 mb-5 w-full">
                <!-- text -->
                <div class="about-intro-info max-w-4xl flex items-start md:mb-12 mb-10">
                    <!-- Intro -->
                    <div class="space-y-5">
                        <h4 v-for="(textarray, indexz) in introcontent" :key="indexz" class="intro-info">
                            <span v-for="(text, index) in textarray" :key="index" class="inline-flex pe-2">
                                <span class="block split-text"> {{ text }} </span>
                            </span>
                        </h4>
                    </div>
                </div>
                <div class="xl:flex justify-end xl:px-0 md:px-12 px-0">
                    <div class="about-intro-social">
                        <!-- Social media -->
                        <ul class="flex flex-wrap list-reset mb-10 flex-row mobile-center">
                            <li v-for="item in LinkData.socialmedia" :key="item" class=" intro-infosocial w-1/5 col-md-auto">
                                <a class="inline-block py-2 md:pl-2 md:pr-4 px-4" :href="item.url" target="_blank" rel="noopener">
                                    <svg id="icon_social">
                                        <use :xlink:href="item.icon"></use>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                        <!-- Contact info -->
                        <div class="mobile-center">
                            <div class="mb-4">
                                <div v-for="(item, index) in LinkData.profile_link" :key="item.text" :data-index="index" class="intro-infocontact flex mb-2 p-2">
                                    <svg id="icon_social">
                                        <use :xlink:href="item.icon"></use>
                                    </svg>
                                    <h5 class="ml-3">{{ item.text }}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Experience Breakpoint: xl, lg(1024) -->
        <section class="about-exp d-flex-center min-h-screen xl:px-12 px-4 py-5 text-white bg-main-black xl:rounded-b-[5em] rounded-b-3xl">
            <div class="about-exp-block container flex flex-wrap xl:mt-0 lg:mb-4 mt-10 mb-8">
                <!-- Exp Title -->
                <div class="lg:w-1/3 lg:mb-6 mb-10 pt-2 lg:pl-0 lg:pr-10 px-4">
                    <h2 id="about-exp-title">Experience</h2>
                </div>
                <!-- Timeline -->
                <div class="lg:w-2/3 xl:px-4 md:space-y-7 space-y-5">
                    <div class="about-job group flex flex-wrap" v-for="(item, index) in ExpData.experience" :key="item.company" :data-index="index">
                        <!-- Exp Job Duration & timeline -->
                        <div class="flex flex-wrap relative flex-grow justify-center max-w-full flex-1 xl:px-4">
                            <!-- Toggle Duration -->
                            <div class="relative flex-grow max-w-full flex-1 px-2 py-8 text-center duration-toggle">
                                <p>{{item.duration}}</p>
                            </div>
                            <!-- Mid -->
                            <div class="w-1/4 flex justify-center">
                                <div class="timeline top-[70px] w-px bg-gradient-to-b from-[#4e4e4e] via-[#818181] to-[#3a3a3a]"></div>
                                <div class="flex justify-center py-9">
                                    <div class="rounded-full group-hover:bg-main-orange bg-main-gray w-2.5 h-2.5 duration-200"></div>
                                </div>
                            </div>
                        </div>
                        <!-- Exp Job Content -->
                        <div class="xl:w-3/4 w-4/5 xl:pl-4 pl-2 pr-4 py-6 rounded-lg bg-gradient-to-r group-hover:from-transparent group-hover:to-[#242222]">
                            <div class="mb-6">
                                <h4 class="exp-job-title relative flex-grow max-w-full flex-1 mb-2">{{ item.title }}</h4>
                                <div class="flex">
                                    <h6 class="exp-job-title mr-4 mb-0">{{ item.company }}</h6>
                                    <span class="exp-p duration-toggled">{{item.duration}}</span>
                                </div>
                            </div>
                            <!-- Job detail -->
                            <ul class="exp-p list-disc space-y-2 pl-3 max-w-2xl">
                                <li v-for="content in item.detail" :key="content" class="exp-job-detail">
                                    <h6>{{ content }}</h6>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Skill -->
        <section class="about-skill d-flex-center min-h-screen xl:px-20 xl:py-12 px-4 py-5 bg-main-gray ">
            <div class="about-skill-block container xl:mt-0 mt-4 mb-4">
                <!-- Skill Title -->
                <div class="lg:ps-0 md:pe-12 px-3 md:mb-12 my-2">
                    <h2 class="md:mb-6 mb-5 text-center" id="skill-title">Service & Skill</h2>
                </div>
                <!-- Skill card -->
                <div class="d-flex-center md:px-3 md:mb-0 mb-6">
                    <!-- Text -->
                    <div class="about-skill-text  flex flex-wrap">
                        <!-- Skill -->
                        <div class="about-skill-card flex-grow flex-1 max-w-full md:mx-4 xl:my-0 my-2 p-10 bg-[#d6d6d6] shadow-xl rounded-2xl"
                            v-for="skill in ExpData.service" :key="skill"
                        >
                            <h3 class="md:mb-8 mb-4" id="skill-card-title">{{skill.title}}</h3>
                            <h5 class="mb-3" id="skill-card-text"
                                v-for="(item, index) in skill.content" :key="item.name" :data-index="index"
                            >
                                {{item.name}}
                            </h5>
                        </div>
                    </div>
                </div>
                <!-- Skill Icon -->
                <div class="d-flex-center md:pe-4">
                    <div class="skill-icon-block vw-50">
                        <h3 class="md:my-12 mb-4 text-center" id="skill-tooltitle">Tools</h3>
                        <!-- tools block -->
                        <div class="skill-logo-block d-flex-center flex-wrap">
                            <div class="skill-logo-container group d-flex-center md:w-1/5"
                                v-for="(item, index) in LogoData.logo" :key="item.name" :data-index="index"
                            >
                                <div class="rounded-md group-hover:bg-gray-300 mx-1 my-1 px-4 xl:py-4 py-2 duration-300">
                                    <img :src=item.img :alt=item.name class="skill-logo max-w-full group-hover:scale-105 h-auto xl:w-12 w-10 duration-200">
                                </div>
                                <span class="absolute -bottom-2 group-hover:-bottom-5 opacity-0 group-hover:opacity-100 bg-gray-600 rounded-lg text-white px-3 py-1 duration-300">{{ item.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Contact button-->
        <!-- <section class="about-contact d-flex-center lg:px-5 px-4 py-5 bg-main-gray">
            <h2>Let's Get in Touch</h2>
            <div class="d-flex items-center">
                <router-link :to="{ name : 'Contact' }" class="nav-link px-1 py-1 me-md-5">Contact</router-link>
            </div>
        </section> -->
        <div class="about-end w-full mx-auto sm:px-4 max-w-full bg-main-gray">
            <a @click="ScrollTop" class="d-flex-center flex-col p-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chevron-compact-up mb-1" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"/>
                </svg>
                <p class="text-sm">BACK TO TOP</p>
            </a>
        </div>
    </main>
    <FooterItem />
</div>
</template>

<style scoped>
/* Mobile (below XL) */
@media only screen and (max-width: 1439px) {
    .duration-toggle{
        display: none;
    }
    .duration-toggled{
        display: block !important;
    }
    .mobile-center{
        display: flex;
        justify-content: center !important;
    }
    .skill-icon-block{
        width: 80vw !important;
    }
    .user-container{
        width: 35vmax !important;
        min-height: 40vmax !important;
    }
}
.duration-toggled{
    display: none;
}
/*-----------------------*/
/* font color */
.exp-p{
    color: rgb(179, 179, 179);
}

/*----------- Block -------------*/
.about-intro, .about-contact {
    min-height: 60vh;
}
/* ---Skill--- */
.about-skill-text{
    min-height: 20vh;
}
/*------- Job timeline-------*/
.about-job:last-child .timeline {
    height: 0;
}
.timeline {
    visibility: hidden;
    /* background-color: rgb(117, 117, 117); */
    content: '';
    position: absolute;
    /* top: 85px; */
    height: calc(100% - 10px);
    transform-origin: top;
    transform-style: preserve-3D;
}
/*------ Img --------*/
.user-container{
    width: 40vmin;
    min-height: 48vmin;
    /* clip-path: circle(200px at 50% 50%) */
    clip-path: circle(120px at 50% 50%)
    /* clip-path: xywh(0 0px 100% 100% round 15% 0); */
    /* -webkit-clip-path: xywh(0 0px 100% 100% round 15% 0); */
}
</style>
