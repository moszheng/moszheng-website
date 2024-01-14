<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import {useNavStore} from '@/stores/navstore';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import FooterItem from '@/components/FooterItem.vue';
import LinkData from '@/data/LinkData.json';
import LogoData from '@/data/LogoData.json';
import ExpData from '@/data/Experience.json';

// Return Real route
const profileImage1 = '../src/img/profile_1.png';
const profileImage2 = '../src/img/profile_2.png';

/* ------------ Transition GSAP --------------------*/
const store = useNavStore();
const changeNavbarState = (state) => {
    store.navbardarkmode = state;
};
const lazyloadimgs = ref(document.querySelectorAll('.lazy'));
const imgContainer = ref();
let ctx;
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
    /* Main GSAP Animation*/
    ctx = gsap.context((self) => {
        // window.addEventListener('mousemove', (e)=>{
        //     heroRot(e);
        // });
        /* ----------- Depth --------------- */
        // const depthtl = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: ".about-hero",
        //         start: "top top",
        //         end: "bottom 30%",
        //         // markers: true,
        //         scrub: true,
        //     },
        // });
        // gsap.utils.toArray(".parallax").forEach((layer) => {
        //     const depth = layer.dataset.depth;
        //     const movement = depth * -25;
        //     depthtl.to(layer, {y: movement, ease: "none"}, 0);
        // });
        const heroRot = (e)=>{
            gsap.utils.toArray(".heroRot").forEach((el) => {
                let xPos = e.clientX / window.innerWidth - 0.5;
                let yPos = e.clientY / window.innerHeight - 0.5;
                let depth = el.dataset.depth;
                gsap.to(el, {
                    xPercent: xPos * depth * 40,
                    yPercent: yPos * depth * 10,
                    rotationY: xPos * depth * 10,
                    rotationX: yPos * depth * 10,
                    stagger: 0.055,
                });
            });
        };
        /* Hero Section */
        const herotl = gsap.timeline({});
        herotl.from("#hero-1", {opacity: 0, yPercent: 150, rotationX: 90, ease: "back.inOut(1.7)", duration: 0.8}, 0.3);
        herotl.from("#hero-2", {opacity: 0, yPercent: 150, rotationX: 90, ease: "back.inOut(1.7)", duration: 0.8}, 0.5);
        herotl.from("#hero-3", {opacity: 0, yPercent: 20, ease: "power4.inOut(1.7)", duration: 1.5}, 0.8);
        herotl.from("#hero-4", {opacity: 0, yPercent: -15, ease: "back.inOut(1.7)", duration: 0.75}, 2);
        /* Intro Section*/
        const introtl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-intro",
                start: "top 65%",
                end: "bottom 30%",
                // markers: true,
            },
        });
        introtl.to("#hero-4", {opacity: 0, yPercent: 0, ease: "power4.inOut(1.7)", duration: 2});
        introtl.from(".intro-info", {opacity: 0, yPercent: 25, ease: "power3.Out(1.7)", duration: 0.8, stagger: 0.25}, 0);
        introtl.from(".intro-infosocial", {opacity: 0, xPercent: -30, scale: 0.5, ease: "power3.Out(1.7)", duration: 0.5, stagger: 0.1}, 0.35);
        introtl.from(".intro-infocontact", {opacity: 0, yPercent: 20, ease: "power3.Out(1.7)", duration: 1, stagger: 0.2}, 0.5);
        /* --------------- Exp Section--------------*/
        const exptl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-exp-block",
                start: "top 80%",
                end: "bottom+=300 top",
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
                // markers: true,
            },
        });
        exptl.from(".timeline", {autoAlpha: 0, ease: "linear"}, 0); // init timeline or will flash to top(FOUC)
        exptl.from("#about-exp-title", {opacity: 0, xPercent: -100, ease: "back.inOut(1.7)", duration: 0.8});
        exptl.from(".about-job", {opacity: 0, yPercent: -40, ease: "power3.Out(1.7)", duration: 0.8, stagger: 0.25}, 0.5);
        exptl.from(".exp-job-title", {opacity: 0, yPercent: -30, ease: "power3.Out(1.7)", duration: 0.5, stagger: 0.15}, 0.7);
        exptl.from(".exp-job-detail", {opacity: 0, yPercent: -40, ease: "power3.Out(1.7)", duration: 0.8, stagger: 0.15}, 0.9);
        exptl.from(".timeline", {scaleY: 0, ease: "back.Out(1.7)", duration: 0.5, stagger: 0.5}, 1);
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
        });
        skilltl.from("#skill-title", {opacity: 0, yPercent: 20, ease: "power3.Out(1.7)", duration: 1});
        // Skill Card Group
        gsap.utils.toArray(".about-skill-card").forEach((item, i) => {
            const delay = i / 8 + 0.5;
            const cardtitle = item.querySelector("#skill-card-title");
            const cardtext = item.querySelectorAll("#skill-card-text");
            // Animation
            skilltl.from(item, {opacity: 0, yPercent: 25, scale: 0.8, ease: "power3.Out(1.7)", duration: 0.3}, delay);
            skilltl.from(cardtitle, {opacity: 0, yPercent: 20, rotateX: 45, ease: "power3.Out(1.7)", duration: 1}, delay + 0.1);
            skilltl.from(cardtext, {opacity: 0, yPercent: 20, ease: "power3.Out(1.7)", duration: 0.5, stagger: 0.1}, delay + 0.25);
        });
        skilltl.from("#skill-sep", {scaleX: 0, ease: "back.Out(1.7)", duration: 1}, 1);
        // Skill Icon Group
        skilltl.from("#skill-tooltitle", {opacity: 0, yPercent: 20, rotateX: 40, ease: "power3.Out(1.7)", duration: 0.5}, 1.5);
        skilltl.from(".skill-logo-container", {opacity: 0, yPercent: 20, scale: 0.8, ease: "power3.Out(1.7)", duration: 0.5, stagger: 0.1}, 1.5);
    }, imgContainer.value);
});
onUnmounted(() => {
    ctx.revert();
});

