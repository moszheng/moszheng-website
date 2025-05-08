<script setup>
import { useNavStore } from "@/stores/navstore";
import { splitPara, splitText } from "@/module/SplitText.js";
import ExpData from "@/data/Experience.json";
import IconArrowXL from "@/assets/icon/IconArrowXL.vue";
const store = useNavStore();
import profileImage3 from '@/img/02_gha56_md_02.webp';
import profileImage4 from '@/img/profile_4_md.webp';
</script>


<template>
    <section
        class="about-intro d-flex-center min-h-[85vh] rounded-b-lg p-6 xl:px-20 xl:py-12"
        :class="{ 'text-main-neutral': store.navbardarkmode, 'text-stone-950': !store.navbardarkmode }"
    >
        <div class="about-intro-block container w-full">
            <!-- Group1 -->
            <div class="about-intro-info mb-16 min-h-[70vh] items-center lg:flex lg:justify-around xl:mb-24">
                <!-- Intro -->
                <div class="4xl:pr-5 mb-12 flex h-full max-w-2xl pr-0 lg:mb-0 xl:w-2/5 xl:pr-10">
                    <div class="">
                        <h2 class="mb-8 inline-block overflow-hidden pb-1 xl:mb-16">
                            <span v-for="(text, index) in splitText(ExpData.about.para1.title)" :key="index" class="inline-flex pe-2 xl:pe-4">
                                <span class="block font-bold" id="intro-title"> {{ text }} </span>
                            </span>
                        </h2>
                        <div class="space-y-10">
                            <h4 v-for="(textarray, indexz) in splitPara(ExpData.about.para1.content)" :key="indexz" class="intro-info leading-normal">
                                <span v-for="(text, index) in textarray" :key="index" class="inline-block pe-2">
                                    <span class="split-text inline-block"> {{ text }} </span>
                                </span>
                            </h4>
                        </div>
                    </div>
                </div>
                <!-- Img -->
                <div class="intro-container relative overflow-hidden xl:w-1/2" :style="{ willChange: 'transform, opacity, clip-path' }">
                    <!-- <div class="intro-reveal absolute top-0 left-0 z-50 w-full h-full bg-main-orange"></div> -->
                    <figure class="profile-img-3 d-flex-center scale-[1.2]" :style="{ willChange: 'transform, opacity' }">
                        <div class="introparallax" data-depth="3">
                            <img class="lazy left-0 h-auto w-full object-cover" alt="profile_image" :src="profileImage3" />
                        </div>
                    </figure>
                </div>                
            </div>
            <!-- Group2 -->
            <div class="about-intro-info2 mb-16 min-h-[70vh] items-center lg:flex lg:justify-around">
                <!-- Img -->
                <div class="intro-container2 relative mb-8 overflow-hidden xl:mb-0 xl:w-1/2">
                    <figure class="profile-img-4 d-flex-center scale-[1.35]">
                        <div class="introparallax" data-depth="3">
                            <img class="lazy left-0 h-auto w-full object-cover" alt="profile_image" :src="profileImage4" />
                        </div>
                    </figure>                    
                </div>
                <!-- Intro -->
                <div class="4xl:pr-5 mb-12 flex h-full max-w-2xl pl-0 lg:mb-0 xl:pl-12">
                    <div class="">
                        <h2 class="intro-title2 mb-8 inline-block overflow-hidden xl:mb-16">
                            <span v-for="(text, index) in splitText(ExpData.about.para2.title)" :key="index" class="inline-flex pe-2 xl:pe-4">
                                <span class="inline-block font-bold" id="intro-title2"> {{ text }} </span>
                            </span>
                        </h2>
                        <div class="mb-8 space-y-10 xl:mb-16">
                            <h4 v-for="(textarray, indexz) in splitPara(ExpData.about.para2.content)" :key="indexz" class="intro-info leading-normal">
                                <span v-for="(text, index) in textarray" :key="index" class="inline-block pe-2">
                                    <span class="split-text2 inline-block"> {{ text }} </span>
                                </span>
                            </h4>
                        </div>
                        <!-- <LineBottom :to="" :Word=""/> -->
                        <div class="group max-w-sm">
                            <router-link :to="{ name: 'Works' }" class="line-btn me-md-5 px-1 duration-200 group-hover:-translate-y-3">
                                <h3 class="duration-300 group-hover:text-black">Works</h3>
                                <IconArrowXL class="fill-main-neutral h-24 w-36 group-hover:fill-black lg:h-18 lg:w-36" />
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/*------ Img --------*/
.intro-container {
    min-height: 20vmin;
    clip-path: inset(0% 0% 0% 0%);
    -webkit-clip-path: inset(0 0% 0 0);
}
.intro-container2 {
    min-height: 20vmin;
    clip-path: inset(0% 0% 0% 0%);
    -webkit-clip-path: inset(0 0% 0 0);
}
</style>
