<script setup>
import LinkData from "../data/LinkData.json";
import NavLink from "./NavbarLink.vue";
</script>
<template>
<footer class="d-flex-center bg-main-black text-white h-[35vh]">
    <div class="container mx-auto flex flex-wrap px-4 py-5 sm:px-4 lg:px-12 lg:py-2 ">
        <div class="lg:w-1/2 md:mb-0">
            <div class="fill-white mb-3">
                <svg class="w-54 h-16" id="mos-logo">
                    <use xlink:href="#icon-mosLogo"></use>
                </svg>
            </div>
            <h5>Copyright © 2024 moszheng.</h5>
        </div>
        <div class="lg:w-1/2 flex">
            <ul class="w-1/2 space-y-6">
                <NavLink :to="'Works'" />
                <NavLink :to="'Showreel'" />
                <NavLink :to="'About'" />
                <NavLink :to="'Contact'" />
            </ul>
            <div class="w-1/2 space-y-6">
                <ul class="flex">
                    <li v-for="item in LinkData.socialmedia" :key="item" class="col-md-auto w-1/5">
                        <a class="inline-block py-2 pr-8 no-underline" :href="item.url" target="_blank" rel="noopener">
                            <svg class="lg:size-7 size-6" id="icon_social" fill="#FFF">
                                <use :xlink:href="item.icon"></use>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</footer>
</template>
