<script setup>
import ExpData from "@/data/Experience.json";
</script>
<template>
    <!-- Experience Breakpoint: xl, lg(1024) -->
    <section class="about-exp d-flex-center min-h-screen bg-main-black px-4 py-5 text-main-neutral xl:px-12">
        <div class="about-exp-block container mb-8 mt-11 flex flex-wrap lg:mb-4 xl:mt-0">
            <!-- Exp Title -->
            <div class="mb-10 px-4 pt-2 lg:mb-6 lg:w-1/3 lg:pl-0 lg:pr-10">
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
                        <div class="flex w-1/4 justify-center">
                            <div class="timeline invisible top-[70px] w-px origin-top bg-linear-to-b from-[#4e4e4e] via-[#818181] to-[#3a3a3a]"></div>
                            <div class="flex justify-center py-9">
                                <div class="h-2.5 w-2.5 rounded-full bg-main-gray duration-200 group-hover:bg-main-orange"></div>
                            </div>
                        </div>
                    </div>
                    <!-- Exp Job Content -->
                    <div class="w-4/5 rounded-lg bg-linear-to-r py-6 pl-2 pr-4 group-hover:from-transparent group-hover:to-[#242222] xl:w-3/4 xl:pl-4">
                        <div class="mb-6">
                            <h3 class="exp-job-title relative mb-2 max-w-full flex-1 grow">{{ item.title }}</h3>
                            <div class="flex">
                                <h5 class="exp-job-title mb-0 mr-4">{{ item.company }}</h5>
                                <span class="block text-neutral-400 2xl:hidden">{{ item.duration }}</span>
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
<style>
/*------- Job timeline-------*/
.about-job:last-child .timeline {
    height: 0;
}
.timeline {
    position: absolute;
    height: calc(100% - 10px);
}
</style>
