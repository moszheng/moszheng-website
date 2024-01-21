<script setup>
import LinkData from '../data/LinkData.json';
</script>
<template>
<footer class="d-flex-center text-white">
    <div class="container d-flex flex-wrap px-lg-5 px-4 py-lg-2 py-5" >
        <div class="mb-md-3 mb-4">
            <h5>Copyright © 2024 moszheng.</h5>
        </div>
        <div class="ms-md-6">
            <h5>Follow</h5>
            <ul class="foot-social d-flex flex-row ps-0">
                <li v-for="item in LinkData.socialmedia" :key="item" class="col-2 col-md-auto">
                    <a class="nav-link p-2" :href="item.url" target="_blank" rel="noopener">
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
    background: var(--main-black);
    min-height: 20vh;
}
.foot-social{
    list-style: none;
}
</style>
