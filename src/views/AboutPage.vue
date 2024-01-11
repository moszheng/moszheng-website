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
const isVisible = ref([false, false]);
const store = useNavStore();
const changeNavbarState = (state) => {
    store.navbardarkmode = state;
};
// Attach the observer to the target element
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

    /* Scroll profile picture*/
    ctx = gsap.context((self) => {
        /* ----------- Depth --------------- */
        const depthtl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-hero",
                start: "top top",
                end: "bottom 30%",
                // markers: true,
                scrub: true,
            },
        });
        gsap.utils.toArray(".parallax").forEach((layer) => {
            const depth = layer.dataset.depth;
            const movement = depth * -10;
            depthtl.to(layer, {y: movement, ease: "none"}, 0);
        });
        /* Hero Section */
        const herotl = gsap.timeline({});
        herotl.from("#name1", {opacity: 0, y: 150, ease: "back.inOut(1.7)", duration: 0.6}, 0.3);
        herotl.from("#name2", {opacity: 0, y: 150, ease: "back.inOut(1.7)", duration: 0.6}, 0.5);
        herotl.from("#name3", {opacity: 0, y: 20, ease: "power4.inOut(1.7)", duration: 1.5}, 0.8);
        /* Intro Section*/
        const introtl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-intro",
                start: "top center",
                end: "bottom 30%",
                // markers: true,
            },
        });
        introtl.from(".about-intro-info", {opacity: 0, y: 20, ease: "power3.Out(1.7)", duration: 1});
        introtl.from(".about-intro-social", {opacity: 0, y: 20, ease: "power3.Out(1.7)", duration: 1.5}, 0.3);
        /* Skill Section */
        const skilltl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-skill",
                start: "top center",
                end: "bottom 30%",
                markers: true,
            },
        });
        skilltl.from("#skill-title", {opacity: 0, y: 20, ease: "power3.Out(1.7)", duration: 1});
        skilltl.from("#skill-each-title", {opacity: 0, y: 20, ease: "power3.Out(1.7)", duration: 1}, 0.5);
        gsap.utils.toArray(".about-skill-each").forEach((text, i) => {
            const delay = i / 2.5 + 0.5;
            skilltl.from(text, {opacity: 0, y: 25, ease: "power3.Out(1.7)", duration: 1}, delay);
        });
        gsap.utils.toArray("#skill-each-text").forEach((text, i) => {
            const delay = i / 10 + 1;
            skilltl.from(text, {opacity: 0, y: 20, ease: "power3.Out(1.7)", duration: 0.5}, delay);
        });
        skilltl.from("#skill-tooltitle", {opacity: 0, y: 20, ease: "power3.Out(1.7)", duration: 1}, 2);
        gsap.utils.toArray(".skill-logo").forEach((text, i) => {
            const delay = i / 10 + 2;
            skilltl.from(text, {opacity: 0, y: 20, ease: "power3.Out(1.7)", duration: 0.5}, delay);
        });
        /* ------ Visible Trigger --------------*/
        gsap.utils.toArray(".isVisible").forEach((section, i) => {
            ScrollTrigger.create({
                trigger: section,
                start: "20% center",
                end: "bottom 50%+=100px",
                // markers: true,
                onToggle: (self) => {
                    isVisible.value[i] = true;
                    changeNavbarState(true);
                },
            });
        });
    }, imgContainer.value);
});
onUnmounted(() => {
    ctx.revert();
    intentObserver.revert();
});

/* GSAP */
const beforeEnter = (el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(50px)';
};
const enter = (el, done) => {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        delay: el.dataset.index * 0.2 + 0.8,
        duration: 0.4,
        ease: 'power3.Out',
        onComplete: done,
    });
    const timelineobj = el.querySelector('.timeline');
    setTimeout(() => {
        timelineobj.classList.add('timelinestart');
    }
    , el.dataset.index * 500 + 800 );
};

