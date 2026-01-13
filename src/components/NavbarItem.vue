<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useNavStore } from "@/stores/navstore";
import gsap from "gsap";

import NavLink from "./NavbarLink.vue";
import LinkData from "@/data/LinkData.json";

import IconMosLogo from "@/assets/icon/IconMosLogo.vue";
import IconLine from "@/assets/icon/IconLine.vue";
import IconPlus from "@/assets/icon/IconPlus.vue";

/* ---------- Color mode --------*/
const store = useNavStore();
const route = useRoute();

// update Darkmode
const colormode = computed(() => {
    return store.navbardarkmode ? "fill:#FFF; color:#FFF;" : "fill:#000; color:#000;";
});

let navctx;
onMounted(() => {
    // Scroll movement
    window.addEventListener("scroll", handleScroll);

    /* ---------- Enter Motion ----------- */
    navctx = gsap.context((self) => {
        const herotl = gsap.timeline({});
        herotl.from(".navbar-brand", { yPercent: -75, ease: "back.inOut(1.7)", duration: 0.8 }, 0);
    });
});

/* --- Scroll Folder ---- */
const navfolder = ref(false);
let lastPos = 0;
let deltaPos = 0;
const navbarToggler = ref(null);

const handleScroll = () => {
    const currentPos = window.scrollY;
    deltaPos = currentPos - lastPos;

    if (deltaPos > 10 && navfolder.value == false) {
        navfolder.value = true;
        gsap.to(".navcontainer", { yPercent: -90, duration: 0.5, ease: "back.inOut(1.7)" });

        if (store.isNavbarExpanded) {
            store.isNavbarExpanded = false;
        }
    } else if (deltaPos < 0 && navfolder.value == true) {
        navfolder.value = false;
        gsap.to(".navcontainer", { yPercent: 0, duration: 0.75, ease: "back.inOut(1.7)" });
    }
    lastPos = currentPos;
};
/* Toggle Nav BG */

const navbarExpand = () => {
    store.isNavbarExpanded = !store.isNavbarExpanded;
};

// Watch for state changes (e.g. from Router or Toggle)
watch(
    () => store.isNavbarExpanded,
    (newVal) => {
        if (newVal) {
            openMenu();
        } else {
            closeMenu();
        }
    }
);

const openMenu = () => {
    const tl = gsap.timeline({ defaults: { overwrite: true, ease: "power3.Out" } });

    store.navbardarkmode = false; // insure homepage
    /* Button */
    tl.to(".top-bar", { rotation: 135, y: "0.375rem", duration: 0.25 }, 0);
    tl.to(".mid-bar", { opacity: 0.5, scaleX: 0, duration: 0.2 }, 0);
    tl.to(".bot-bar", { rotation: -135, y: "-0.375rem", duration: 0.25 }, 0);
    /* collapse */
    tl.to(".navbar-collapse", { height: "50vh", ease: "back.Out(1.7)", duration: 0.5 }, 0.01);
    /* -- bg -- */
    tl.to(".navcontainer", { backgroundColor: "rgba(255, 255, 255, 1)", duration: 0.3 }, 0.05);
    tl.to(".dark-overlay", { autoAlpha: 0.7, duration: 1 }, 0);
    /* -Links-- */
    tl.fromTo(
        ".nav-item",
        { xPercent: 30, autoAlpha: 0 },
        { xPercent: 0, autoAlpha: 1, ease: "back.inOut(1.7)", duration: 1, stagger: 0.04 },
        0,
    );
};

const closeMenu = () => {
    const outtl = gsap.timeline({ defaults: { overwrite: true, ease: "power3.Out" } });

    /* Button */
    outtl.to(
        ".top-bar",
        {
            keyframes: {
                "0%": { rotation: 135 },
                "45%": { y: "0.375rem" },
                "100%": { rotation: 360, y: 0 },
                ease: "none",
            },
            duration: 0.3,
        },
        0,
    );
    outtl.to(".mid-bar", { opacity: 1, scaleX: 1, duration: 0.25 }, 0.01);
    outtl.to(
        ".bot-bar",
        {
            keyframes: {
                "0%": { rotation: -135 },
                "45%": { y: "-0.375rem" },
                "100%": { rotation: -360, y: 0 },
                ease: "none",
            },
            duration: 0.3,
        },
        0,
    );
    /* -Links-- */
    outtl.to(
        ".nav-item",
        {
            xPercent: 40,
            autoAlpha: 0,
            ease: "back.inOut(1.7)",
            duration: 0.5,
            stagger: 0.04,
            onComplete: navComplete,
        },
        0,
    );
    /* -- bg -- */
    outtl.to(
        ".navcontainer",
        { backgroundColor: "rgba(255, 255, 255, 0)", ease: "power3.inOut", duration: 0.4 },
        0.5,
    );
    outtl.to(".dark-overlay", { autoAlpha: 0, ease: "power3.inOut", duration: 0.7 }, 0.3);
    /* collase */
    outtl.to(".navbar-collapse", { height: 0, ease: "back.inOut(1.7)", duration: 0.5 }, 0.4);
};