/* GSAP */
function ScrollTop() {
    window.scrollTo(0, 0);
}

</script>
<template>
<div class="About">
    <main class="container-fluid" ref="imgContainer">
        <!-- Hero -->
        <section class="about-hero d-flex-center row px-md-4 px-3 py-xl-5 py-3">
            <!-- profile image -->
            <div class="heroRot col-xl-6 d-flex-center">
                <div class="user-container heroRot mb-md-0 mb-3" data-depth='0.25'>
                    <img class="avatar-user_1 heroRot parallax lazy" data-depth='1' alt="profile_image" :src=profileImage1>
                    <img class="avatar-user_2 heroRot parallax lazy" data-depth='3' alt="profile_image" :src=profileImage2>
                </div>
            </div>
            <!-- text -->
            <div class="about-hero-info parallax col-xl-6 mt-xl-0 mt-4 px-xl-0 px-md-5 px-0" data-depth='5'>
                <div class="mb-md-1 mb-3">
                    <!-- Name -->
                    <h1 class="mobile-center mb-md-2 mb-2" id="hero-1">Hello, I'm</h1>
                    <!-- Name -->
                    <h1 class="mobile-center mb-md-5 mb-4" id="hero-2">Sheng Wen Cheng</h1>
                    <!-- Subtitle -->
                    <div class="">
                        <div class="mobile-center">
                            <h4 class="mb-md-5 mb-4 px-xl-0 px-3" id="hero-3">
                                A <strong class="text-primary">3D Generalist</strong> and <strong class="text-primary">Motion Designer</strong>
                                <br> based in Taiwan.
                            </h4>
                        </div>
                        <div class=" text-center" id="hero-4" style="rotate: 180deg;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chevron-compact-up" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Intro 2-->
        <section class="about-intro d-flex-center mb-xl-0 mb-5 px-md-5 px-3 py-xl-5 py-3">
            <div class="about-intro-block w-100">
                <!-- text -->
                <div class="about-intro-info d-flex align-items-start mb-md-5 mb-4">
                    <!-- Intro -->
                    <div>
                        <h5 class="intro-info mb-4">As a diverse motion designer, I am eager to explore the possibilities of animation, focusing on creating stunning vision throught keen insights and pushing team's ideas to practice. Take on challenges in any project and develop workflows or pipelines to solve problems.</h5>
                        <h5 class="intro-info mb-4">Worked at JL Design and Mixcode as Motion Designer from 2018 to 2023 and we made several brilliant achievement including awarded TV packages.</h5>
                        <h5 class="intro-info">For any inquiries,<strong> please contact me</strong></h5>
                    </div>
                </div>
                <div class="d-xl-flex justify-content-end mt-xl-0 mt-4 px-xl-0 px-md-5 px-0">
                    <div class="about-intro-social">
                        <!-- Social media -->
                        <ul class="navbar-nav flex-row mobile-center mb-4">
                            <li v-for="item in LinkData.socialmedia" :key="item" class="nav-item intro-infosocial col-2 col-md-auto">
                                <a class="nav-link p-2" :href="item.url" target="_blank" rel="noopener">
                                    <svg id="icon_social">
                                        <use :xlink:href="item.icon"></use>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                        <!-- Contact info -->
                        <div class="mobile-center">
                            <div class="mb-4">
                                <div v-for="(item, index) in LinkData.profile_link" :key="item.text" :data-index="index" class="intro-infocontact mb-2 p-2">
                                    <svg id="icon_social">
                                        <use :xlink:href="item.icon"></use>
                                    </svg>
                                    <span class="ms-3">{{ item.text }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Experience -->
        <section class="about-exp d-flex-center px-lg-5 px-3 text-white">
            <div class="about-exp-block row mt-xl-0 mt-4 mb-4">
                <!-- Exp Title -->
                <div class="col-lg-3" >
                    <h2 class="mb-xl-4 mb-5" id="about-exp-title">Experience</h2>
                </div>
                <div class="col-lg-9 px-xl-3">
                    <div class="about-job row mb-3 mt-3" v-for="(item, index) in ExpData.experience" :key="item.company" :data-index="index">
                        <!-- Exp Job Duration & timeline -->
                        <div class="row col d-flex justify-content-center">
                            <!-- Toggle Duration -->
                            <div class="col text-center duration-toggle">
                                <p>{{item.duration}}</p>
                            </div>
                            <!-- Mid -->
                            <div class="d-flex justify-content-center col-3">
                                <div class="timeline"></div>
                                <div class="d-flex justify-content-center">
                                    O
                                </div>
                            </div>
                        </div>
                        <!-- Exp Job Content -->
                        <div class="col-xl-9 col-10">
                            <div class="row mb-4">
                                <h4 class="exp-job-title col mb-2">{{ item.title }}</h4>
                                <div class="d-flex">
                                    <h6 class="exp-job-title me-4 mb-0">{{ item.company }}</h6>
                                    <span class="exp-p duration-toggled">{{item.duration}}</span>
                                </div>
                            </div>
                            <!-- Job detail -->
                            <ul class="exp-p">
                                <li v-for="content in item.detail" :key="content" class="exp-job-detail">
                                    <p>{{ content }}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Skill -->
        <section class="about-skill d-flex-center px-lg-5 px-4 py-5">
            <div class="about-skill-block mt-xl-0 mt-4 mb-4">
                <!-- Skill Title -->
                <div class="ps-lg-0 pe-md-5 px-3 mb-md-5 mb-2">
                    <h2 class="mb-md-4 mb-5 text-center" id="skill-title">Service & Skill</h2>
                </div>
                <!-- Skill card -->
                <div class="d-flex-center px-3">
                    <!-- Text -->
                    <div class="about-skill-text row">
                        <!-- Skill -->
                        <div class="about-skill-card col mx-2 my-xl-0 my-2 py-4 px-4" v-for="skill in ExpData.service" :key="skill">
                            <h3 class="mb-md-5 mb-4" id="skill-card-title">{{skill.title}}</h3>
                            <h5 class="mb-3 " id="skill-card-text"
                                v-for="(item, index) in skill.content" :key="item.name" :data-index="index"
                            >
                                {{item.name}}
                            </h5>
                        </div>
                    </div>
                </div>
                <hr class="my-5" id="skill-sep">
                <!-- Skill Icon -->
                <div class="d-flex-center pe-md-3">
                    <div class="skill-icon-block">
                        <h3 class="mb-md-5 mb-4 text-center" id="skill-tooltitle">Tools</h3>
                        <!-- tools block -->
                        <div class="skill-logo-block d-flex-center flex-wrap">
                            <div class="skill-logo-container d-flex-center col-md-2 col-3 mx-1 my-1 px-1 py-xl-3 py-2"
                                v-for="(item, index) in LogoData.logo" :key="item.name" :data-index="index"
                            >
                                <img :src=item.img :alt=item.name class="img-fluid skill-logo">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Contact button-->
        <!-- <section class="about-contact d-flex-center px-lg-5 px-4 py-5">
        </section> -->
        <div class="about-end container-fluid text-center">
            <a @click="ScrollTop()" class="nav-link p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chevron-compact-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"/>
                </svg>
                <p>BACK TO TOP</p>
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
        max-height: 600px;
    }
    .skill-logo{
        width: 50px !important;
    }
}
.duration-toggled{
    display: none;
}
/* lazy load */
.lazy.loaded{
    opacity: 1;
    transition: all 0.5s;
}
.lazy{
    opacity: 0;
}
/*-----------------------*/
main{
    padding-right: 0 !important;
    padding-left: 0 !important;
}
/* font color */
.exp-p{
    color: rgb(179, 179, 179);
}

