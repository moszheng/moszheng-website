<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useNavStore } from "@/stores/navstore";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import LogoData from "@/data/LogoData.json";
import ExpData from "@/data/Experience.json";

import AboutExp from "@/views/AboutPageExp.vue";
import AboutContact from "@/views/AboutPageContact.vue";

// Return Real route
const profileImage1 = "../src/img/profile_1_md.webp";
const profileImage2 = "../src/img/profile_2_md.webp";
const profileImage3 = "../src/img/02_gha56_md_02.webp";
const profileImage4 = "../src/img/profile_4_md.webp";

// Split content
const heroHello = "Hello, I'm";
const heroName = "Sheng Wen Cheng";

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
    lazyloadimgs.value.forEach(function (img) {
        if (img.complete) {
            loaded(img);
        } else {
            img.addEventListener("load", loaded);
        }
    });
    finishloading.value = true;
    // const loadImagePromises = Array.from(lazyloadimgs.value).map((img) => {
    //     return new Promise((resolve) => {
    //         if (img.complete) {
    //             console.log("finished")
    //             loaded(img);
    //             resolve("loading finished");
    //         } else {
    //             img.addEventListener("load", loaded);
    //             resolve("loading finished");
    //         }
    //     });
    // });
    // Promise.all(loadImagePromises).then(() => {
    //     console.log("all finished")
    //     herotl.play();
    // });
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
            const movement = depth * -4;
            gsap.to(layer, {
                yPercent: movement,
                ease: "none",
                scrollTrigger: {
                    trigger: ".about-intro",
                    start: "clamp(top center)",
                    end: "clamp(bottom center)",
                    scrub: 0.5,
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
        introtl.from("#intro-title", { opacity: 0, yPercent: 150, duration: 0.8, stagger: 0.1 }, 0);
        introtl.from(".split-text", { opacity: 0, yPercent: 90, duration: 1, stagger: 0.03 }, 0.4);
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
        introtl2.from(".split-text2", { opacity: 0, yPercent: 90, duration: 1, stagger: 0.03 }, 0.5);
        introtl2.from(".profile-img-4", { scale: 1.6, duration: 3.5, ease: "power4.out" }, 0);
        
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
            defaults: { ease: "power4.out" },
        });
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
                // markers: true,
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

/* GSAP */
/* Transition GSAP */
const beforeEnter = (el) => {
    el.style.opacity = 0;
};
const enter = (el, done) => {
    gsap.to(el, { opacity: 1, duration: 1, ease: "power3.Out", onComplete: done });
};
/* Loading */
const loadingLeave = (el, done) => {
    const tl = gsap.timeline();
    tl.to(el, {
        yPercent: -100,
        delay: 1.5,
        duration: 0.75,
        ease: "power4.out",
        onComplete: done,
        // onComplete: homemotion,
    });
};
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
        <!-- <Transition name="move" mode="out-in" 
            @before-enter="beforeEnter" 
            @enter="enter" 
            @leave="loadingLeave"
        >
            <div class="index-loading absolute top-0 z-20 h-full w-full bg-black" v-show="!finishloading">
                <div class="d-flex-center container mx-auto h-full sm:px-4">
                    <svg id="mos-logo" class="fill-white">
                        <use xlink:href="#icon-mosLogo"></use>
                    </svg>
                </div>
            </div>
        </Transition> -->
        <!-- Hero -->
        <section class="about-hero d-flex-center pt-5 xl:mt-0 mt-8 h-svh flex-wrap bg-white px-3 xl:h-screen xl:px-16 xl:py-12">
            <!-- profile image -->
            <div class="d-flex-center pl-4 pr-4 2xl:w-1/2">
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
            <div class="about-hero-info d-flex-center 2xl:w-1/2 2xl:ps-6">
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
                <!-- Group1 -->
                <div class="about-intro-info lg:flex items-center lg:justify-around min-h-[40vh] xl:mb-48 mb-24 ">
                    <!-- Intro -->
                    <div class="max-w-2xl flex lg:mb-0 mb-12 pr-0 xl:pr-10 4xl:pr-5 h-full">
                        <div class="">
                            <h2 class="text-stone-950 xl:mb-16 mb-8">
                                <span v-for="(text, index) in splitText('Craft the Detail')" :key="index" class="inline-flex pe-2 xl:pe-4">
                                    <span class="block font-bold" id="intro-title"> {{ text }} </span>
                                </span>
                            </h2>
                            <div class="space-y-10 ">
                                <h4 v-for="(textarray, indexz) in splitPara(ExpData.about.para1)" :key="indexz" class="intro-info leading-normal text-stone-950">
                                    <span v-for="(text, index) in textarray" :key="index" class="inline-flex pe-2">
                                        <span class="split-text block"> {{ text }} </span>
                                    </span>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <!-- Img -->                    
                    <div class="intro-container xl:w-1/2 relative overflow-hidden">
                        <!-- <div class="intro-reveal absolute top-0 left-0 z-50 w-full h-full bg-main-orange"></div> -->
                        <div class="profile-img-3 d-flex-center scale-[1.35]">
                            <div class="introparallax" data-depth="3">
                                <img class="lazy left-0 h-auto w-full object-cover" alt="profile_image" :src="profileImage3" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Group2 -->
                <div class="about-intro-info2 lg:flex items-center lg:justify-around min-h-[40vh] mb-36">
                    <!-- Img -->
                    <div class="intro-container2 xl:w-1/2 my-5 relative overflow-hidden">
                        <div class="profile-img-4 d-flex-center scale-[1.35]">
                            <div class="introparallax" data-depth="3">
                                <img class="lazy left-0 h-auto w-full object-cover" alt="profile_image" :src="profileImage4" />
                            </div>
                        </div>
                    </div>
                    <!-- Intro -->
                    <div class="max-w-2xl flex lg:mb-0 mb-12 pl-0 xl:pl-12 4xl:pr-5 h-full">
                        <div class="">
                            <h2 class="intro-title2 text-stone-950 xl:mb-16 mb-8">
                                <span v-for="(text, index) in splitText('Every Second Counts')" :key="index" class="inline-flex pe-2 xl:pe-4">
                                    <span class="block font-bold" id="intro-title2"> {{ text }} </span>
                                </span>
                            </h2>
                            <div class="space-y-10">
                                <h4 v-for="(textarray, indexz) in splitPara(ExpData.about.para2)" :key="indexz" class="intro-info leading-normal text-stone-950">
                                    <span v-for="(text, index) in textarray" :key="index" class="inline-flex pe-2">
                                        <span class="split-text2 block"> {{ text }} </span>
                                    </span>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
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
                <div class="d-flex-center py-12">
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
    .skill-icon-block {
        width: 80vw !important;
    }
    .user-container {
        width: 35vmax !important;
        min-height: 40vmax !important;
    }
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
    min-height: 20vmin;
    clip-path: inset(0% 0% 0% 0%);
    -webkit-clip-path: inset(0 0% 0 0);
}
.intro-container2 {
    min-height: 20vmin;
    clip-path: inset(0% 0% 0% 0%);
    -webkit-clip-path: inset(0 0% 0 0);
}
.skill-card-icon {
    /* transition: .5s cubic-bezier(0.83, 0, 0.14, 1.02); */
    transition: 0.6s cubic-bezier(0.37, 0.23, 0.22, 0.99);
}
</style>
