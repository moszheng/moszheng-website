<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useNavStore } from "@/stores/navstore";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import LinkData from "@/data/LinkData.json";
import LogoData from "@/data/LogoData.json";
import ExpData from "@/data/Experience.json";

// Return Real route
const profileImage1 = "../src/img/profile_1_md.webp";
const profileImage2 = "../src/img/profile_2_md.webp";
const profileImage3 = "../src/img/02_gha56_md_02.webp";
const profileImage4 = "../src/img/profile_4_md.webp";

// Split content
const heroHello = "Hello, I'm";
const heroName = "Sheng Wen Cheng";

const introcontent1 = computed(() => {
    const arr = [];
    ExpData.about.para1.forEach((el) => {
        arr.push(el.split(" "));
    });
    return arr;
});
const introcontent2 = computed(() => {
    const arr = [];
    ExpData.about.para2.forEach((el) => {
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
const lazyloadimgs = ref(document.querySelectorAll(".lazy"));
const imgContainer = ref();
let ctx;
let matchmedia = gsap.matchMedia();
onMounted(() => {
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
                    scrub: 0.5,
                },
            }); // scale from 1.3
        });
        // window.addEventListener('mousemove', (e)=>{
        //     heroRot(e);
        // });
        // const heroRot = (e)=>{
        //     gsap.utils.toArray(".about-skill-card").forEach((el) => {
        //         let xPos = e.clientX / window.innerWidth - 0.5;
        //         let yPos = e.clientY / window.innerHeight - 0.5;
        //         // let depth = el.dataset.depth;
        //         // console.log( xPos, ", ", yPos)
        //         let depth = 1;
        //         gsap.to(el, {
        //             xPercent: xPos * depth * 1,
        //             yPercent: yPos * depth * 0.5,
        //             rotationY: xPos * depth * 1,
        //             rotationX: yPos * depth * -1,
        //         });
        //     });
        // };
    });
    /* Main GSAP Animation*/
    ctx = gsap.context((self) => {
        /* Hero Section */
        const herotl = gsap.timeline({ defaults: { ease: "back.inOut(1.7)", duration: 0.8 } });
        herotl.fromTo(".user-container", 
            { clipPath: "inset(50% 0% 50% 0% round 12% 0%)" }, 
            { clipPath: "inset(0% 0% 0% 0% round 12% 0%)", duration: 3, ease: "power4.out" }, 0);
        herotl.from(".profile-img-1 ", { scale: 2.2, duration: 3.5, ease: "power4.out" }, 0);
        herotl.from(".profile-img-2 ", { scale: 1.6, duration: 3.5, ease: "power4.out" }, 0);
        herotl.from("#hero-hello", { opacity: 0, yPercent: 150, rotationX: 90, stagger: 0.25 }, 0.45);
        herotl.from("#hero-name", { opacity: 0, yPercent: 150, rotationX: 90, rotationZ: 10, stagger: 0.1 }, 0.9);
        herotl.from("#hero-detail", { opacity: 0, yPercent: 20, ease: "power4.inOut", duration: 1.5 }, 1.2);
        herotl.from("#hero-4", { opacity: 0, yPercent: -15 }, 2.2);
        /* ----------- Intro Section ----------------*/
        const introtl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-intro",
                start: "top 65%",
                end: "bottom 30%",
                // markers: true,
            },
            defaults: { ease: "power3.out" },
        });
        introtl.fromTo(".intro-container", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 3, ease: "power4.out" }, 0);
        introtl.from(".intro-title", { opacity: 0, yPercent: 150, duration: 1, stagger: 0.1 }, 0);
        introtl.from(".split-text", { opacity: 0, yPercent: 100, duration: 0.8, stagger: 0.015 }, 0.4);
        introtl.from(".profile-img-3 ", { scale: 1.6, duration: 3.5, ease: "power4.out" }, 0);
        introtl.from(".intro-infosocial", { opacity: 0, xPercent: -30, scale: 0.8, duration: 0.5, stagger: 0.1 }, 0.45);
        introtl.from(".intro-infocontact", { opacity: 0, yPercent: 25, duration: 1.5, stagger: 0.2 }, 0.8);
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
            defaults: { ease: "power3.out" },
        });
        skilltl.from("#skill-title", { opacity: 0, yPercent: 20, duration: 1 });
        // Skill Card Group
        gsap.utils.toArray(".about-skill-card").forEach((item, i) => {
            const delay = i / 8 + 0.3;
            const cardtitle = item.querySelector("#skill-card-title");
            const cardicon = item.querySelectorAll(".skill-card-icon");
            const cardtext = item.querySelectorAll("#skill-card-text");
            // Animation
            skilltl.from(item, { opacity: 0, yPercent: 25, scale: 0.7, ease: "back.inOut(1.7)", duration: 0.8 }, delay);
            skilltl.from(cardtitle, { opacity: 0, yPercent: 100, duration: 1 }, delay + 0.6);
            skilltl.from(cardtext, { opacity: 0, yPercent: 100, duration: 1, stagger: 0.15 }, delay + 0.8);
        });
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
    <main class="bg-main-black" ref="imgContainer">
        <!-- Hero -->
        <section class="about-hero d-flex-center pt-5 xl:mt-0 mt-8 h-svh flex-wrap bg-white px-3 xl:h-screen xl:px-16 xl:py-12">
            <!-- profile image -->
            <div class="d-flex-center pl-4 pr-4 xl:w-1/2">
                <div class="user-container parallax relative max-h-[600px] overflow-hidden" data-depth="2" data-scale="1.2">
                    <div class="profile-img-1 absolute top-[8%] z-20 scale-[1.35]">
                        <div class="parallax heroRot" data-depth="1.05" data-scale="1.05">
                            <img class="lazy left-0 h-auto w-full object-cover" alt="profile_image" :src="profileImage1" />
                        </div>
                    </div>
                    <div class="profile-img-2 absolute top-[8%] z-10 scale-[1.35]">
                        <div class="parallax heroRot" data-depth="3.2" data-scale="1.15">
                            <img class="lazy left-0 h-auto w-full object-cover" alt="profile_image" :src="profileImage2" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- text -->
            <div class="about-hero-info d-flex-center xl:w-1/2 xl:ps-6">
                <div class="mb-3 md:mb-1">
                    <!-- Name -->
                    <h1 class="mobile-center mb-2 text-stone-950 md:mb-0">
                        <span v-for="(text, index) in splitText(heroHello)" :key="index" class="inline-flex pe-2 xl:pe-4">
                            <span class="block font-bold" id="hero-hello"> {{ text }} </span>
                        </span>
                    </h1>
                    <!-- Name -->
                    <h1 class="mobile-center mb-8 text-stone-950 md:mb-10">
                        <span v-for="(text, index) in splitText(heroName)" :key="index" class="inline-flex pe-2 xl:pe-4">
                            <span class="block font-bold" id="hero-name"> {{ text }} </span>
                        </span>
                    </h1>
                    <!-- Subtitle -->
                    <div class="flex">
                        <div class="mobile-center flex flex-col items-center">
                            <h4 class="mb-10 text-center text-stone-950 md:mb-12 md:text-left" id="hero-detail">
                                <strong class="text-main-orange">3D Generalist</strong> and <strong class="text-main-orange">Motion Designer</strong> <br />
                                based in Taiwan.
                            </h4>
                            <div class="text-center" id="hero-4" style="rotate: 180deg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chevron-compact-up" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Intro 2-->
        <section class="about-intro d-flex-center min-h-[80vh] rounded-b-lg bg-white p-6 xl:px-20 xl:py-12">
            <div class="about-intro-block container w-full">
                <div class="about-intro-info lg:flex items-start lg:justify-around mb-48">
                    <!-- Intro -->
                    <div class="max-w-2xl space-y-10 lg:mb-0 mb-12 pr-0 xl:pr-10 4xl:pr-5">
                        <h2 class="intro-title text-stone-950 lg:mb-16">Craft the Detail</h2>
                        <h4 v-for="(textarray, indexz) in introcontent1" :key="indexz" class="intro-info text-stone-950">
                            <span v-for="(text, index) in textarray" :key="index" class="inline-flex pe-2">
                                <span class="split-text block"> {{ text }} </span>
                            </span>
                        </h4>
                    </div>
                    <!-- Img -->                    
                    <div class="intro-container my-5 parallax relative overflow-hidden" data-scale="1.2">
                        <div class="profile-img-3 d-flex-center scale-[1.35]">
                            <div class="parallax" data-depth="3" data-scale="1.05">
                                <img class="lazy left-0 h-auto w-full object-cover" alt="profile_image" :src="profileImage3" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="about-intro-info lg:flex items-start lg:justify-around mb-36">
                    <div class="intro-container my-5 parallax relative overflow-hidden" data-scale="1.2">
                        <div class="profile-img-3 d-flex-center scale-[1.35]">
                            <div class="parallax" data-depth="3" data-scale="1.05">
                                <img class="lazy left-0 h-auto w-full object-cover" alt="profile_image" :src="profileImage4" />
                            </div>
                        </div>
                    </div>
                    <div class="max-w-2xl flex items-center lg:mb-0 mb-12 pr-0 xl:pr-10 4xl:pr-5 h-full">
                        <div class="">
                            <h2 class="intro-title text-stone-950 lg:mb-16">Every Second Counts</h2>
                            <div class="space-y-10">
                                <h4 v-for="(textarray, indexz) in introcontent2" :key="indexz" class="intro-info text-stone-950">
                                    <span v-for="(text, index) in textarray" :key="index" class="inline-flex pe-2">
                                        <span class="split-text block"> {{ text }} </span>
                                    </span>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Experience Breakpoint: xl, lg(1024) -->
        <section class="about-exp d-flex-center min-h-screen bg-main-black px-4 py-5 text-main-neutral xl:px-12">
            <div class="about-exp-block container mb-8 mt-10 flex flex-wrap lg:mb-4 xl:mt-0">
                <!-- Exp Title -->
                <div class="mb-10 px-4 pt-2 lg:mb-6 lg:w-1/3 lg:pl-0 lg:pr-10">
                    <h2 class="text-main-neutral" id="about-exp-title">Experience</h2>
                </div>
                <!-- Timeline -->
                <ul class="space-y-5 md:space-y-7 lg:w-2/3 xl:px-4">
                    <li class="about-job group flex flex-wrap" v-for="(item, index) in ExpData.experience" :key="item.company" :data-index="index">
                        <!-- Exp Job Duration & timeline -->
                        <div class="relative flex max-w-full flex-1 flex-grow flex-wrap justify-center xl:px-4">
                            <!-- Toggle Duration -->
                            <div class="duration-toggle relative max-w-full flex-1 flex-grow px-2 py-8 text-center">
                                <p>{{ item.duration }}</p>
                            </div>
                            <!-- Mid -->
                            <div class="flex w-1/4 justify-center">
                                <div class="timeline invisible top-[70px] w-px origin-top bg-gradient-to-b from-[#4e4e4e] via-[#818181] to-[#3a3a3a]"></div>
                                <div class="flex justify-center py-9">
                                    <div class="h-2.5 w-2.5 rounded-full bg-main-gray duration-200 group-hover:bg-main-orange"></div>
                                </div>
                            </div>
                        </div>
                        <!-- Exp Job Content -->
                        <div class="w-4/5 rounded-lg bg-gradient-to-r py-6 pl-2 pr-4 group-hover:from-transparent group-hover:to-[#242222] xl:w-3/4 xl:pl-4">
                            <div class="mb-6">
                                <h4 class="exp-job-title relative mb-2 max-w-full flex-1 flex-grow">{{ item.title }}</h4>
                                <div class="flex">
                                    <h6 class="exp-job-title mb-0 mr-4">{{ item.company }}</h6>
                                    <span class="duration-toggled hidden text-neutral-400">{{ item.duration }}</span>
                                </div>
                            </div>
                            <!-- Job detail -->
                            <ul class="max-w-2xl list-disc space-y-2 pl-3 text-neutral-400">
                                <li v-for="content in item.detail" :key="content" class="exp-job-detail">
                                    <h6>{{ content }}</h6>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        <!-- Thinking -->
        <!-- <section class="about-contact min-h-screen d-flex-center lg:px-5 px-4 py-5 bg-main-gray">
        <div class="flex">
            <div>
                <h1 class="text-stone-950">Procedural Thinking</h1>
                <h4> teoiutsotusotuiu1d23fsf1sd6f54s6df4 </h4>
            </div>
            <div class="space-y-5">
                <div class="flex justify-center">
                    <div>
                        <div class="d-flex-center bg-gray-400 w-96 h-24 rounded-2xl border-4 border-black">test</div>
                    </div>
                    <h4>Idea</h4>
                </div>
                <div class="flex justify-center">
                    <div>
                        <div class="d-flex-center bg-gray-400 w-96 h-24 rounded-2xl border-4 border-black">test</div>
                    </div>
                    <h4>Idea</h4>
                </div>
            </div>
        </div>
    </section> -->
        <!-- Skill -->
        <!-- bg-gradient-to-r from-[#fc7a00] to-[#ffc354] -->
        <section class="about-skill d-flex-center min-h-screen rounded-b-3xl bg-main-gray px-4 py-5 xl:rounded-b-[12em] xl:px-20 xl:py-16">
            <div class="about-skill-block container mb-4 mt-4 xl:mt-0">
                <!-- Skill Title -->
                <div class="my-2 px-3 md:mb-12 md:pe-12 lg:ps-0">
                    <h2 class="mb-5 text-center text-stone-950 md:mb-6" id="skill-title">Service & Skill</h2>
                </div>
                <!-- Skill card block -->
                <div class="d-flex-center mb-6 md:mb-6 md:px-3">
                    <!-- container -->
                    <div class="flex min-h-[20vh] flex-wrap lg:w-4/5">
                        <!-- Each Skill -->
                        <div class="about-skill-card group my-2 max-w-full flex-1 md:mx-4 xl:my-0"
                            v-for="skill in ExpData.service"
                            :key="skill"
                        >
                            <div class="h-full rounded-2xl bg-[#f0efee] p-10 shadow-xl hover:bg-main-orange hover:scale-105 duration-300">
                                <div class="skill-card-icon d-flex-center mb-20 mt-6 h-40 w-full group-hover:-translate-y-6 group-hover:scale-105">
                                    <img class="lazy h-auto w-2/3 object-cover" alt="cardimg" :src="skill.logo" />
                                </div>
                                <h3 class="mb-4 text-[#ff8a47] group-hover:text-white md:mb-8" id="skill-card-title">{{ skill.title }}</h3>
                                <h5 class="mb-3 group-hover:text-white" id="skill-card-text" v-for="(item, index) in skill.content" :key="item.name" :data-index="index">
                                    {{ item.name }}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Skill Icon -->
                <div class="d-flex-center md:pe-4">
                    <div class="skill-icon-block vw-50">
                        <div class="md:my-12 my-6">
                            <h3 class="mb-4 text-center text-stone-950" id="skill-tooltitle">Tools</h3>
                            <h5 class="text-center">My Teammate and homies</h5>
                        </div>
                        <!-- tools block -->
                        <div class="skill-logo-block d-flex-center flex-wrap">
                            <div class="skill-logo-container d-flex-center group md:w-1/5" v-for="(item, index) in LogoData.logo" :key="item.name" :data-index="index">
                                <div class="mx-1 my-1 rounded-md px-4 py-2 duration-300 group-hover:bg-neutral-300 xl:py-4">
                                    <img :src="item.img" :alt="item.name" class="skill-logo h-auto w-10 max-w-full duration-200 group-hover:scale-105 xl:w-12" />
                                </div>
                                <span
                                    class="absolute -bottom-2 rounded-lg bg-gray-900 px-3 py-1 text-white opacity-0 duration-300 group-hover:-bottom-5 group-hover:opacity-100"
                                    >{{ item.name }}</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Contact -->
        <section class="about-contact d-flex-center min-h-[75vh] w-full bg-main-black px-4 py-8 lg:px-5">
            <div class="container flex lg:justify-around flex-col lg:flex-row">
                <!-- Links -->
                <div class="px-0 md:px-12 xl:flex xl:px-0 lg:mb-0 mb-12">
                    <div class="about-intro-social">
                        <div class="fill-white mb-10">
                            <svg class="w-54 h-16" id="mos-logo">
                                <use xlink:href="#icon-mosLogo"></use>
                            </svg>
                        </div>
                        <ul class="list-reset mobile-center mb-10 flex flex-row flex-wrap">
                            <li v-for="item in LinkData.socialmedia" :key="item" class="intro-infosocial w-1/5">
                                <a class="inline-block rounded-full p-6 md:p-2" :href="item.url" target="_blank" rel="noopener">
                                    <svg class="size-7 fill-main-neutral lg:size-9" id="icon_social">
                                        <use :xlink:href="item.icon"></use>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                        <div class="mobile-center">
                            <div class="mb-4">
                                <div v-for="(item, index) in LinkData.profile_link" :key="item.text" :data-index="index" class="intro-infocontact mb-2 flex p-2">
                                    <svg class="size-6 fill-main-neutral lg:size-7" id="icon_social">
                                        <use :xlink:href="item.icon"></use>
                                    </svg>
                                    <h5 class="ml-3 text-main-neutral">{{ item.text }}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Button -->
                <div class="">
                    <h1 class="mb-12 uppercase text-main-neutral">Let's Get in Touch</h1>
                    <router-link :to="{ name: 'Contact' }" class="d-flex-center me-md-5 max-w-xl rounded-full border-4 border-main-neutral bg-transparent px-2 py-5">
                        <h3 class="text-main-neutral">Contact</h3>
                        <svg class="w-48 fill-main-neutral">
                            <use xlink:href="#icon-arrowxl"></use>
                        </svg>
                    </router-link>
                </div>
            </div>
        </section>
    </main>
</div>
</template>

<style scoped>
/* Mobile (below XL) */
@media only screen and (max-width: 1439px) {
    .duration-toggle {
        display: none;
    }
    .duration-toggled {
        display: block !important;
    }
    .mobile-center {
        display: flex;
        justify-content: center !important;
    }
    .skill-icon-block {
        width: 80vw !important;
    }
    .user-container {
        width: 35vmax !important;
        min-height: 40vmax !important;
    }
}
/*------- Job timeline-------*/
.about-job:last-child .timeline {
    height: 0;
}
.timeline {
    position: absolute;
    height: calc(100% - 10px);
}
/*------ Img --------*/
.user-container {
    width: 48vmin;
    min-height: 56vmin;
    /* width: 40vmin;
    min-height: 48vmin; */
    clip-path: inset(0% 0% 0% 0% round 12% 0%);
    -webkit-clip-path: inset(0 0% 0 0 round 12% 0%);
}
.intro-container {
    width: 70vmin;
    min-height: 45vmin;
    clip-path: inset(0% 0% 0% 0%);
    -webkit-clip-path: inset(0 0% 0 0);
}
.skill-card-icon {
    /* transition: .5s cubic-bezier(0.83, 0, 0.14, 1.02); */
    transition: 0.6s cubic-bezier(0.37, 0.23, 0.22, 0.99);
}
</style>
