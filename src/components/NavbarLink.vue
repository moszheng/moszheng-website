<script setup>
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
    to: String,
});

/* Active Route */
const route = useRoute();
const currentRouteName = ref('');

watch(route, (to, from) => {
    currentRouteName.value = to.path;
});
const isActive = computed(() => {
    return route.name === props.to;
});

</script>
<template>
<li class="nav-item my-2">
    <div class="flex items-center">
        <!-- :style="colormode" -->
        <router-link :to="{ name : to }"
            class="nav-link relative p-1 md:me-12 text-lg"
            :class="{ navactive: isActive}"
        >
            {{ props.to }}
        </router-link>
    </div>
</li>
</template>

<style>
.nav-link{
    transition: .4s cubic-bezier(.83,0,.14,1.02);
}
.nav-link:hover {
    color: rgb(148, 148, 148) !important;
}
.nav-link.navactive::after{
    width: 100%;
}
.nav-link::after{
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.3em;
    width: 0%;
    height: 10px;
    border-top: 0.2em solid;
    transition: .4s cubic-bezier(.83,0,.14,1.02);
}
</style>
