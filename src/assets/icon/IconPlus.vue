<script setup>
defineProps({
    viewBox: { type: String, default: "0 0 16 16" },
    width: { type: [String, Number], default: "1em" },
    height: { type: [String, Number], default: "1em" },
    fill: { type: String, default: "currentColor" },
});
</script>
<template>
    <svg xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox" :width="width" :height="height" :fill="fill" role="img" v-bind="$attrs">
        <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
    </svg>
</template>
