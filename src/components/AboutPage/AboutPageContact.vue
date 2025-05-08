<script setup>
import LinkData from "@/data/LinkData.json";
import IconMosLogo from "@/assets/icon/IconMosLogo.vue";
import IconArrowXL from "../../assets/icon/IconArrowXL.vue";

const splitText = (string) => {
    const arr = string.split(" ");
    return arr;
};
</script>
<template>
    <section class="about-contact d-flex-center bg-main-black min-h-[85vh] w-full px-4 py-8 lg:px-5">
        <div class="container flex flex-col lg:flex-row lg:justify-around">
            <!-- Links -->
            <div class="mb-12 px-0 md:px-12 lg:mb-0 xl:flex xl:px-0">
                <div class="about-intro-social">
                    <div class="mb-10">
                        <IconMosLogo class="h-16 w-54 fill-white" />
                    </div>
                    <ul class="list-reset mb-5 flex flex-row flex-wrap lg:mb-10">
                        <li v-for="item in LinkData.socialmedia" :key="item" class="intro-infosocial w-1/5">
                            <a class="inline-block rounded-full p-6 md:p-2" :href="item.url" target="_blank" rel="noopener">
                                <svg class="fill-main-neutral size-7 lg:size-9" id="icon_social">
                                    <use
                                        :xlink:href="item.icon"
                                        :style="{
                                            willChange: 'transform, opacity',
                                        }"
                                    >
                                    </use>
                                </svg>
                            </a>
                        </li>
                    </ul>
                    <div class="flex justify-center lg:justify-start">
                        <div class="space-y-2">
                            <div
                                v-for="(item, index) in LinkData.profile_link"
                                :key="item.text"
                                :data-index="index"
                                class="flex items-center p-2 intro-infocontact"
                                :style="{ willChange: 'transform, opacity' }"
                            >
                                <svg class="fill-main-neutral mr-5 size-6 lg:size-7" id="icon_social">
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
                <h1 class="text-main-neutral mb-8 uppercase lg:mb-12">
                    <span v-for="(text, index) in splitText('Let\'s Get in Touch')" :key="index" class="inline-flex pe-2 xl:pe-4">
                        <span
                            class="block font-bold"
                            id="contact-title"
                            :style="{ willChange: 'transform, opacity' }"
                        >
                            {{ text }}
                        </span>
                    </span>
                </h1>
                <div class="group">
                    <router-link :to="{ name: 'Contact' }" class="line-btn max-w-xl py-1 lg:py-5">
                        <h3 class="text-main-neutral group-hover:text-black">Contact</h3>
                        <IconArrowXL class="lg:24 fill-main-neutral h-24 w-36 group-hover:fill-black lg:w-48" />
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>