/*----------- Block -------------*/
.about-hero{
    min-height: 85vh;
}
.about-intro {
    min-height: 60vh;
}
.about-intro-block, .about-exp-block {
    max-width: 1800px;
}
.about-hero-info, .about-intro-info{
    max-width: 920px;
}
.about-exp, .about-skill{
    min-height: 95vh;
}
/* ---Skill--- */
.about-skill-block{
    min-width: 70vw;
}
.skill-icon-block{
    width: 50vw;
}
.about-skill-text{
    /* min-width: 75vw; */
    min-height: 20vh;
}
.about-skill-card{
    min-width: 400px;
    max-width: 600px;
    background-color: rgb(218, 219, 219);
    border-radius: 25px;
}
/* BG color */
.about-exp{
    background-color: rgb(22, 22, 22) ;
}

.about-skill, .about-contact, .about-end{
    background-color: rgb(228, 228, 228);
}

/*------- Job timeline-------*/
.about-job:last-child .timeline {
    height: 0;
}
.timeline {
    visibility: hidden;
    background-color: rgb(117, 117, 117);
    content: '';
    position: absolute;
    top: 40px;
    width: 1px;
    height: calc(100% - 30px);
    transform-origin: top;
    transform-style: preserve-3D;
}

/*------ Img --------*/
.user-container{
    position: relative;
    width: 40vmin;
    min-height: 48vmin;
    max-height: 600px;
    overflow: hidden;
    /* background-color: rgb(39, 39, 39); */
    border-radius: 20px;
    filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.3));
}
.avatar-user_1, .avatar-user_2{
    position: absolute;
    top: 8%;
    left: 0;
    width: 100%;
    height: auto;
    object-fit: cover;
}
.avatar-user_1{
    transform: scale(1.25);
    z-index: 20;
}
.avatar-user_2 {
    transform: scale(1.3);
    z-index: 10;
}
.skill-logo{
    /* scale: 50%; */
    width: 65px;
    transition: .2s ease;
}
.skill-logo:hover{
    transform: scale(1.1);
}
</style>
