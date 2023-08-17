<script>
import LoadingPage from "./views/Loading.vue";

</script>
<template>
<header class="sticky-top">
  <nav class="container navbar navbar-expand-lg flex-wrap flex-lg-nowrap">
      <div class="container-fluid">
          <div class="navbar-brand flex-column flex-md-row align-items-center">
                <router-link :to="{ name : 'Home' }" class="nav-link link-dark active" aria-current="page">
                    <h3 class="t-bold mx-lg-3">moszheng.design</h3>
                </router-link>
          </div>
          <!-- navbar button -->
          <button class="navbar-toggler collapsed d-flex d-lg-none flex-column justify-content-around" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="toggler-icon top-bar"></span>
              <span class="toggler-icon mid-bar"></span>
              <span class="toggler-icon bot-bar"></span>
          </button>
          <!-- Canvas -->
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="nav mx-lg-4">
                  <li class="nav-item"><router-link :to="{ name : 'Works' }" class="nav-link link-dark px-2">Works</router-link></li>
                  <li class="nav-item"><router-link :to="{ name : 'About' }" class="nav-link link-dark px-2">About</router-link></li>
                  <li class="nav-item"><router-link :to="{ name : 'Contact' }" class="nav-link link-dark px-2">Contact</router-link></li>
              </ul>
              <div class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                  <ul class="navbar-nav flex-row flex-wrap ms-md-auto">
                      <li class="nav-item col-3 col-md-auto">
                          <a class="nav-link p-2" href="https://github.com/moszheng" target="_blank" rel="noopener">
                              <svg id="icon_github">
                                  <use xlink:href="#icon-github"></use>
                              </svg>
                          </a>
                      </li>
                      <li class="nav-item col-3 col-md-auto">
                          <a class="nav-link p-2" href="https://www.behance.net/moszheng" target="_blank" rel="noopener">
                              <svg id="icon_twitter">
                                  <use xlink:href="#icon-behance"></use>
                              </svg>
                          </a>
                      </li>
                      <li class="nav-item col-3 col-md-auto">
                          <a class="nav-link p-2" href="https://www.instagram.com/slothfellas/" target="_blank" rel="noopener">
                              <svg id="icon_twitter">
                                  <use xlink:href="#icon-instagram"></use>
                              </svg>
                          </a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </nav>
  <div class="border-bottom"></div>
</header>
<router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
        <Suspense>
            <template #default>
                <component :is="Component"></component>
            </template>
            <template #fallback>
                <LoadingPage/>
            </template>
        </Suspense>
    </Transition>
</router-view>

