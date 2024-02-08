<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useNavStore } from "@/stores/navstore";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import ExpData from "@/data/Experience.json";

import AboutExp from "@/views/AboutPageExp.vue";
import AboutSkill from "@/views/AboutPageSkill.vue";
import AboutContact from "@/views/AboutPageContact.vue";

// Return Real route
const profileImage1 = "../src/img/profile_1_md.webp";
const profileImage2 = "../src/img/profile_2_md.webp";
const profileImage3 = "../src/img/02_gha56_md_02.webp";
const profileImage4 = "../src/img/profile_4_md.webp";

const splitPara = (para) => {
    const arr = [];
    para.forEach((el) => {
        arr.push(el.split(" "));
    });
    return arr;
};
const splitText = (string) => {
    const arr = string.split(" ");
    return arr;
};
/* ------------ Transition GSAP --------------------*/
const store = useNavStore();
const changeNavbarState = (state) => {
    store.navbardarkmode = state;
};
const finishloading = ref(false);
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
    /* Async Method */
    const loadImagePromises = Array.from(lazyloadimgs.value).map((img) => {
        return new Promise((resolve) => {
            img.onload = () => {
                // console.log(img, "finished")
                loaded(img);
                resolve(img);
            };
        });
    });
    Promise.all(loadImagePromises).then(() => {
        // console.log("all finished")
        finishloading.value = true;
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
        gsap.utils.toArray(".introparallax").forEach((layer) => {
            const depth = layer.dataset.depth;
            const movement = depth * -5;
            gsap.to(layer, {
                yPercent: movement,
                ease: "none",
                scrollTrigger: {
                    trigger: ".about-intro",
                    start: "clamp(top center)",
                    end: "clamp(bottom center)",
                    scrub: 0.75,
                    // markers: true,
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
        /* ----------- Intro Section ----------------*/
        const introtl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-intro",
                start: "top 65%",
                end: "bottom 30%",
                onEnter: (self) => {
                    changeNavbarState(true);
                },
                onEnterBack: (self) => {
                    changeNavbarState(true);
                },
                onLeaveBack: (self) => {
                    changeNavbarState(false);
                },
                // markers: true,
            },
            defaults: { ease: "power3.out" },
        });
        introtl.fromTo(".intro-container", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 3, ease: "power4.out" }, 0);
        introtl.from("#intro-title", { opacity: 0, yPercent: 150, duration: 0.8, stagger: 0.1 }, 0);
        introtl.from(".split-text", { opacity: 0, yPercent: 70, duration: 1, stagger: 0.03 }, 0.4);
        introtl.from(".profile-img-3", { scale: 1.6, duration: 3.5, ease: "power4.out" }, 0);

        const introtl2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-intro-info2",
                start: "top 65%",
                end: "bottom 30%",
                // markers: true,
            },
            defaults: { ease: "power3.out" },
        });
        introtl2.fromTo(".intro-container2", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 3, ease: "power4.out" }, 0);
        introtl2.from("#intro-title2", { opacity: 0, yPercent: 150, duration: 1.5, stagger: 0.15 }, 0);
        introtl2.from(".split-text2", { opacity: 0, yPercent: 70, duration: 1, stagger: 0.03 }, 0.5);
        introtl2.from(".profile-img-4", { scale: 1.6, duration: 3.5, ease: "power4.out" }, 0);

        /* --------------- Exp Section--------------*/
        const navtl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-exp",
                start: "top top",
                end: "bottom top",
                // markers: true,
                onLeave: (self) => {
                    changeNavbarState(false);
                },
                onEnterBack: (self) => {
                    changeNavbarState(true);
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
            defaults: { ease: "power4.out" },
        });
        // exptl.from(".about-exp", { opacity: 0, duration: 0.1 });
        exptl.from(".timeline", { autoAlpha: 0, ease: "linear" }, 0); // init timeline or will flash to top(FOUC)
        exptl.from("#about-exp-title", { opacity: 0, xPercent: -15, ease: "back.inOut(1.7)", duration: 0.8 });
        exptl.from(".about-job", { opacity: 0, yPercent: -30, duration: 0.8, stagger: 0.6 }, 0.5);
        exptl.from(".exp-job-title", { opacity: 0, yPercent: -30, duration: 0.8, stagger: 0.25 }, 0.7);
        exptl.from(".exp-job-detail", { opacity: 0, yPercent: -30, duration: 0.8, stagger: 0.25 }, 0.9);
        exptl.from(".timeline", { scaleY: 0, ease: "back.Out(1.7)", duration: 0.5, stagger: 0.5 }, 1.1);
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
        // Contact G
        const contacttl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-contact",
                start: "top 80%",
                end: "bottom 30%",
            },
            defaults: { ease: "power3.Out(1.7)", duration: 0.5 },
        });
        contacttl.from("#contact-title", { opacity: 0, yPercent: 100, duration: 0.8, stagger: 0.1 }, 0);
        contacttl.from(".intro-infosocial", { opacity: 0, xPercent: -30, scale: 0.8, duration: 0.5, stagger: 0.1 }, 0.45);
        contacttl.from(".intro-infocontact", { opacity: 0, yPercent: 25, duration: 1.5, stagger: 0.2 }, 0.8);
    }, imgContainer.value);
});
onUnmounted(() => {
    ctx.revert();
    matchmedia.revert();
});

