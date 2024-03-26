<script setup>
import LogoData from "@/data/LogoData.json";
import ExpData from "@/data/Experience.json";
</script>
<template>
<!-- bg-gradient-to-r from-[#fc7a00] to-[#ffc354] -->
<section class="about-skill d-flex-center min-h-screen rounded-b-3xl bg-stone-200 px-4 py-5 xl:rounded-b-[12em] xl:px-24 xl:py-16">
    <div class="container mb-4 mt-4 xl:mt-0">
        <!-- Skill Title -->
        <div class="my-2 px-3 md:mb-12 md:pe-12 lg:ps-0">
            <h2 class="mb-5 text-center text-stone-950 md:mb-6" id="skill-title">Service & Skill</h2>
        </div>
        <!-- Skill card block -->
        <div class="mb-6 flex min-h-[20vh] flex-wrap md:mb-6 lg:w-full lg:gap-x-6">
            <article
                class="about-skill-card group my-2 max-w-full flex-1 transition-[flex] duration-300 ease-back hover:flex-[1.2] xl:my-0"
                v-for="skill in ExpData.service"
                :key="skill"
            >
                <div class="h-full rounded-3xl bg-[#f0efee] p-10 shadow-xl duration-300 hover:scale-y-105 hover:bg-main-orange">
                    <figure class="skill-card-icon d-flex-center mb-28 mt-8 h-40 w-full duration-500 group-hover:-translate-y-6 group-hover:scale-105">
                        <img class="lazy h-auto w-2/3 object-cover" alt="cardimg" :src="skill.logo"/>
                    </figure>
                    <h3 class="mb-4 text-[#ff8a47] group-hover:text-white md:mb-8" id="skill-card-title">{{ skill.title }}</h3>
                    <h5 class="mb-3 group-hover:text-white" id="skill-card-text" v-for="(item, index) in skill.content" :key="item.name" :data-index="index">
                        {{ item.name }}
                    </h5>
                </div>
            </article>
        </div>
        <!-- Skill Icon -->
        <div class="d-flex-center py-12">
            <div class="skill-icon-block vw-50">
                <div class="my-6 md:my-12">
                    <h3 class="mb-4 text-center text-stone-950" id="skill-tooltitle">Tools</h3>
                    <h5 class="text-center" id="skill-toolsubtitle">My Teammate and homies</h5>
                </div>
                <!-- tools block -->
                <div class="skill-logo-block d-flex-center flex-wrap">
                    <div class="skill-logo-container d-flex-center group md:w-1/5" v-for="(item, index) in LogoData.logo" :key="item.name" :data-index="index">
                        <figure class="mx-1 my-1 aspect-square rounded-md px-4 py-2 duration-300 group-hover:bg-neutral-300 xl:py-4">
                            <img :src="item.img" :alt="item.name" class="skill-logo w-16 max-w-full duration-200 group-hover:-rotate-[5deg] group-hover:scale-125 xl:w-12" />
                        </figure>
                        <span class="absolute -bottom-2 rounded-lg bg-gray-900 px-3 py-1 text-white opacity-0 duration-300 group-hover:-bottom-5 group-hover:opacity-100">{{
                            item.name
                        }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>
<style>
@media only screen and (max-width: 1439px) {
    .skill-icon-block {
        width: 80vw !important;
    }
}
</style>
