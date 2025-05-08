<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useNavStore } from "@/stores/navstore";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

import AboutHero from "@/components/AboutPage/AboutPageHero.vue";
import AboutIntro from "@/components/AboutPage/AboutPageIntro.vue";
import AboutExp from "@/components/AboutPage/AboutPageExp.vue";
import AboutSkill from "@/components/AboutPage/AboutPageSkill.vue";
import AboutContact from "@/components/AboutPage/AboutPageContact.vue";
import IconMosLogo from "../assets/icon/IconMosLogo.vue";

/* -------------- Store --------------------*/
const store = useNavStore();
const changeNavbarState = (state) => {
    store.navbardarkmode = state;
};
const finishloading = ref(false);
const lazyPics = ref(document.querySelectorAll(".lazy"));
const imgContainer = ref();
let ctx;
const matchmedia = gsap.matchMedia();
onMounted(() => {
    /* -------------- Preloading status --------------------- */
    lazyPics.value = document.querySelectorAll(".lazy");
    preloadImages();
    setupDesktopAnimations();
    // let smoother = ScrollSmoother.create({
    //     content: imgContainer.value,
    //     smooth: 2,
    //     effects: true,
    //     normalizeScroll: true
    // });
    ctx = gsap.context((self) => {
        animateIntro(self);
        animateExp(self);
        animateSkill(self);
        animateContact(self);
    }, imgContainer.value);
});
onUnmounted(() => {
    ctx.revert();
    matchmedia.revert();
});
const preloadImages = () => {
  const loadImagePromises = Array.from(lazyPics.value).map((img) => {
    return new Promise((resolve, reject) => {
      img.onload = () => {
        img.classList.add("loaded");
        resolve(img);
      };
      img.onerror = () => {
        console.error("Error loading image:", img.src);
        reject(new Error("Failed to load image"));
      };
    }).catch((error) => {
        console.error("Error in individual image loading",error)
    });
  });
  Promise.all(loadImagePromises)
    .then(() => {
      finishloading.value = true;
    }).catch((error)=>{console.error("Error in overall preloading",error)});
};
/* --------- Desktop only Motion ----------------------*/
const setupDesktopAnimations = () => {
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
    });
};
const noScroll = ref(true);
/* Enter AboutPage Motion */
const loadingEnter = (el, done) => {
    // gsap.set("#about-loadinglogo", { scale: 60, rotationZ: -30, });
    // gsap.fromTo(el, { yPercent: -200 },{ yPercent: 0, duration: 1.2, ease: "power4.inOut" });
};
const loadingLeave = (el, done) => {
    const tl = gsap.timeline();
    tl.to(el, { yPercent: -70, scaleY: 0.1, duration: 1, ease: "power4.in", onStart: animateHero, 
        onComplete: ()=> {
            noScroll.value = false;
        }
    }, 0.75);
    tl.to(el, { display: "none" }, 1.65);
};
const animateHero = () => {
    const herotl = gsap.timeline({ defaults: { ease: "back.inOut(1.7)", duration: 0.8 } });
    herotl.fromTo(
        ".profile-container",
        { clipPath: "inset(50% 0% 50% 0% round 6% 0%)" },
        { clipPath: "inset(0% 0% 0% 0% round 12% 0%)", duration: 3, ease: "power4.out" },
        0.5,
    );
    herotl.from("#profile-img-1 ", { scale: 2.2, duration: 3.5, filter: "blur(20px)", ease: "power4.out" }, 0.5);
    herotl.from("#profile-img-2 ", { scale: 1.6, duration: 3.5, filter: "blur(10px)", ease: "power4.out" }, 0.5);
    herotl.from("#hero-hello", { opacity: 0, yPercent: 150, rotationX: 90, stagger: 0.25 }, 0.9);
    herotl.from("#hero-name", { opacity: 0, yPercent: 150, rotationX: 90, rotationZ: 10, stagger: 0.1 }, 1.4);
    herotl.from("#hero-detail", { opacity: 0, yPercent: 20, ease: "power4.inOut", duration: 1.35, stagger: 0.4 }, 1.7);
    herotl.from("#hero-4", { opacity: 0, yPercent: -15 }, 2.4);
};
// Timeline for the first intro section
// Controls animations for the container, title, text, and image
const animateIntro = (self) => {
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
    // Animates the container to reveal content via clip-path
    introtl.fromTo(".intro-container", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 3, ease: "power4.out" }, 0);
    // Animates the intro title
    introtl.from("#intro-title", { opacity: 0, yPercent: 150, duration: 0.8, stagger: 0.1 }, 0);
    // Animates the text paragraphs, staggering each character
    introtl.from(".split-text", { opacity: 0, yPercent: 40, duration: 1, stagger: 0.03 }, 0.4);
    // Animates the image scaling up
    introtl.from(".profile-img-3", { scale: 1.6, duration: 3.5, ease: "power4.out" }, 0);
     // Timeline for the second intro section
     // Controls animations for the container, title, text, and image
    const introtl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-intro-info2",
            start: "top 65%",
            end: "bottom 30%",
            // markers: true,
        },
        defaults: { ease: "power3.out" },
    });
        // Animates the container to reveal content via clip-path
    introtl2.fromTo(
        ".intro-container2",
        { clipPath: "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 3, ease: "power4.out" },
        0,
    );
        // Animates the intro title
    introtl2.from("#intro-title2", { opacity: 0, yPercent: 150, duration: 1.5, stagger: 0.15 }, 0);
    // Animates the text paragraphs, staggering each character
    introtl2.from(".split-text2", { opacity: 0, yPercent: 40, duration: 1, stagger: 0.03 }, 0.5);
    introtl2.from(".profile-img-4", { scale: 1.6, duration: 3.5, ease: "power4.out" }, 0);
};
const animateExp = (self) => {
    // Timeline for changing the navbar state when entering the experience section
    const navtl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-exp",
            start: "top top",
            end: "bottom top",
            // When the about-exp section leaves the viewport, change the navbar state
            onLeave: (self) => {
                changeNavbarState(false);
            },
            // When the about-exp section re-enters the viewport, change the navbar state
            onEnterBack: (self) => {
                changeNavbarState(true);
            },
        },
    });

    // Timeline for the experience section animations
    const exptl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-exp-block",
            start: "top 80%",
            end: "bottom+=300 top",
            // markers: true,
            // Animates the experience section when it enters the viewport
        },
        defaults: { ease: "power4.out" },
    });
    // Animation for the experience section elements

    // Ensure the timeline is initially invisible to avoid FOUC
    // exptl.from(".about-exp", { opacity: 0, duration: 0.1 });

    // Animate elements inside the experience section
    exptl.from(".timeline", { autoAlpha: 0, ease: "linear" }, 0); // init timeline or will flash to top(FOUC)
    exptl.from("#about-exp-title", { opacity: 0, xPercent: -15, ease: "back.inOut(1.7)", duration: 0.8 });
    exptl.from(".about-job", { opacity: 0, yPercent: -30, duration: 0.8, stagger: 0.6 }, 0.5);
    exptl.from(".exp-job-title", { opacity: 0, yPercent: -30, duration: 0.8, stagger: 0.25 }, 0.7);
    exptl.from(".exp-job-detail", { opacity: 0, yPercent: -30, duration: 0.8, stagger: 0.25 }, 0.9);
    exptl.from(".timeline", { scaleY: 0, ease: "back.Out(1.7)", duration: 0.5, stagger: 0.5 }, 1.1);
};
// Animates the Skill section elements
const animateSkill = (self) => {
    // Timeline for the skill section
    const skilltl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-skill",
            start: "top center",
            end: "bottom 30%",
            // Animates the skill section when it enters the viewport
            // markers: true,
        },
        defaults: { ease: "power3.out" },
    });
    // Animate the skill section title
    skilltl.from("#skill-title", { opacity: 0, yPercent: 20, duration: 1 });
    // Iterate over each skill card to animate them
    gsap.utils.toArray(".about-skill-card").forEach((item, i) => {
        // Calculate the delay for each card based on its index
        const delay = i / 8 + 0.3;
        // Select the elements within each skill card
        const cardtitle = item.querySelector("#skill-card-title");
        const cardicon = item.querySelectorAll(".skill-card-icon");
        const cardtext = item.querySelectorAll("#skill-card-text");
        // Animate each card entering from the bottom
        // Animate the card entering from the bottom
        skilltl.from(item, { opacity: 0, yPercent: 25, scale: 0.7, ease: "back.inOut(1.7)", duration: 0.8 }, delay);
        // Animate the title of the card entering from the bottom
        skilltl.from(cardtitle, { opacity: 0, yPercent: 100, duration: 1 }, delay + 0.6);
        // Animate the text in the card entering from the bottom
        skilltl.from(cardtext, { opacity: 0, yPercent: 100, duration: 1, stagger: 0.15 }, delay + 0.8);
    });

    // Timeline for the skill icon group
    const icontl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-skill",
            start: "35% center",
            end: "bottom 30%",
            // markers: true,
        },
        defaults: { ease: "power3.Out(1.7)", duration: 0.5 },
    });  
    // Animate the title of the skill icon group
    icontl.from("#skill-tooltitle", { opacity: 0, yPercent: 20, rotateX: 40 }, 0.5);
    // Animate each logo in the skill icon group
    icontl.from(".skill-logo-container", { opacity: 0, yPercent: 20, scale: 0.8, stagger: 0.1 }, 0.5);
};
const animateContact = (self) => {
    // Timeline for the contact section
    const contacttl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-contact",
            start: "top 80%", // When the top of the contact section is 80% down the viewport
            end: "bottom 30%", // When the bottom of the contact section is 30% up the viewport
        },
        defaults: { ease: "power3.Out(1.7)", duration: 0.5 },
    });
    // Animate the contact section title
    // Animate the social media icons
    // Animate the contact information
    contacttl.from("#contact-title", { opacity: 0, yPercent: 100, duration: 0.8, stagger: 0.1 }, 0); // stagger each character in title
    contacttl.from(".intro-infosocial", { opacity: 0, xPercent: -30, scale: 0.8, duration: 0.5, stagger: 0.1 }, 0.45); // stagger each icon
    contacttl.from(".intro-infocontact", { opacity: 0, yPercent: 25, duration: 1.5, stagger: 0.2 }, 0.8); // stagger each info element
};
</script>
<template>
    <div class="About" id="smooth-wrapper">
        <Transition name="move" mode="out-in" appear @enter="loadingEnter" @leave="loadingLeave">
            <section class="d-flex-center fixed top-0 z-90 h-full w-full" v-show="!finishloading" id="about-loading">
                <div class="d-flex-center z-91 container mx-auto h-full sm:px-4" id="about-loadinglogo">
                    <IconMosLogo class="h-24 w-72 fill-black" />
                </div>
                <div class="about-loadingbg bg-main-orange absolute h-[300vh] w-[150vw] rounded-full"></div>
            </section>
        </Transition>
        <main class="bg-main-black" :class="{'no-scroll': noScroll}" ref="imgContainer">
            <div class="about-herointro duration-500" :class="{ 'bg-stone-100': !store.navbardarkmode, 'bg-main-black': store.navbardarkmode }">
                <AboutHero />
                <AboutIntro />
            </div>
            <AboutExp />
            <AboutSkill />
            <AboutContact />
        </main>
    </div>
</template>

<style scoped>
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
.icon-gear {
    /* animation: gearRotation 1s cubic-bezier(0.075, 0.82, 0.165, 1) infinite; */
    animation: rotation 10s linear infinite;
}
.no-scroll {
    height: 100vh;
    overflow: hidden;
}

</style>