/* Enter AboutPage Motion */
const loadingEnter = (el, done) => {
    // gsap.set("#about-loadinglogo", { scale: 60, rotationZ: -30, });
    // gsap.fromTo(el, { yPercent: -200 },{ yPercent: 0, duration: 1.2, ease: "power4.inOut" });
};
/* Loading */
const loadingLeave = (el, done) => {
    const tl = gsap.timeline();
    // tl.to("#about-loadinglogo", { scale: 1, rotationZ: 0, duration: 0.75, ease: "power4.out" }, 0);
    tl.to(el, { yPercent: -100, scaleY: 0.2, delay: 0.75, duration: 1, ease: "power4.in", onStart: heroMotion });
    tl.to(el, { display: "hidden" });
};
const heroMotion = () => {
    const herotl = gsap.timeline({ defaults: { ease: "back.inOut(1.7)", duration: 0.8 } });
    herotl.fromTo(".profile-container", { clipPath: "inset(50% 0% 50% 0% round 6% 0%)" }, { clipPath: "inset(0% 0% 0% 0% round 12% 0%)", duration: 3, ease: "power4.out" }, 0.5);
    herotl.from("#profile-img-1 ", { scale: 2.2, duration: 3.5, filter: "blur(20px)", ease: "power4.out" }, 0.5);
    herotl.from("#profile-img-2 ", { scale: 1.6, duration: 3.5, filter: "blur(10px)", ease: "power4.out" }, 0.5);
    herotl.from("#hero-hello", { opacity: 0, yPercent: 150, rotationX: 90, stagger: 0.25 }, 0.9);
    herotl.from("#hero-name", { opacity: 0, yPercent: 150, rotationX: 90, rotationZ: 10, stagger: 0.1 }, 1.4);
    herotl.from("#hero-detail", { opacity: 0, yPercent: 20, ease: "power4.inOut", duration: 1.35, stagger: 0.4 }, 1.7);
    herotl.from("#hero-4", { opacity: 0, yPercent: -15 }, 2.4);
};
</script>
<template>
<div class="About">
    <Transition name="move" mode="out-in" appear 
        @enter="loadingEnter" 
        @leave="loadingLeave"
    >
        <div class="d-flex-center fixed top-0 z-[90] h-full w-full" v-show="!finishloading" id="about-loading">
            <div class="d-flex-center container z-[91] mx-auto h-full sm:px-4" id="about-loadinglogo">
                <svg id="mos-logo" class="fill-black w-48">
                    <use xlink:href="#icon-mosLogo"></use>
                </svg>
            </div>
            <div class="about-loadingbg absolute h-[300vh] w-[150vw] rounded-full bg-main-orange"></div>
        </div>
    </Transition>
    <main class="bg-main-black" ref="imgContainer">
        <div class="about-herointro duration-500" :class="{'bg-stone-100':!store.navbardarkmode, 'bg-main-black': store.navbardarkmode }">
            <!-- Hero -->
            <section class="about-hero d-flex-center h-svh flex-wrap px-3 pt-5 xl:h-screen xl:px-16 xl:py-12 xl:mb-0 mb-12">
                <!-- profile image -->
                <div class="d-flex-center mt-16 pl-4 pr-4 xl:mt-0 2xl:w-1/2 xl:mb-0 mb-5">
                    <div class="profile-container parallax relative max-h-[600px] overflow-hidden" data-depth="2" data-scale="1.2">
                        <figure class="absolute z-20 scale-[1.2] blur-none h-full" id="profile-img-1">
                            <div class="parallax heroRot h-full" data-depth="1.05" data-scale="1.05">
                                <img class="lazy aspect-3/2 h-full object-cover" alt="profile_image" :src="profileImage1" />
                            </div>
                        </figure>
                        <figure class="absolute z-10 scale-[1.2] blur-none h-full" id="profile-img-2">
                            <div class="parallax heroRot h-full" data-depth="3.2" data-scale="1.15">
                                <img class="lazy aspect-3/2 h-full object-cover" alt="profile_image" :src="profileImage2" />
                            </div>
                        </figure>
                    </div>
                </div>
                <!-- Hero text -->
                <div class="about-hero-info d-flex-center 2xl:w-1/2 2xl:ps-6"
                    :class="{'text-main-neutral':store.navbardarkmode, 'text-stone-950': !store.navbardarkmode }"
                >
                    <div class="relative mb-3 md:mb-1">
                        <!-- <div class="absolute right-[10%] xl:-top-4">
                            <svg class="icon-gear size-24 fill-main-orange">
                                <use xlink:href="#icon-gear"></use>
                            </svg>
                        </div> -->
                        <!-- Name -->
                        <h1 class="mobile-center mb-2 md:mb-0">
                            <span v-for="(text, index) in splitText('Hello, I\'m')" :key="index" class="inline-flex pe-2 xl:pe-4">
                                <span class="block font-bold" id="hero-hello"> {{ text }} </span>
                            </span>
                        </h1>
                        <!-- Name -->
                        <h1 class="mobile-center mb-8 md:mb-10">
                            <span v-for="(text, index) in splitText('Sheng Wen Cheng')" :key="index" class="inline-flex pe-2 xl:pe-4">
                                <span class="block font-bold" id="hero-name"> {{ text }} </span>
                            </span>
                        </h1>
                        <!-- Subtitle -->
                        <div class="flex">
                            <div class="mobile-center flex flex-col items-center">
                                <h4 class="mb-10 text-center md:mb-12 md:text-left">
                                    <span class="block font-bold" id="hero-detail">
                                        <strong class="text-main-orange">3D Generalist</strong> and <strong class="text-main-orange">Motion Designer</strong> <br />
                                    </span>
                                    <span class="block font-bold" id="hero-detail">
                                        based in Taiwan.
                                    </span>
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
            <!-- Intro -->
            <section class="about-intro d-flex-center min-h-[85vh] rounded-b-lg p-6 xl:px-20 xl:py-12"
                :class="{'text-main-neutral':store.navbardarkmode, 'text-stone-950': !store.navbardarkmode }"
            >
                <div class="about-intro-block container w-full">
                    <!-- Group1 -->
                    <div class="about-intro-info mb-16 min-h-[70vh] items-center lg:flex lg:justify-around xl:mb-24">
                        <!-- Intro -->
                        <div class="mb-12 flex h-full max-w-2xl pr-0 lg:mb-0 xl:w-2/5 xl:pr-10 4xl:pr-5">
                            <div class="">
                                <h2 class="mb-8 inline-block overflow-hidden xl:mb-16 pb-1">
                                    <span v-for="(text, index) in splitText(ExpData.about.para1.title)" :key="index" class="inline-flex pe-2 xl:pe-4">
                                        <span class="block font-bold" id="intro-title"> {{ text }} </span>
                                    </span>
                                </h2>
                                <div class="space-y-10">
                                    <h4 v-for="(textarray, indexz) in splitPara(ExpData.about.para1.content)" :key="indexz" class="intro-info leading-normal">
                                        <span v-for="(text, index) in textarray" :key="index" class="inline-block pe-2">
                                            <span class="split-text inline-block"> {{ text }} </span>
                                        </span>
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <!-- Img -->
                        <div class="intro-container relative overflow-hidden xl:w-1/2">
                            <!-- <div class="intro-reveal absolute top-0 left-0 z-50 w-full h-full bg-main-orange"></div> -->
                            <figure class="profile-img-3 d-flex-center scale-[1.2]">
                                <div class="introparallax" data-depth="3">
                                    <img class="lazy left-0 h-auto w-full object-cover" alt="profile_image" :src="profileImage3" />
                                </div>
                            </figure>
                        </div>
                    </div>
                    <!-- Group2 -->
                    <div class="about-intro-info2 mb-16 min-h-[70vh] items-center lg:flex lg:justify-around">
                        <!-- Img -->
                        <div class="intro-container2 relative overflow-hidden xl:w-1/2 xl:mb-0 mb-8">
                            <figure class="profile-img-4 d-flex-center scale-[1.35]">
                                <div class="introparallax" data-depth="3">
                                    <img class="lazy left-0 h-auto w-full object-cover" alt="profile_image" :src="profileImage4" />
                                </div>
                            </figure>
                        </div>
                        <!-- Intro -->
                        <div class="mb-12 flex h-full max-w-2xl pl-0 lg:mb-0 xl:pl-12 4xl:pr-5">
                            <div class="">
                                <h2 class="intro-title2 mb-8 inline-block overflow-hidden xl:mb-16">
                                    <span v-for="(text, index) in splitText(ExpData.about.para2.title)" :key="index" class="inline-flex pe-2 xl:pe-4">
                                        <span class="inline-block font-bold" id="intro-title2"> {{ text }} </span>
                                    </span>
                                </h2>
                                <div class="space-y-10 xl:mb-16 mb-8">
                                    <h4 v-for="(textarray, indexz) in splitPara(ExpData.about.para2.content)" :key="indexz" class="intro-info leading-normal">
                                        <span v-for="(text, index) in textarray" :key="index" class="inline-block pe-2">
                                            <span class="split-text2 inline-block"> {{ text }} </span>
                                        </span>
                                    </h4>
                                </div>
                                <!-- <LineBottom :to="" :Word=""/> -->
                                <div class="group max-w-sm">
                                    <router-link :to="{ name: 'Works' }" class="line-btn me-md-5 px-1 group-hover:-translate-y-3 duration-200">
                                        <h3 class= "group-hover:text-black duration-300">
                                            Works
                                        </h3>
                                        <svg class="lg:h-18 h-24 w-36 fill-main-neutral group-hover:fill-black lg:w-36">
                                            <use xlink:href="#icon-arrowxl"></use>
                                        </svg>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <!-- <section class="d-flex-center w-full h-24 text-white">
            <div class="">
                <h3 class=""> Mos </h3>
            </div>
        </section> -->
        <AboutExp />
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
        <AboutSkill />
        <AboutContact />
    </main>
</div>
</template>

<style scoped>
/* Mobile (below XL) */
@media only screen and (max-width: 1439px) {
    .mobile-center {
        display: flex;
        justify-content: center !important;
    }
    .profile-container {
        width: 35vmax !important;
        min-height: 40vmax !important;
    }
}

@keyframes rotation {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@keyframes gearRotation {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(25deg);
    }
}
.icon-gear{
    /* animation: gearRotation 1s cubic-bezier(0.075, 0.82, 0.165, 1) infinite; */
    animation: rotation 10s linear infinite;
}
/*------ Img --------*/
.profile-container {
    width: 48vmin;
    min-height: 56vmin;
    clip-path: inset(0% 0% 0% 0% round 12% 0%);
    -webkit-clip-path: inset(0 0% 0 0 round 12% 0%);
}
.intro-container {
    min-height: 20vmin;
    clip-path: inset(0% 0% 0% 0%);
    -webkit-clip-path: inset(0 0% 0 0);
}
.intro-container2 {
    min-height: 20vmin;
    clip-path: inset(0% 0% 0% 0%);
    -webkit-clip-path: inset(0 0% 0 0);
}
</style>
