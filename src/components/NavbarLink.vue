<script setup>
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
    to: String,
});

/* Active Route */
const route = useRoute();
const currentRouteName = ref("");

watch(route, (to, from) => {
    currentRouteName.value = to.path;
});
const isActive = computed(() => {
    return route.name === props.to;
});
</script>
<template>
<li class="nav-item">
    <div class="flex items-center">
        <!-- :style="colormode" -->
        <router-link :to="{ name: to }" class="nav-link relative p-1 text-xl font-bold md:me-12" :class="{ navactive: isActive }">
            {{ props.to }}
        </router-link>
    </div>
</li>
</template>

<style>
.nav-link {
    transition: 0.15s ease;
}
.nav-link:hover {
    color: var(--main-color) !important;
}
.nav-link.navactive::after {
    transform: scaleX(1);
    transform-origin: left;
}
.nav-link::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -0.3em;
    width: 100%;
    height: 10px;
    border-top: 0.175em solid;
    transform-origin: right;
    transform: scaleX(0);
    transition:
        transform 0.4s cubic-bezier(0.83, 0, 0.14, 1.02),
        color 0.1s ease;
}
</style>