const navComplete = () => {
    if (route.name == "Index") {
        store.navbardarkmode = true; // insure index
    } else {
        store.navbardarkmode = false;
    }
};
/* -------------Nav Bar social ----------------*/
const showIcon = ref(false);

const rotateButton = () => {
    showIcon.value = !showIcon.value;
    const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
    // motion
    tl.to("#icon-plus-area", { rotation: "+=135", duration: 0.5, ease: "elastic.Out" });
    tl.from("#icon-plus-area", { scale: 0.8, duration: 1.4, ease: "elastic.out(1,0.3)" }, 0.1);
};

/* icon-social Enter animation */
function onBeforeEnter(el) {
    gsap.set(el, { width: 0, autoAlpha: 0, scale: 0.1 });
}
function onEnter(el, done) {
    const delay = 0.2 - 0.05 * el.dataset.index;
    const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
    tl.to(
        el,
        { width: "2.5rem", autoAlpha: 1, duration: 0.3, delay: delay, ease: "back.Out(2.5)" },
        0,
    );
    tl.to(el, { scale: 1, duration: 0.8, delay: delay, ease: "elastic.out(1,0.4)" }, 0.2);
}
function onLeave(el, done) {
    const delay = 0.2 - 0.05 * el.dataset.index;
    gsap.to(el, {
        width: 0,
        autoAlpha: 0,
        scale: 0.5,
        duration: 1,
        delay: delay,
        ease: "back.inOut(2.5)",
    });
}
</script>

<template>
    <header class="lg:flex-no-wrap relative flex flex-wrap content-between items-center px-4">
        <div
            class="navcontainer fixed top-0 left-0 z-100 mx-auto flex w-full max-w-full flex-wrap items-center justify-between px-6 pt-2 pb-6 lg:px-16 xl:pb-2"
        >
            <!-- LOGO -->
            <router-link
                :to="{ name: 'Index' }"
                class="navbar-brand mr-4 flex justify-center py-2 pr-4"
                aria-current="page"
            >
                <Transition name="fade" mode="out-in">
                    <IconMosLogo class="h-12 w-36" :style="colormode" />
                </Transition>
            </router-link>
            <!-- navbar responsive button -->
            <button
                @click="navbarExpand"
                class="collapsed relative h-6 w-6 bg-transparent leading-normal lg:hidden"
                type="button"
                ref="navbarToggler"
            >
                <span class="toggler-icon top-bar -mt-1.5">
                    <IconLine id="icon_collapse" :style="colormode" />
                </span>
                <span class="toggler-icon mid-bar">
                    <IconLine id="icon_collapse" :style="colormode" />
                </span>
                <span class="toggler-icon bot-bar mt-1.5">
                    <IconLine id="icon_collapse" :style="colormode" />
                </span>
            </button>
            <!-- Canvas -->
            <nav class="navbar-collapse">
                <ul
                    class="mt-8 mb-0 h-0 grow flex-col flex-wrap items-center space-y-5 pl-0 md:ml-auto lg:mt-0 lg:flex lg:h-10 lg:flex-row lg:space-y-0"
                    :style="colormode"
                >
                    <NavLink :to="'Works'" />
                    <NavLink :to="'Showreel'" />
                    <NavLink :to="'About'" />
                    <NavLink :to="'Contact'" />
                    <li class="nav-item navtext flex items-center">
                        <div class="flex flex-row flex-wrap xl:ms-auto">
                            <TransitionGroup
                                @before-enter="onBeforeEnter"
                                @enter="onEnter"
                                @leave="onLeave"
                            >
                                <li
                                    class="w-1/5"
                                    v-for="(item, index) in LinkData.socialmedia"
                                    v-show="showIcon"
                                    :key="item.url"
                                    :data-index="index"
                                >
                                    <a
                                        class="inline-block"
                                        :href="item.url"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        <svg class="icon-social size-7" :style="colormode">
                                            <use :xlink:href="item.icon"></use>
                                        </svg>
                                    </a>
                                </li>
                            </TransitionGroup>
                        </div>
                        <button class="toggler-icon-xl p-2" type="button" @click="rotateButton">
                            <IconPlus class="size-7" id="icon-plus-area" :style="colormode" />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="dark-overlay invisible fixed top-0 left-0 z-60 h-full w-full bg-black"></div>
    </header>
</template>
<style scoped>
/* Mobile */
@media only screen and (max-width: 1024px) {
    .navbar-collapse {
        flex-basis: 100%;
    }
    .nav-item {
        visibility: hidden;
    }
}
.navcontainer {
    background-color: rgba(255, 255, 255, 0);
}
#mos-logo {
    transition: 0.8s ease;
}
/*-------- nav bar toggler icon------*/
.toggler-icon {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    opacity: 1;
    left: 0;
}
</style>
