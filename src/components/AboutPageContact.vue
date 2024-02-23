<script setup>
import LinkData from "@/data/LinkData.json";

const splitText = (string) => {
    const arr = string.split(" ");
    return arr;
};
</script>
<template>
    <section class="about-contact d-flex-center min-h-[85vh] w-full bg-main-black px-4 py-8 lg:px-5">
        <div class="container flex flex-col lg:flex-row lg:justify-around">
            <!-- Links -->
            <div class="mb-12 px-0 md:px-12 lg:mb-0 xl:flex xl:px-0">
                <div class="about-intro-social">
                    <div class="mb-10 fill-white">
                        <svg class="w-54 h-16" id="mos-logo">
                            <use xlink:href="#icon-mosLogo"></use>
                        </svg>
                    </div>
                    <ul class="list-reset mb-5 flex flex-row flex-wrap lg:mb-10">
                        <li v-for="item in LinkData.socialmedia" :key="item" class="intro-infosocial w-1/5">
                            <a class="inline-block rounded-full p-6 md:p-2" :href="item.url" target="_blank" rel="noopener">
                                <svg class="size-7 fill-main-neutral lg:size-9" id="icon_social">
                                    <use :xlink:href="item.icon"></use>
                                </svg>
                            </a>
                        </li>
                    </ul>
                    <div class="flex justify-center lg:justify-start">
                        <div class="space-y-2">
                            <div v-for="(item, index) in LinkData.profile_link" :key="item.text" :data-index="index" class="intro-infocontact flex items-center p-2">
                                <svg class="mr-5 size-6 fill-main-neutral lg:size-7" id="icon_social">
                                    <use :xlink:href="item.icon"></use>
                                </svg>
                                <h5 class="text-main-neutral">{{ item.text }}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Button -->
            <div class="">
                <h1 class="mb-8 uppercase text-main-neutral lg:mb-12">
                    <span v-for="(text, index) in splitText('Let\'s Get in Touch')" :key="index" class="inline-flex pe-2 xl:pe-4">
                        <span class="block font-bold" id="contact-title"> {{ text }} </span>
                    </span>
                </h1>
                <div class="group">
                    <router-link :to="{ name: 'Contact' }" class="line-btn me-md-5 max-w-xl px-2 py-1 lg:py-5">
                        <h3 class="text-main-neutral group-hover:text-black">Contact</h3>
                        <svg class="lg:24 h-24 w-36 fill-main-neutral group-hover:fill-black lg:w-48">
                            <use xlink:href="#icon-arrowxl"></use>
                        </svg>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>
