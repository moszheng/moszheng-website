<script setup>
import ExpData from "@/data/Experience.json";
</script>
<template>
    <!-- Experience Breakpoint: xl, lg(1024) -->
    <section class="about-exp d-flex-center bg-main-black text-main-neutral min-h-screen px-4 py-5 xl:px-12">
        <div class="about-exp-block container mt-11 mb-8 flex flex-wrap lg:mb-4 xl:mt-0">
            <!-- Exp Title -->
            <div class="mb-10 px-4 pt-2 lg:mb-6 lg:w-1/3 lg:pr-10 lg:pl-0">
                <h2 class="text-main-neutral" id="about-exp-title">Experience</h2>
            </div>
            <!-- Timeline -->
            <ul class="space-y-5 md:space-y-7 lg:w-2/3 xl:px-4">
                <li class="about-job group flex flex-wrap" v-for="(item, index) in ExpData.experience" :key="item.company" :data-index="index">
                    <!-- Exp Job Duration & timeline -->                  
                    <div class="relative flex max-w-full flex-1 grow flex-wrap justify-center xl:px-4">
                        <!-- Toggle Duration -->
                        <div class="relative hidden max-w-full flex-1 grow px-2 py-7 text-center 2xl:block">
                            <h6>{{ item.duration }}</h6>
                        </div>
                        <!-- Mid -->
                        <div class="flex w-1/4 justify-center" >
                            <div class="absolute invisible h-[calc(100%-1rem)] last:h-0 top-[3.75rem] w-px origin-top bg-linear-to-b from-[#4e4e4e] via-[#818181] to-[#3a3a3a]"
                                :class="{timeline: index < 2}"
                            ></div>
                            <div class="flex justify-center py-9">
                                <div class="bg-main-gray group-hover:bg-main-orange h-2.5 w-2.5 rounded-full duration-200"></div>
                            </div>
                        </div>
                    </div>
                    <!-- Exp Job Content -->
                    <div
                        class="w-4/5 rounded-lg bg-linear-to-r py-6 pr-4 pl-2 group-hover:from-transparent group-hover:to-[#242222] xl:w-3/4 xl:pl-4"
                    >
                        <div class="mb-6" >
                            <h3 class="exp-job-title relative mb-2 max-w-full flex-1 grow" :style="{ willChange: 'transform, opacity' }">{{ item.title }}</h3>
                            <div class="flex" >
                                <h5 class="exp-job-title mr-4 mb-0" :style="{ willChange: 'transform, opacity' }">{{ item.company }}</h5>
                                <span class="block text-neutral-400 2xl:hidden" >{{ item.duration }}</span>
                            </div>
                        </div> 
                        <!-- Job detail -->
                        <ul class="max-w-2xl list-disc space-y-3 pl-3 text-neutral-400 group-hover:text-neutral-400">
                            <li v-for="content in item.detail" :key="content" class="exp-job-detail">
                                <h6>{{ content }}</h6>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>
