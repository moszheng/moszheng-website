<script setup>
import { ref } from 'vue'

const backgroundImage = ref('../src/img/02_gha56_01.png');
const bgStyles = ref(`background-image: url(${backgroundImage.value});`);

const bg_image = [
    '../src/img/01_gma29.jpg', 
    '../src/img/03_SWSX_01.jpg',
    '../src/img/05_GMA32_01.png',
    '../src/img/04_KK_01.png',
    '../src/img/02_gha56_01.png',
];

let index = 0;

setInterval(() => {
      
  backgroundImage.value = `url(${bg_image[index]})`;
  bgStyles.value = `background-image: url(${bg_image[index]});`;
  index = (index + 1) % bg_image.length;
      
}, 3500);

</script>

<template>
  <div class="border-bottom"></div>
  <main class="">
    <section class="" >
      <!----- BG ----->
      <div class="index_bg_cover" id="index_bg_cover" :style="bgStyles">
        <div class="index_bg_overlay d-flex justify-content-center align-items-center h-100" style="background-color: rgba(0, 0, 0, 0.55); transform: scale(1.001);">
          <div class="row">
            <!----- Main Content----->
            <div class="col-xl-7 col-lg-6 col-md-0"></div>
            <div class="col-xl-5 col-lg-6 col-md-12 px-5 text-white">
              <h5 class="mb-2">Freelance 3D Generalist</h5>
              <h1 class="mb-5">Sheng Wen (Mos) Cheng</h1>
              <div class="mb-5">
                A 3D Generalist and Motion Designer freelancer based in Taiwan.
                Offering professional design services for digital arts and product motion design, catering to companies and brands.
              </div>
              <router-link to="/works">
                <button type="button" class="btn btn-primary index-btn">Explore</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style>
.index_bg_cover{
  position: relative;
  height: 92vh;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  transition: background 1.2s linear; 
}
.index-btn{
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  background-color: hsla(0, 0%, 95.3%, 0.25);
  /* outline: solid; */
  box-shadow: none;
  border: 1px; 
}
</style>