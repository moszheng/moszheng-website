<script setup>
import FooterItem from '@/components/FooterItem.vue';
</script>
<template>
<div class="">
    <main class="showreel d-flex-center">
        <!-- video -->
        <div class="ratio ratio-16x9 mt-5 pt-5 mb-5" data-scroll-section>
            <iframe
                src="https://player.vimeo.com/video/880783588?h=6ea64f06ea&color=ffffff&title=0&byline=0&portrait=0"
                allow="autoplay"
            >
            </iframe>
        </div>
    </main>
<FooterItem />
</div>
</template>
<style>
.showreel{
    min-height: 85dvh;
}
</style>