<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <!-- <svg xmlns="http://www.w3.org/2000/svg" class="navbar-nav-svg d-inline-block align-text-top" viewBox="0 0 512 499.36" role="img"> -->
    <symbol id="icon-twitter" viewBox="0 0 512 416.32">
        <path d="M160.83 416.32c193.2 0 298.92-160.22 298.92-298.92 0-4.51 0-9-.2-13.52A214 214 0 0 0 512 49.38a212.93 212.93 0 0 1-60.44 16.6 105.7 105.7 0 0 0 46.3-58.19 209 209 0 0 1-66.79 25.37 105.09 105.09 0 0 0-181.73 71.91 116.12 116.12 0 0 0 2.66 24c-87.28-4.3-164.73-46.3-216.56-109.82A105.48 105.48 0 0 0 68 159.6a106.27 106.27 0 0 1-47.53-13.11v1.43a105.28 105.28 0 0 0 84.21 103.06 105.67 105.67 0 0 1-47.33 1.84 105.06 105.06 0 0 0 98.14 72.94A210.72 210.72 0 0 1 25 370.84a202.17 202.17 0 0 1-25-1.43 298.85 298.85 0 0 0 160.83 46.92"></path>
    </symbol>
    <symbol id="icon-github" viewBox="0 0 512 499.36">
        <path d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z"></path>
    </symbol>
    <symbol id="bi-envelope-fill" viewBox="0 0 16 16" class="bi bi-envelope-fill">
        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
    </symbol>
    <symbol id="bi-geo-alt-fill" viewBox="0 0 16 16" class="bi bi-geo-alt-fill">
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
    </symbol>
    <symbol id="icon-behance" viewBox="0 0 16 16">
        <path d="M4.654 3c.461 0 .887.035 1.278.14.39.07.711.216.996.391.286.176.497.426.641.747.14.32.216.711.216 1.137 0 .496-.106.922-.356 1.242-.215.32-.566.606-.997.817.606.176 1.067.496 1.348.922.281.426.461.957.461 1.563 0 .496-.105.922-.285 1.278a2.317 2.317 0 0 1-.782.887c-.32.215-.711.39-1.137.496a5.329 5.329 0 0 1-1.278.176L0 12.803V3h4.654zm-.285 3.978c.39 0 .71-.105.957-.285.246-.18.355-.497.355-.887 0-.216-.035-.426-.105-.567a.981.981 0 0 0-.32-.355 1.84 1.84 0 0 0-.461-.176c-.176-.035-.356-.035-.567-.035H2.17v2.31c0-.005 2.2-.005 2.2-.005zm.105 4.193c.215 0 .426-.035.606-.07.176-.035.356-.106.496-.216s.25-.215.356-.39c.07-.176.14-.391.14-.641 0-.496-.14-.852-.426-1.102-.285-.215-.676-.32-1.137-.32H2.17v2.734h2.305v.005zm6.858-.035c.286.285.711.426 1.278.426.39 0 .746-.106 1.032-.286.285-.215.46-.426.53-.64h1.74c-.286.851-.712 1.457-1.278 1.848-.566.355-1.243.566-2.06.566a4.135 4.135 0 0 1-1.527-.285 2.827 2.827 0 0 1-1.137-.782 2.851 2.851 0 0 1-.712-1.172c-.175-.461-.25-.957-.25-1.528 0-.531.07-1.032.25-1.493.18-.46.426-.852.747-1.207.32-.32.711-.606 1.137-.782a4.018 4.018 0 0 1 1.493-.285c.606 0 1.137.105 1.598.355.46.25.817.532 1.102.958.285.39.496.851.641 1.348.07.496.105.996.07 1.563h-5.15c0 .58.21 1.11.496 1.396zm2.24-3.732c-.25-.25-.642-.391-1.103-.391-.32 0-.566.07-.781.176-.215.105-.356.25-.496.39a.957.957 0 0 0-.25.497c-.036.175-.07.32-.07.46h3.196c-.07-.526-.25-.882-.497-1.132zm-3.127-3.728h3.978v.957h-3.978v-.957z"/>
    </symbol>
    <symbol id="icon-star" viewBox="0 0 28 28">
        <path d="M13.996,22.501 L22.649,27.997 L20.352,17.637 L27.996,10.667 L17.930,9.768 L13.996,-0.003 L10.063,9.768 L-0.003,10.667 L7.641,17.637 L5.345,27.997 L13.996,22.501 Z"/>
    </symbol>
    <symbol id="icon-instagram" viewBox="0 0 16 16">
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
    </symbol>
    <symbol id="icon-filter-category" viewBox="0 0 13 13">
        <path d="M4.75568 6.41662C4.95995 6.71222 4.89888 6.4659 4.89888 12.358C4.89888 12.8852 5.50044 13.187 5.92441 12.8716C7.73611 11.5057 8.09808 11.3874 8.09808 10.7485C8.09808 6.45481 8.04803 6.69627 8.24128 6.41662L11.1833 2.41206H1.81372L4.75568 6.41662Z"></path>
        <path d="M12.2946 0.326523C12.1895 0.125176 11.9833 0 11.7563 0H1.24064C0.750473 0 0.462061 0.552932 0.743236 0.954687C0.745547 0.958547 0.71132 0.911701 1.2541 1.65039H11.7428C12.2054 1.02088 12.5146 0.748896 12.2946 0.326523Z"></path>
    </symbol>
    <symbol id="arrow-right-short" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"></path>
    </symbol>
    <symbol id="x-lg" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"></path>
        <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"></path>
    </symbol>
</svg>
</template>

<style>
/*---------Vue Transition--------*/

.fade-enter-active {
    transition: opacity 1s ease;
    /* transform: translateX(10px) */
}
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/*---------------nav bar---------------------*/
header  {
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  background-color: hsla(0, 0%, 98.3%, 0.75);
}
/*-------- nav bar toggler icon------*/
.navbar-toggler{
  width: 20px;
  height: 20px;
  position: relative;
  transition: .5s ease-in-out;
}
/*Cancel default outline*/
.navbar-toggler,
.navbar-toggler:focus,
.navbar-toggler:active,
.navbar-toggler-icon:focus{
  outline: none;
  box-shadow: none;
  border: 0; 
}
.navbar-toggler span {
  margin: 0;
  padding: 0;
}
.toggler-icon{
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: black;
  border-radius: 1px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: .25s ease-in-out;
}
.middle-bar {
  margin-top: 0px;
}

/*-----*/
.navbar-toggler .top-bar{
  margin-top: 0px;
  transform: rotate(135deg);
}
.navbar-toggler .mid-bar{
  opacity: 0;
  filter: alpha(opacity=0);
}
.navbar-toggler .bot-bar{
  margin-top: 0px;
  transform: rotate(-135deg);
}
/*-----*/
.navbar-toggler.collapsed .top-bar{
  margin-top: -15px;
  transform: rotate(0deg);
}
.navbar-toggler.collapsed .mid-bar{
  opacity: 1;
  filter: alpha(opacity=100);
}
.navbar-toggler.collapsed .bot-bar{
  margin-top: 15px;
  transform: rotate(0deg);
}
</style>