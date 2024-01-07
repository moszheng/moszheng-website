<script setup>
import FooterItem from '@/components/FooterItem.vue';

</script>
<template>
<div>
    <div class="showreel container">
        <!-- video -->
        <div class="ratio ratio-16x9 mb-5" data-scroll-section>
            <iframe
                src="https://player.vimeo.com/video/880783588?h=6ea64f06ea&color=ffffff&title=0&byline=0&portrait=0" 
                allow="autoplay">
            </iframe>
        </div>
    </div>
<FooterItem />
</div>
</template>
<style>
.showreel{
    padding-right: 0 !important;
    padding-left: 0 !important;
    min-height: 80vh;
}
@media only screen and (max-width: 1024px) {
  .showreel{
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
