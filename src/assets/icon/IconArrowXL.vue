<script setup>
defineProps({
    viewBox: { type: String, default: "0 0 400 400" },
    width: { type: [String, Number], default: "1em" },
    height: { type: [String, Number], default: "1em" },
    fill: { type: String, default: "currentColor" },
});
</script>
<template>
    <svg xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox" :width="width" :height="height" :fill="fill" role="img" v-bind="$attrs">
        <path
            d="M397.44,196.63c-1.74,0-3.46,0.03-5.17,0.09c-72.58-1.25-119.58-50.06-139.8-71.07l-0.7-0.73l-5.33,5.13l0.7,0.73
        c16.21,16.84,49.09,51,98.43,66.01H2.72v7.4h344.52c-48.97,15.11-81.64,49.04-97.78,65.81l-0.7,0.73l5.33,5.13l0.7-0.73
        c19.81-20.58,65.34-67.87,135.46-70.94h6.67v-0.15c0.17,0,0.34-0.01,0.51-0.01V196.63z"
        />
    </svg>
</template>
