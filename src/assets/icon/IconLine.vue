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
        <path d="m15.45,0H.55C.25,0,0,.25,0,.55s.25.55.55.55h14.91c.3,0,.55-.25.55-.55s-.25-.55-.55-.55h0Z" />
    </svg>
</template>
