<script setup>
import { useNavStore } from "@/stores/navstore";
import { splitText } from "@/module/SplitText.js";
const store = useNavStore();
import profileImage1 from '@/img/profile_1_md.webp';
import profileImage2 from '@/img/profile_2_md.webp';
</script>
<template>
    <section class="about-hero d-flex-center mb-12 h-svh flex-wrap px-3 pt-5 xl:mb-0 xl:h-screen xl:px-10 xl:py-12 2xl:px-16">
        <!-- profile image -->
        <div class="d-flex-center mt-16 mb-5 pr-4 pl-4 xl:mt-0 xl:mb-0 2xl:w-1/2">
            <div class="profile-container parallax relative max-h-[600px] overflow-hidden w-[48vmin] min-h-[56vmin] max-xl:w-[35vmax] max-xl:min-h-[40vmax] will-change-transform-opacity" data-depth="2" data-scale="1.2">
                <!-- profile-container
                    w-[48vmin] min-h-[56vmin] 
                    max-xl:w-[35vmax] max-xl:min-h-[40vmax]
                -->
                <figure class="absolute z-20 h-full scale-[1.2] blur-none will-change-transform-opacity" id="profile-img-1">
                    <div class="parallax heroRot h-full will-change-transform-opacity" data-depth="1.05" data-scale="1.05">
                        <img class="lazy aspect-3/2 h-full object-cover" alt="profile_image" :src="profileImage1" />
                    </div>
                </figure>
                <figure class="absolute z-10 h-full scale-[1.2] blur-none" id="profile-img-2">
                    <div class="parallax heroRot h-full" data-depth="3.2" data-scale="1.15">
                        <img class="lazy aspect-3/2 h-full object-cover" alt="profile_image" :src="profileImage2" />
                    </div>
                </figure>
            </div>
        </div>
        <!-- Hero text -->
        <div
            class="about-hero-info d-flex-center 2xl:w-1/2 2xl:ps-6"
            :class="{ 'text-main-neutral': store.navbardarkmode, 'text-stone-950': !store.navbardarkmode }"
        >
            <div class="relative mb-3 md:mb-1">
                <!-- Name -->
                <h1 class="mobile-center mb-2 md:mb-0">
                    <span v-for="(text, index) in splitText('Hello, I\'m')" :key="index" class="inline-flex pe-2 xl:pe-4">
                        <span class="block font-bold" id="hero-hello"> {{ text }} </span>
                    </span>
                </h1>
                <!-- Name -->
                <h1 class="mobile-center mb-8 md:mb-10">
                    <span v-for="(text, index) in splitText('Sheng Wen Cheng')" :key="index" class="inline-flex pe-2 xl:pe-4">
                        <span class="block font-bold" id="hero-name"> {{ text }} </span>
                    </span>
                </h1>
                <!-- Subtitle -->
                <div class="flex">
                    <div class="flex flex-col items-center">
                        <h4 class="mb-10 text-center md:mb-12 md:text-left">
                            <span class="block font-bold" id="hero-detail">
                                <strong class="text-main-orange">3D Generalist</strong> and <strong class="text-main-orange">Motion Designer</strong>
                                <br />
                            </span>
                            <span class="block font-bold" id="hero-detail"> based in Taiwan. </span>
                        </h4>
                        <div class="flex items-center rotate-180" id="hero-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                fill="currentColor"
                                class="bi bi-chevron-compact-up"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Mobile (below XL) */
@media only screen and (max-width: 1439px) {
    .mobile-center {
        display: flex;
        justify-content: center !important;
    }   
}
/*------ Img --------*/
.profile-container {
    clip-path: inset(0% 0% 0% 0% round 12% 0%);
    -webkit-clip-path: inset(0 0% 0 0 round 12% 0%);
}
.will-change-transform-opacity{
    will-change: transform, opacity;
}
</style>
