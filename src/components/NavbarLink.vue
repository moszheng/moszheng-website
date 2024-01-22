<script setup>
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useNavStore } from '@/stores/navstore';
import gsap from 'gsap';

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

/* ---------- Color mode --------*/
const store = useNavStore();

// update Darkmode
const colormode = computed(() => {
    return store.navbardarkmode ? 'fill:#FFF; color:#FFF;' : 'fill:#000; color:#000;';
});

</script>
<template>
<li class="nav-item my-2">
    <div class="flex items-center">
        <router-link :to="{ name : to }"
            class="nav-link relative py-2 px-4 md:me-12 text-lg"
            :class="{ navactive: isActive }"
            :style="colormode"
        >
            {{ props.to }}
        </router-link>
    </div>
</li>
</template>

<style>
.nav-link{
    transition: .15s ease-in-out;
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
    bottom: -0.35em;
    width: 0%;
    height: 10px;
    border-top: 0.2em solid #000;
    transition: all .5s cubic-bezier(.83,0,.14,1.02);
}
</style>
