<script setup>
import LinkData from "../data/LinkData.json";
import NavLink from "./NavbarLink.vue";
</script>
<template>
<footer class="d-flex-center bg-main-black text-white min-h-[35vh]">
    <div class="container mx-auto flex flex-wrap px-6 py-5 lg:px-12 lg:py-10 text-main-neutral ">
        <div class="lg:w-3/5 lg:mb-0 mb-12">
            <div class="fill-white mb-3">
                <svg class="w-64 h-16">
                    <use xlink:href="#icon-mosLogo"></use>
                </svg>
            </div>
            <h5 class="">Copyright © 2024 moszheng.</h5>
        </div>
        <!-- Links -->
        <div class="lg:w-2/5 flex lg:space-x-0 space-x-8">
            <div class="lg:w-1/2">
                <h4 class="lg:mb-12 mb-6">Page</h4>
                <ul class="space-y-2">
                    <NavLink :to="'Works'" />
                    <NavLink :to="'Showreel'" />
                    <NavLink :to="'About'" />
                    <NavLink :to="'Contact'" />
                </ul>
            </div>
            <div class="lg:w-1/2 ">
                <h4 class="lg:mb-12 mb-6">Connect</h4>
                <ul class="space-y-2">
                    <li v-for="item in LinkData.socialmedia" :key="item">
                        <a class="inline-block p-1" :href="item.url" target="_blank" rel="noopener">
                            <!-- <svg class="lg:size-7 size-6" id="icon_social" fill="#FFF">
                                <use :xlink:href="item.icon"></use>
                            </svg> -->
                            <h5 class="font-bold">{{ item.name }}</h5>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</footer>
</template>
