<script setup>
import LinkData from "../data/LinkData.json";
import NavLink from "./NavbarLink.vue";
</script>
<template>
<footer class="d-flex-center min-h-[35vh] bg-main-black text-white">
    <div class="container mx-auto flex flex-wrap px-6 py-5 text-main-neutral lg:px-12 lg:py-10">
        <div class="mb-12 flex flex-col lg:mb-0 lg:w-3/5">
            <div class="mb-3 fill-white">
                <svg class="h-12 w-48 lg:h-16 lg:w-64">
                    <use xlink:href="#icon-mosLogo"></use>
                </svg>
            </div>
            <div class="hidden h-full items-end lg:flex">
                <h5>Copyright © 2024 moszheng.</h5>
            </div>
        </div>
        <!-- Links -->
        <div class="mb-12 flex space-x-12 lg:mb-0 lg:w-2/5 lg:space-x-0">
            <div class="lg:w-1/2">
                <h4 class="mb-8 lg:mb-12">Page</h4>
                <ul class="space-y-1 lg:space-y-2">
                    <NavLink :to="'Works'" />
                    <NavLink :to="'Showreel'" />
                    <NavLink :to="'About'" />
                    <NavLink :to="'Contact'" />
                </ul>
            </div>
            <div class="lg:w-1/2">
                <h4 class="mb-8 lg:mb-12">Connect</h4>
                <ul class="space-y-1 lg:space-y-2">
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
        <div class="flex h-full items-end lg:hidden">
            <h5>Copyright © 2024 moszheng.</h5>
        </div>
    </div>
</footer>
</template>
