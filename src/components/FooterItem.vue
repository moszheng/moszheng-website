<script setup>
import LinkData from '../data/LinkData.json'
</script>
<template>
<footer class="d-flex justify-content-center align-items-center">
    <div class="container row text-white px-lg-5 py-2" >
        <div class="col-lg-3">
            <p>Copyright © 2023 moszheng.</p>
        </div>
        <div class="col-lg-4">
            <p> Follow </p>
            <ul class="navbar-nav flex-row flex-wrap mb-4">
                <li v-for="item in LinkData.socialmedia" class="nav-item col-2 col-md-auto">
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
    background: #0e0e0e;
    min-height: 15vh;
}

.float-right {
  float: right;
}
</style>
