<script setup>
import FooterItem from '@/components/FooterItem.vue'
import { ref } from 'vue'
</script>
<template>
<div class="showreel">
    <!-- video -->
    <div class="ratio ratio-16x9 mb-5" data-scroll-section>
        <iframe src="https://player.vimeo.com/video/880783588?h=6ea64f06ea&color=ffffff&title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
    </div>
    <FooterItem />
</div>
</template>
<style>
main{
    padding-right: 0 !important;
    padding-left: 0 !important;
}
</style>
