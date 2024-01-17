<script setup>
import {ref} from 'vue';
import gsap from 'gsap';

// Loading Page
const finishloading = ref(false);

function onMyFrameLoad() {
  finishloading.value = true;
};

/* Transition GSAP */
const beforeEnter = (el) => {
    el.style.opacity = 0;
};
const enter = (el, done) => {
    // console.log("cc")
    gsap.to(el, {
        opacity: 1,
        duration: 1,
        ease: 'power3.Out',
        onComplete: done,
    });
};
/* Loading */
const loadingLeave = (el, done) => {
    // console.log("cc")
    gsap.to(el, {
        opacity: 0,
        delay: 1.5,
        duration: 0.75,
        ease: 'power3.Out',
        onComplete: done,
    });
};
</script>

<template>
  <main class="Home">
    <!-- Loading Page -->
    <Transition name="move" mode="out-in"
      @before-enter="beforeEnter" @enter="enter"
      @leave="loadingLeave"
    >
      <div class="index-loading" v-show="!finishloading">
        <div class="container d-flex-center h-100">
          <svg id="mos-logo">
            <use xlink:href="#icon-mosLogo"></use>
          </svg>
        </div>
      </div>
    </Transition>
    <!----- BG ----->
    <div class="index-bgcover">
      <iframe
        src="https://player.vimeo.com/video/881388756?background=1&amp;muted=1&amp;loop=3" 
        allow="autoplay"
        @load="onMyFrameLoad"
        ></iframe>
    </div>
    <!--  Intro ---->
    <div class="index-info">
      <div class="container d-flex justify-content-end align-items-center h-100">
        <!----- Main Content----->
        <div class="mx-lg-5 px-lg-5 px-3 text-white">
          <h5 class="mb-2">Freelance 3D Generalist</h5>
          <h2 class="mb-5">Sheng Wen (Mos) Cheng</h2>
          <div class="mb-5">
            <p>A 3D Generalist and Motion Designer based in Taiwan.</p>
            <p>Offering professional design services for digital arts and product motion design,
              <br>catering to companies and brands.</p>
          </div>
          <div class="index-btnarea">
            <router-link :to="{ name : 'Works' }">
              <button type="button" class="btn btn-primary index-btn">Explore</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Mobile */
@media only screen and (max-width: 1024px) {
  .index-btnarea{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .index-btn{
    width: 80vw;
  }
}
#mos-logo {
    width: 21dvh;
    height: 14dvh;
    transition: .8s ease;
}
.index-loading{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #FFF;
  z-index: 20;
}
.index-bgcover{
  position: absolute;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100vw;
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
  width: 170dvh;
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
.index-info{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
/* Button */
.index-btn{
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  background-color: hsla(0, 0%, 95.3%, 0.25);
  min-width: 10dvh;
  box-shadow: none;
  border: 1px;
}
</style>

