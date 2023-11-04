<script setup>
import {ref, onMounted} from 'vue'

// preloading
const bgImage = [
  '../src/img/01_gma29.jpg',
  '../src/img/03_SWSX_01.jpg',
  '../src/img/05_GMA32_01.png',
  '../src/img/04_KK_01.png',
  '../src/img/07_VIVA_01.jpg',
  '../src/img/02_gha56_01.png',
];

const bgStyles = ref(`background-image: url(${bgImage[0]});`);
const index = ref(0);

onMounted(() => {
  bgImage.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
});

setInterval(() => {
    bgStyles.value = `background-image: url(${bgImage[index.value]});`;
    index.value = (index.value + 1) % bgImage.length;
}, 1000);

</script>

<template>
  <main class="Home">
    <!----- BG ----->
    <div id="index-bgcover" :style="bgStyles"></div>
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

#index-bgcover{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  object-fit: cover;
  filter: brightness(55%);
  transition: background 1.2s linear;
}
.index-info{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
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
