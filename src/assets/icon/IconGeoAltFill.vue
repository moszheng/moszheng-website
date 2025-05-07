<script setup>
defineProps({
    viewBox: { type: String, default: "0 0 16 16" },
    width: { type: [String, Number], default: "1em" },
    height: { type: [String, Number], default: "1em" },
    fill: { type: String, default: "currentColor" },
});
</script>
<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :viewBox="viewBox"
        :width="width"
        :height="height"
        :fill="fill"
        role="img"
        v-bind="$attrs"
        class="bi bi-geo-alt-fill"
    >
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    </svg>
</template>
