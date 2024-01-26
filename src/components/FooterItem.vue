<script setup>
import LinkData from "../data/LinkData.json";
</script>
<template>
<footer class="d-flex-center bg-main-black text-white">
    <div class="container mx-auto flex flex-wrap px-4 py-5 sm:px-4 lg:px-12 lg:py-2">
        <div class="mb-4 mr-4 md:mb-0">
            <h5>Copyright © 2024 moszheng.</h5>
        </div>
        <div class="md:ml-32">
            <h5>Follow</h5>
            <ul class="foot-social flex flex-row ps-0">
                <li v-for="item in LinkData.socialmedia" :key="item" class="col-md-auto w-1/5">
                    <a class="inline-block py-2 pr-8 no-underline" :href="item.url" target="_blank" rel="noopener">
                        <svg id="icon_social" fill="#FFF">
                            <use :xlink:href="item.icon"></use>
                        </svg>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</footer>
</template>

<style scoped>
/*------ Footer-----------*/
footer {
    min-height: 20vh;
}
</style>