const sigleEnter = (el, done) => {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        onComplete: done,
    });
};

const leave = (el, done) => {
    gsap.to(el, {
        opacity: 0,
        y: 80,
        duration: el.dataset.index * 0.4,
        onComplete: done,
    });
};

function ScrollTop() {
    window.scrollTo(0, 0);
}

</script>
<template>
<div class="About">
    <main class="container-fluid" ref="imgContainer">
        <!-- Hero -->
        <section class="about-hero d-flex-center row px-md-4 px-3 py-5">
            <!-- profile image -->
            <div class="col-xl-6 d-flex-center">
                <div class="user-container mb-md-0 mb-3">
                    <img class="avatar-user_1 parallax lazy" data-depth='2.5' alt="profile_image" :src=profileImage1>
                    <img class="avatar-user_2 parallax lazy" data-depth='5' alt="profile_image" :src=profileImage2>
                </div>
            </div>
            <!-- text -->
            <div class="about-hero-info parallax col-xl-6 mt-xl-0 mt-4 px-xl-0 px-md-5 px-0" data-depth='20'>
                <div class="mb-md-5 mb-4">
                    <!-- Name -->
                    <h1 class="name mb-md-2 mb-2" id="name1">Hello, I'm</h1>
                    <!-- Name -->
                    <h1 class="name mb-md-5 mb-4" id="name2">Sheng Wen Cheng</h1>
                    <!-- Subtitle -->
                    <div class="name">
                        <h4 class="mb-md-5 mb-4" id="name3">
                            A <strong class="text-primary">3D Generalist</strong> and <strong class="text-primary">Motion Designer</strong>
                            <br> based in Taiwan.
                        </h4>
                    </div>
                </div>
            </div>
        </section>
        <!-- Intro 2-->
        <section class="about-intro d-flex-center px-md-5 px-3 py-5">
            <div class="about-intro-block w-100">
                <!-- text -->
                <div class="about-intro-info d-flex align-items-start mb-md-5 mb-4">
                    <!-- Intro -->
                    <div>
                        <h5 class="mb-xl-4">I focus on <strong>Motion Design</strong> and <strong>3D art</strong>, love to improve knowledge and create stunning vision.</h5>
                        <h5 class="mb-xl-4">Also established <strong>Slothfellas</strong>, a platform that provides C4D plugins and After Effects scripts,
                            designed to enhance workflows and simplify processes.</h5>
                        <h5>For any inquiries,<strong> please contact me</strong></h5>
                    </div>
                </div>
                <div class="d-xl-flex justify-content-end mt-xl-0 mt-4 px-xl-0 px-md-5 px-0">
                    <div class="about-intro-social">
                        <!-- Social media -->
                        <ul class="navbar-nav flex-row name mb-4">
                            <li v-for="item in LinkData.socialmedia" :key="item" class="nav-item col-2 col-md-auto">
                                <a class="nav-link p-2" :href="item.url" target="_blank" rel="noopener">
                                    <svg id="icon_social">
                                        <use :xlink:href="item.icon"></use>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                        <!-- Contact info -->
                        <div class="name">
                            <div class="mb-md-5 mb-4">
                                <div v-for="(item, index) in LinkData.profile_link" :key="item.text" :data-index="index" class="mb-3 p-2">
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
        <section class="about-exp d-flex-center px-lg-5 px-3 text-white isVisible">
            <div class="about-exp-block row mt-xl-0 mt-4 mb-4">
                <!-- Exp Title -->
                <div class="col-lg-3" >
                    <Transition name="move" mode="out-in"
                        @before-enter="beforeEnter"
                        @enter="sigleEnter">
                            <h2 class="mb-xl-4 mb-5 " v-if="isVisible[0]">Experience</h2>
                    </Transition>
                </div>
                <div class="col-lg-9 px-xl-3">
                    <TransitionGroup :css="false"
                        @before-enter="beforeEnter"
                        @enter="enter"
                        @leave="leave"
                    >
                    <div class="about-job row mb-3 mt-3" v-if="isVisible[0]" v-for="(item, index) in ExpData.experience" :key="item.company" :data-index="index">
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
                                <h4 class="col mb-2">{{ item.title }}</h4>
                                <div class="d-flex">
                                    <h6 class="me-4 mb-0">{{ item.company }}</h6>
                                    <span class="exp-p duration-toggled">{{item.duration}}</span>
                                </div>
                            </div>
                            <!-- Job detail -->
                            <ul class="exp-p">
                                <li v-for="content in item.detail" :key="content">
                                    <p>{{ content }}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </TransitionGroup>
                </div>
            </div>
        </section>
        <!-- Skill -->
        <section class="about-skill d-flex-center px-lg-5 px-4 py-5 isVisible">
            <div class="about-skill-block mt-xl-0 mt-4 mb-4">
                <!-- Skill Title -->
                <div class="ps-lg-0 pe-md-5 px-3 mb-md-5 mb-2">
                    <h2 class="mb-md-4 mb-5 text-center" id="skill-title">Service & Skill</h2>
                </div>
                <!-- Skill Info -->
                <div class="d-flex-center px-3">
                    <!-- Text -->
                    <div class="about-skill-text row">
                        <!-- Skill -->
                        <div class="about-skill-each col mx-2 my-xl-0 my-2 py-4 px-4" v-for="skill in ExpData.service" :key="skill">
                            <h3 class="mb-md-5 mb-4" id="skill-each-title">{{skill.title}}</h3>
                            <h5 class="mb-3 " id="skill-each-text"
                                v-for="(item, index) in skill.content" :key="item.name" :data-index="index"
                            >
                                {{item.name}}
                            </h5>
                        </div>
                    </div>
                </div>
                <hr class="my-5">
                <!-- Skill Icon -->
                <div class="d-flex-center pe-md-3">
                    <div class="w-50">
                        <h3 class="text-center mb-md-5 mb-4" id="skill-tooltitle">Tools</h3>
                        <div class="d-flex flex-wrap">
                            <div class="col-md-2 col-3 px-xl-1 px-1 py-xl-3 py-2"
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
        <!-- <section class="about-contact d-flex-center px-lg-5 px-4 py-5 isVisible">
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
/* Mobile */
@media only screen and (max-width: 1280px) {
    .duration-toggle{
        display: none;
    }
    .duration-toggled{
        display: block !important;
    }
    .name{
        display: flex;
        justify-content: center !important;
    }
    .user-container{
        width: 35vh !important;
        height: 35vh !important;
        max-height: 600px;
    }
    .skill-logo{
        width: 4vh !important;
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
    height: 85vh;
}
.about-exp, .about-skill{
    min-height: 95vh;
}
.about-intro {
    height: 60vh;
}
.about-intro-block, .about-exp-block {
    max-width: 1800px;
}
.about-hero-info, .about-intro-info{
    max-width: 920px;
}
/* ---Skill--- */
.about-skill-block{
    min-width: 75vw;
}
.about-skill-text{
    /* min-width: 75vw; */
    min-height: 20vh;
}
.about-skill-each{
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
    background-color: rgb(117, 117, 117);
    content: '';
    position: absolute;
    top: 40px;
    width: 1px;
    height: calc(100% - 30px);
    transform: scale(0);
    transition: all 0.75s ease-in-out;
    transform-origin: top;
    transform-style: preserve-3D;
}
.timelinestart{
    transform: scale(1);
}


/*------ Img --------*/
.user-container{
    position: relative;
    width: 40vh;
    height: 50vh;
    max-height: 600px;
    overflow: hidden;
    background-color: rgb(39, 39, 39);
    border-radius: 20px;
    filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.3));

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
    width: 5vh;
    transition: .2s ease;
}
.skill-logo:hover{
    transform: scale(1.1);
}
</style>
