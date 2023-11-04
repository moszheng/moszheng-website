<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue'
import { useNavStore } from '@/stores/navstore'
import gsap from 'gsap'

import FooterItem from '@/components/FooterItem.vue'
import LinkData from '@/data/LinkData.json'
// import WorksData from '../data/WorksData.json';
import LogoData from '@/data/LogoData.json'
import ExpData from '@/data/Experience.json'

// Return Real route
const profileImage1 = '../src/img/profile_1.png';
const profileImage2 = '../src/img/profile_2.png';
const motiondesign = ExpData.service.motiondesign;
const development = ExpData.service.development;

/* ------------ Transition GSAP --------------------*/

const isVisible = ref(false);
const isVisible1 = ref(false);

const store = useNavStore();
const changeNavbarState = (state) => {
    store.navbardarkmode = state;
};

const options = {
  root: document.querySelector('.About'),
  threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
};
const prevRatio = 0;
const callback = (entries) => {
    entries.forEach((entry)=> {
        const {intersectionRatio, target} = entry;
        // console.log('intersectionRatio', intersectionRatio)
        if (intersectionRatio > 0.3) {
            isVisible.value = true;
        }
        // Change Darkmode
        if (intersectionRatio > 0.8) {
            changeNavbarState(true);
        }
        else {
            changeNavbarState(false);
        }
    });
};
const callback1 = (entries) => {
    entries.forEach((entry)=> {
        const {intersectionRatio, target} = entry;
        if (intersectionRatio > prevRatio) {
            isVisible1.value = true;
        }
    });
};
// Create an Intersection Observer
const observer = new IntersectionObserver( callback, options );
const observer1 = new IntersectionObserver( callback1, options );

// Attach the observer to the target element
onMounted(() => {
    const targets = document.querySelectorAll('.isVisible');
    // for (const item of targets){
    //     observer.observe(item);
    // }
    observer.observe(targets[0]);
    observer1.observe(targets[1]);

    window.addEventListener('scroll', handleScroll);
});
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});

/* Scroll picture*/
const scrollPosition = ref(0);

const handleScroll = () => {
    scrollPosition.value = window.scrollY;
    // portrait
    gsap.to('.avatar-user_1', {
        y: scrollPosition.value * .15,
        duration: .3,
        ease: 'power1',
        // onComplete: done
    });
    // BG
    gsap.to('.avatar-user_2', {
        y: scrollPosition.value * .45,
        duration: .35,
        ease: 'power2',
        // onComplete: done
    });
};

/* GSAP */
const beforeEnter = (el) => {
    // console.log("bb")
    el.style.opacity = 0;
    el.style.transform = 'translateY(50px)';
};
const enter = (el, done) => {
    // console.log("cc")
    gsap.to(el, {
        opacity: 1,
        y: 0,
        delay: el.dataset.index * 0.2 + 0.8,
        duration: 0.4,
        ease: 'power3.Out',
        onComplete: done,
    });
};
const sigleEnter = (el, done) => {
    // console.log("cc")
    gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        onComplete: done,
    });
};

const leave = (el, done) => {
    // console.log("cc")
    gsap.to(el, {
        opacity: 0,
        y: 80,
        duration: el.dataset.index * 0.4,
        onComplete: done,
    });
};

function ScrollNext() {
    window.scrollTo(0, window.screen.height);
}

