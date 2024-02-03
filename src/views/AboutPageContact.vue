<script setup>
import LinkData from "@/data/LinkData.json";

const splitText = (string) => {
    const arr = string.split(" ");
    return arr;
};
</script>
<template>
    <section class="about-contact d-flex-center min-h-[80vh] w-full bg-main-black px-4 py-8 lg:px-5">
        <div class="container flex lg:justify-around flex-col lg:flex-row">
            <!-- Links -->
            <div class="px-0 md:px-12 xl:flex xl:px-0 lg:mb-0 mb-12">
                <div class="about-intro-social">
                    <div class="fill-white mb-10">
                        <svg class="w-54 h-16" id="mos-logo">
                            <use xlink:href="#icon-mosLogo"></use>
                        </svg>
                    </div>
                    <ul class="list-reset mobile-center mb-10 flex flex-row flex-wrap">
                        <li v-for="item in LinkData.socialmedia" :key="item" class="intro-infosocial w-1/5">
                            <a class="inline-block rounded-full p-6 md:p-2" :href="item.url" target="_blank" rel="noopener">
                                <svg class="size-7 fill-main-neutral lg:size-9" id="icon_social">
                                    <use :xlink:href="item.icon"></use>
                                </svg>
                            </a>
                        </li>
                    </ul>
                    <div class="mobile-center">
                        <div class="mb-4">
                            <div v-for="(item, index) in LinkData.profile_link" :key="item.text" :data-index="index" class="intro-infocontact mb-2 flex p-2">
                                <svg class="size-6 fill-main-neutral lg:size-7" id="icon_social">
                                    <use :xlink:href="item.icon"></use>
                                </svg>
                                <h5 class="ml-3 text-main-neutral">{{ item.text }}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Button -->
            <div class="">
                <h1 class="mb-12 uppercase text-main-neutral">
                    <span v-for="(text, index) in splitText('Let\'s Get in Touch')" :key="index" class="inline-flex pe-2 xl:pe-4">
                        <span class="block font-bold" id="contact-title"> {{ text }} </span>
                    </span>
                </h1>
                <router-link :to="{ name: 'Contact' }" class="d-flex-center me-md-5 max-w-xl rounded-full border-4 border-main-neutral bg-transparent px-2 py-5">
                    <h3 class="text-main-neutral">Contact</h3>
                    <svg class="w-48 fill-main-neutral">
                        <use xlink:href="#icon-arrowxl"></use>
                    </svg>
                </router-link>
            </div>
        </div>
    </section>
</template>
