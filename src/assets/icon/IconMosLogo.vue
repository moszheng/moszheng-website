<script setup>
defineProps({
    viewBox: { type: String, default: "0 0 100 25" },
    width: { type: [String, Number], default: "2em" },
    height: { type: [String, Number], default: "2em" },
    fill: { type: String, default: "currentColor" },
});
</script>
<template>
    <svg xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox" :width="width" :height="height" :fill="fill" role="img" v-bind="$attrs">
        <path
            d="m1.58,6.16h4.8l1.94,7.05h.04l1.94-7.05h4.83v12.61h-3.33v-7.9h-.04l-2.1,7.9h-2.7l-2.1-7.9h-.04v7.9H1.58V6.16Z"
            shape-rendering="geometricPrecision"
        />
        <path
            d="m15.62,12.51c0-3.77,2.47-6.58,6.38-6.58s6.42,2.8,6.42,6.58-2.5,6.56-6.42,6.56-6.38-2.79-6.38-6.56Zm9.07,0c0-2.06-.9-3.63-2.66-3.63s-2.66,1.57-2.66,3.63.9,3.62,2.66,3.62,2.66-1.55,2.66-3.62Z"
            shape-rendering="geometricPrecision"
        />
        <path
            d="m28.27,14.75h3.77c.12,1.01.9,1.48,2.12,1.48.72,0,1.61-.28,1.61-1.04s-.85-.95-2.4-1.34c-2.12-.53-4.67-1.25-4.67-3.93,0-2.89,2.36-3.99,5.2-3.99,2.61,0,5.01,1.09,5.06,3.84h-3.65c-.11-.69-.6-1.13-1.61-1.13-.81,0-1.38.37-1.38.88,0,.74,1.08.85,2.96,1.31,2.12.51,4.23,1.34,4.23,4.02s-2.45,4.22-5.43,4.22c-3.28,0-5.77-1.41-5.82-4.32Z"
            shape-rendering="geometricPrecision"
        />
        <path
            d="m39.66,15.74l4.71-5.41c.42-.49,1.01-1.02,1.01-1.02v-.05s-.64.07-1.2.07h-4.06v-3.16h10.16v2.77l-4.67,5.38c-.58.67-1.29,1.32-1.29,1.32v.05s.71-.07,1.48-.07h4.81v3.16h-10.95v-3.03Z"
            shape-rendering="geometricPrecision"
        />
        <path d="m51.27,6.16h3.69v4.62h3.88v-4.62h3.69v12.61h-3.69v-4.94h-3.88v4.94h-3.69V6.16Z" shape-rendering="geometricPrecision" />
        <path d="m63.51,6.16h9.82v3h-6.14v1.71h5.13v2.77h-5.13v1.98h6.31v3.16h-10V6.16Z" shape-rendering="geometricPrecision" />
        <path d="m74.22,6.16h3.69l4.13,7.09h.04v-7.09h3.56v12.61h-3.81l-4-7.14h-.04v7.14h-3.56V6.16Z" shape-rendering="geometricPrecision" />
        <path
            d="m95.68,17.43h-.04c-.79,1.15-2.08,1.64-3.62,1.64-1.69,0-3.14-.58-4.16-1.68-1.16-1.23-1.75-2.93-1.75-4.89,0-3.72,2.36-6.58,6.26-6.58,3.3,0,5.38,1.71,5.78,4.52h-3.56c-.19-.81-.95-1.48-2.08-1.48-1.76,0-2.66,1.48-2.66,3.55s1.02,3.6,2.8,3.6c1.34,0,1.99-.72,2.22-1.57h-1.68v-2.61h5.2v6.84h-2.45l-.28-1.34Z"
            shape-rendering="geometricPrecision"
        />
    </svg>
</template>