</script>
<template>
<div class="About">
    <main class="container-fluid">
        <!-- Intro -->
        <section class="about-intro d-flex justify-content-center align-items-center row mx-md-3 mx-1 px-md-2 px-1 py-5">
            <!-- profile image -->
            <div class="col-xl-6 d-flex align-items-center justify-content-center">
                <div class="userContainer mb-md-0 mb-4" >
                    <img class="avatar-user_1 img-fluid" alt="profile_image" :src=profileImage1>
                    <img class="avatar-user_2 img-fluid" alt="profile_image" :src=profileImage2>
                </div>
            </div>
            <div class="col-xl-6 mt-xl-0 mt-4 px-md-5 ">
                <div class="mb-4">
                    <Transition name="move" mode="out-in" appear
                        @before-enter="beforeEnter"
                        @enter="sigleEnter">

                        <h1 class="mb-5" >Sheng Wen Cheng</h1>

                    </Transition>
                    <Transition name="move" mode="out-in" appear
                        @before-enter="beforeEnter"
                        @enter="sigleEnter">

                        <h3 class="mb-5">
                            A <strong>3D Generalist</strong> and <strong>Motion Designer</strong>  <br> based in Taiwan.
                        </h3>

                    </Transition>
                    <p>Focus on <strong>Motion Design</strong> and <strong>3D art</strong>, love to improve knowledge and create stunning vision.</p>

                    <p>Also established <strong>Slothfellas</strong>, a platform that provides C4D plugins and After Effects scripts,
                        designed to enhance workflows and simplify processes.</p>

                    <p>For any inquiries,<strong> please contact me</strong></p>
                </div>
                <!-- Social media -->
                <ul class="navbar-nav flex-row mb-4">
                    <li v-for="item in LinkData.socialmedia" class="nav-item col-2 col-md-auto">
                        <a class="nav-link p-2" :href="item.url" target="_blank" rel="noopener">
                            <svg id="icon_twitter">
                                <use :xlink:href="item.icon"></use>
                            </svg>
                        </a>
                    </li>
                </ul>
                <!-- Contact info -->
                <TransitionGroup appear :css="false"
                    @before-enter="beforeEnter"
                    @enter="enter"
                >
                   <div v-for="(item, index) in LinkData.profile_link" :key="item.text" :data-index="index" class="mb-3 p-2">
                        <svg id="icon_twitter">
                            <use :xlink:href="item.icon"></use>
                        </svg>
                        <span class="ms-3">{{ item.text }}</span>
                    </div>
                </TransitionGroup>
            </div>
            <!-- <div class="container-fluid text-center">
                <a @click="ScrollNext()" class="nav-link p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chevron-compact-down" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"/>
                    </svg>
                </a>
            </div> -->
        </section>
        <!-- Experience -->
        <section class="about-exp d-flex justify-content-center align-items-center px-lg-5 px-3 text-white isVisible">
            <div class="row mt-xl-0 mt-4 mb-4">
                <!-- title -->
                <div class="col-lg-3" >
                    <Transition name="move" mode="out-in"
                        @before-enter="beforeEnter"
                        @enter="sigleEnter">
                            <h3 class="mb-xl-4 mb-5" v-if="isVisible">Experience</h3>
                    </Transition>
                </div>
                <div class="col-lg-9 px-xl-3">
                    <TransitionGroup :css="false"
                        @before-enter="beforeEnter"
                        @enter="enter"
                        @leave="leave"
                    >
                    <div class="mb-5 mt-3" v-if="isVisible" v-for="(item, index) in ExpData.experience" :key="item.company" :data-index="index">
                        <!-- Job -->
                        <div class="row mb-xl-3 mb-2">
                            <!-- duration -->
                            <div class="col-xl-2 col-1">
                                <div class="col text-center">
                                    <p>{{item.duration}}</p>
                                </div>
                            </div>
                            <!-- Mid -->
                            <div class="col-xl-1 col-1">-</div>
                            <!-- Content -->
                            <div class="col-xl-7 col-9">
                                <div class="row">
                                    <h4 class="col">{{ item.title }}</h4>
                                    <div>{{ item.company }}</div>
                                </div>
                            </div>
                        </div>
                        <!-- Job content -->
                        <div class="row" >
                            <div class="col-xl-2 col-0"></div>
                            <div class="col-xl-1 col-2"></div>
                            <!-- Content -->
                            <div class="col-xl-7 col-10">
                                <ul class="">
                                    <li v-for="content in item.detail">
                                        <p>{{ content }}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    </TransitionGroup>
                </div>
            </div>
        </section>

        <!-- Skill -->
        <section class="about-skill d-flex justify-content-center align-items-center px-lg-5 px-3 py-5">
            <div class="skill row mt-xl-0 mt-4 mb-4 isVisible">
                <div class="col-lg-3">
                    <Transition name="move" mode="out-in"
                        @before-enter="beforeEnter"
                        @enter="sigleEnter">
                    <h2 class="mb-md-4 mb-5" v-if="isVisible1">Service & Skill</h2>
                    </Transition>
                </div>
                <div class="col-lg-9 px-md-5 ">
                    <!-- Text -->
                    <div class="about-skill-text row mb-5">
                        <div class="col-md-6 mb-md-0 mb-4">
                            <Transition name="move" mode="out-in"
                                @before-enter="beforeEnter"
                                @enter="sigleEnter">
                                <h3 class="mb-md-5 mb-4" v-if="isVisible1">Motion Design</h3>
                            </Transition>
                            <TransitionGroup :css="false"
                                @before-enter="beforeEnter"
                                @enter="enter"
                                @leave="leave"
                            >
                                <h5 class="mb-3 " v-if="isVisible1" v-for="(item, index) in motiondesign" :key="item.name" :data-index="index"> {{item.name}} </h5>
                            </TransitionGroup>
                        </div>
                        <div class="col-md-6">
                            <Transition name="move" mode="out-in"
                                @before-enter="beforeEnter"
                                @enter="sigleEnter">
                                <h3 class="mb-md-5 mb-4" v-if="isVisible1">Development</h3>
                            </Transition>
                            <TransitionGroup :css="false"
                                @before-enter="beforeEnter"
                                @enter="enter"
                            >
                            <h5 class="mb-3" v-if="isVisible1" v-for="(item, index) in  development" :key="item.name" :data-index="index">{{item.name}}</h5>
                            </TransitionGroup>
                        </div>
                    </div>
                    <!-- LOGO -->
                    <div class="row d-flex align-items-center pe-md-5">
                        <div v-for="item in LogoData.logo" :key="item.name" class="col-lg-2 col-3 px-xl-4 py-xl-3 px-2 py-2">
                            <img :src=item.img :alt=item.name class="img-fluid skill-logo">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="about-end container-fluid text-center">
            <a href="#" class="nav-link p-2">
            <!-- <a href="#anchor" onclick="lenis.scrollTo('#anchor')" class="nav-link p-2"> -->
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

