<script setup>
import FooterItem from "@/components/FooterItem.vue";
</script>
<template>
<div class="">
    <main class="showreel d-flex-center">
        <!-- video -->
        <div class="mb-5 mt-12 w-full pt-5">
            <iframe
                class="aspect-video w-full bg-blue-200"
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
.showreel {
    min-height: 85vh;
}
</style>
