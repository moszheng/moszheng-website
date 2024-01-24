<script setup>
import { ref, computed} from 'vue';
import homeContent from '../data/Experience.json';
import gsap from 'gsap';

// Loading Page
const finishloading = ref(false);

function onMyFrameLoad() {
  finishloading.value = true;
};

const homecontent = computed(() => {
  return homeContent.homepage.split(" ");
});

/* Transition GSAP */
const beforeEnter = (el) => {
  el.style.opacity = 0;
};
const enter = (el, done) => {
  gsap.to(el, { opacity: 1, duration: 1, ease: 'power3.Out', onComplete: done });
};
/* Loading */
const loadingLeave = (el, done) => {
  const tl = gsap.timeline();
  tl.to(el, {
    opacity: 0,
    delay: 1.5,
    duration: 0.75,
    ease: 'power3.Out',
    onComplete: done,
    // onComplete: homemotion,
  });
};
/* ---------- Enter ---------- */
// function homemotion() {
//   const tl = gsap.timeline({});
//   tl.from("#home-name", { opacity: 0, yPercent: 65, ease: "back.inOut(1.7)", duration: 0.8, stagger: 0.15 }, 0);
//   tl.from("#home-text", { opacity: 0, yPercent: 20, ease: "back.inOut(1.7)", duration: 0.8, stagger: 0.05 }, 0.6);
//   tl.from(".index-btnarea", { opacity: 0, yPercent: 65, ease: "back.inOut(1.7)", duration: 0.8, stagger: 0.2 }, 0.9);
// }
</script>

<template>
  <main class="homepage">
    <!-- Loading Page -->
    <Transition name="move" mode="out-in"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="loadingLeave"
    >
      <div class="index-loading z-20 bg-white absolute top-0 w-full h-full" v-show="!finishloading">
        <div class="container mx-auto sm:px-4 d-flex-center h-full">
          <svg id="mos-logo">
            <use xlink:href="#icon-mosLogo"></use>
          </svg>
        </div>
      </div>
    </Transition>
    <!----- BG ----->
    <div class="index-bgcover absolute top-0 left-0 w-screen h-screen">
      <iframe
        class="aspect-video"
        src="https://player.vimeo.com/video/881388756?background=1&amp;muted=1&amp;loop=3" 
        allow="autoplay"
        @load="onMyFrameLoad"
        ></iframe>
    </div>
    <!--  Intro ---->
    <div class="index-info z-10 absolute top-0 w-full h-full">
      <div class="container mx-auto sm:px-4 flex xl:justify-end justify-center items-center h-full">
        <!----- Main Content----->
        <div class="lg:px-0 px-4 text-white">
          <h5 class="mb-2" id="home-name">Freelance 3D Generalist</h5>
          <h2 class="lg:mb-10 mb-12" id="home-name">Sheng Wen (Mos) Cheng</h2>
          <div class="lg:mb-10 mb-12 space-y-4 test">
            <p id="home-text">A 3D Generalist and Motion Designer based in Taiwan.</p>
            <p id="home-text">Offering professional design services for digital arts and product motion design,
              <br>catering to companies and brands.</p>
          </div>
          <div class="index-btnarea">
            <router-link :to="{ name : 'Works' }">
              <button type="button" class="index-btn inline-block select-none rounded py-1 px-3 leading-normal">Explore</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Mobile */
@media only screen and (max-width: 1025px) {
  .index-btnarea{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .index-btn{
    width: 90vw;
  }
}
#mos-logo {
    width: 21vh;
    height: 14vh;
    transition: .8s ease;
}
.index-bgcover{
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  overflow: hidden;
  object-fit: cover;
  filter: brightness(55%);
}
iframe {
  position: absolute;
  height: 60vw;
  width: 170vh;
  min-height: 100%;
  min-width: 100%;
  max-width: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  box-sizing: border-box;
  pointer-events: none;
  background-color: black;
}
</style>

