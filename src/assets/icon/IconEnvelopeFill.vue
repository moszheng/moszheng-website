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
        class="bi bi-envelope-fill"
    >
        <path
            d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"
        />
    </svg>
</template>