<style>

/* Mobile */
@media only screen and (max-width: 960px) {
    #icon_twitter{
        width: 25px;
        height: 25px;
    }
    .avatar-user_1, .avatar-user_2{
        transform: scale(1.5);
    }
    p {
        font-size: 0.75rem; /*0.9*/
    }
}


/*-----------------------*/
main{
    padding-right: 0 !important;
    padding-left: 0 !important;
}

.img-banner{
    overflow : hidden;
    height: 30vh;
}
.about-intro, .about-exp, .about-skill{
    min-height: 100vh;
}

/* BG color */
.about-exp{
    background-color: rgb(22, 22, 22) ;
}

.about-skill, .about-end{
    background-color: rgb(228, 228, 228);
}
.about-skill-text{
    min-height: 20vh;
}
/*------ Img --------*/
.userContainer{
    position: relative;
    width: 50vh;
    height: 50vh;
    overflow: hidden;
}

.avatar-user_1{
    position: absolute;
    top: 0;
    left: 0;
    transform: scale(1.2);
    object-fit: cover;
    z-index: 20;
}
.avatar-user_2 {
    position: absolute;
    top: 0;
    left: 0;
    transform: scale(1.2);
    object-fit: cover;
    z-index: 10;
}
.skill-logo{
    /* scale: 50%; */
    width: 7.5vh;
}
</style>
