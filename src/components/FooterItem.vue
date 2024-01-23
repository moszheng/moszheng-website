<script setup>
import LinkData from '../data/LinkData.json';
</script>
<template>
<footer class="d-flex-center text-white bg-main-black">
    <div class="container flex flex-wrap mx-auto sm:px-4 lg:px-12 px-4 lg:py-2 py-5" >
        <div class="md:mb-0 mb-4 mr-4">
            <h5>Copyright © 2024 moszheng.</h5>
        </div>
        <div class="md:ml-32">
            <h5>Follow</h5>
            <ul class="foot-social flex flex-row ps-0">
                <li v-for="item in LinkData.socialmedia" :key="item" class="w-1/5 col-md-auto">
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
footer{
    min-height: 20vh;
}
</style>
