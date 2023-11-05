<script setup>
import {ref, computed, onMounted} from 'vue'
import gsap from 'gsap'

const bgImage = [
  '../src/img/01_gma29.jpg',
  '../src/img/03_SWSX_01.jpg',
  '../src/img/05_GMA32_01.png',
  '../src/img/04_KK_01.png',
  '../src/img/07_VIVA_01.jpg',
  '../src/img/02_gha56_01.png',
];

const bgindex = ref(0);

const finishloadimg = ref(0);
const finishloading = computed(() => finishloadimg.value === bgImage.length);

onMounted(() => {
  bgImage.forEach((image) => {
    const img = new Image();
    img.src = image;
  });

  // Preloading status
  const preloadimg = document.querySelectorAll('.lazy');
  function loaded(img) {
    finishloadimg.value++;
  }
  preloadimg.forEach(function(img) {
    if (img.complete) {
      loaded(img)
    } else {
      img.addEventListener("load", loaded)
    }
  });
});

/* BG Slidershow */
const slider = ref([true, true, true, true, true, true]);

function bgStyles(index) {return `z-index:${ 6-index};`}

setInterval(() => {
  const oldindex = bgindex.value;
  bgindex.value = (bgindex.value + 1) % bgImage.length;
  if (bgindex.value == 0) {
    slider.value = [true, true, true, true, true, true];
  } else {
    slider.value[bgindex.value] = true;
    slider.value[oldindex] = false;
  }
}, 4000);

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
const beforeleave = (el) => {
    el.style.opacity = 1;
};
const leave = (el, done) => {
    // console.log("cc")
    gsap.to(el, {
        opacity: 0,
        duration: 1.2,
        onComplete: done,
    });
};

/* Loading */
const loadingLeave = (el, done) => {
    // console.log("cc")
    gsap.to(el, {
        opacity: 0,
        delay: 1.5,
        duration: 0.8,
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
        <div class="container d-flex justify-content-center align-items-center h-100">
          <svg id="mos-logo">
            <use xlink:href="#icon-mosLogo"></use>
          </svg>
        </div>
      </div>
    </Transition>
    <!----- BG ----->
    <TransitionGroup name="move" mode="out-in"
      @before-enter="beforeEnter" @enter="enter"
      @before-leave="beforeleave" @leave="leave"
    >
      <img v-for="(item, index) in bgImage" :key="item"
        v-show="slider[index]"
        :src=bgImage[index] alt="image"
        :style="bgStyles(index)"
        class="index-bgcover lazy"
      >
    </TransitionGroup>
    <!--  Intro ---->
    <div class="index-info">
      <div class="container d-flex justify-content-end align-items-center h-100">
        <!----- Main Content----->
        <div class="mx-lg-5 px-lg-5 text-white">
          <h5 class="mb-2">Freelance 3D Generalist</h5>
          <h1 class="mb-5">Sheng Wen (Mos) Cheng</h1>
          <div class="mb-5">
            <p>A 3D Generalist and Motion Designer based in Taiwan.</p>
            <p>Offering professional design services for digital arts and product motion design,
              <br>catering to companies and brands.</p>
          </div>
          <router-link :to="{ name : 'WorksPage' }">
            <button type="button" class="btn btn-primary index-btn">Explore</button>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
/* Mobile */
@media only screen and (max-width: 1024px) {
  .index-btn{
    width: 80vw;
  }
}
#mos-logo {
    width: 21vh;
    height: 14vh;
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
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  object-fit: cover;
  filter: brightness(55%);
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
  min-width: 10vh;
  box-shadow: none;
  border: 1px;
}
</style>

