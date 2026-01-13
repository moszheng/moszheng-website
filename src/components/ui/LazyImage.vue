<template>
    <img
        :src="src"
        :alt="alt"
        class="lazy"
        :class="{ loaded: isLoaded }"
        @load="onLoad"
    />
</template>

<script setup>
import { ref } from "vue";

defineProps({
    src: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        default: "",
    },
});

const isLoaded = ref(false);

const onLoad = () => {
    isLoaded.value = true;
};
</script>

<style scoped>
.lazy {
    opacity: 0;
    transition: opacity 0.5s ease;
}
.lazy.loaded {
    opacity: 1;
}
</style>
