<script setup>
import { ref } from 'vue'

// preloading
// const bg_image= new Image();

const bg_image = [
  '../src/img/01_gma29.jpg', 
  '../src/img/03_SWSX_01.jpg',
  '../src/img/05_GMA32_01.png',
  '../src/img/04_KK_01.png',
  '../src/img/02_gha56_01.png',
];

const backgroundImage = ref('../src/img/02_gha56_01.png');
const bgStyles = ref(`background-image: url(${backgroundImage.value});`);

let index = 0;

setInterval(() => {
      
  backgroundImage.value = `url(${bg_image[index]})`;
  bgStyles.value = `background-image: url(${bg_image[index]});`;
  index = (index + 1) % bg_image.length;
      
}, 3500);

</script>

<template>
  <main class="Home ">
    <!----- BG ----->
    <div id="index_bg_cover" :style="bgStyles"></div>
    <!--  Intro ---->
    <div class="index_info container d-flex justify-content-end align-items-center">
          <!----- Main Content----->
          <div class="mx-5 px-5 text-white">  
            <h5 class="mb-2">Freelance 3D Generalist</h5>
            <h1 class="mb-5">Sheng Wen (Mos) Cheng</h1>
            <div class="mb-5">
              <p>A 3D Generalist and Motion Designer based in Taiwan.</p>
              <p>Offering professional design services for digital arts and product motion design, 
                <br>catering to companies and brands.</p>
            </div>
            <router-link to="/works">
              <button type="button" class="btn btn-primary index-btn">Explore</button>
            </router-link>
          </div>
      </div>
  </main>
</template>

<style>
#index_bg_cover{
  position: absolute;
  width: 100%;
  height: 90vh;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  object-fit: cover;
  
  filter: brightness(55%);
  z-index: -1;
  transition: background 1.2s linear; 
}
.index_info{
  /* position: absolute; */
  height: 90vh;
  z-index: 1;
  
}
/* Button */
.index-btn{
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  background-color: hsla(0, 0%, 95.3%, 0.25);
  /* outline: solid; */
  min-width: 10vh;
  box-shadow: none;
  border: 1px; 
}
</style>