<script setup>
import { splitPara, splitText } from "@/utils/SplitText.js";

import IconBehance from "@/assets/icon/IconBehance.vue";
import IconVimeo from "@/assets/icon/IconVimeo.vue";

const vimeoPage = (item) => {
    return `https://vimeo.com/${item[1]}`;
};

const { prjdata } = defineProps({ prjdata: Object });
</script>
<template>
    <section
        class="workitem-info mx-2 flex flex-col flex-wrap justify-between px-3 md:mx-4 lg:flex-row xl:min-h-[20vh] xl:px-12"
    >
        <!-- Left-info -->
        <div class="mb-8 md:mb-12 xl:mb-0">
            <h3 class="hero-1 mb-8 text-stone-950">
                <span
                    v-for="(text, index) in splitText(prjdata.en_name)"
                    :key="index"
                    class="inline-flex pe-2"
                >
                    <span class="inline-block font-bold" id="prj-name"> {{ text }} </span>
                </span>
            </h3>
            <div class="flex flex-row justify-between md:flex-col">
                <div>
                    <h5 class="hero-2 mb-3 text-stone-950">@{{ prjdata.company }}</h5>
                    <h6 class="hero-2 mb-6 text-stone-950">{{ prjdata.date }}</h6>
                </div>
                <div class="flex items-center">
                    <a
                        class="hero-social me-6"
                        :href="prjdata.behance"
                        target="_blank"
                        rel="noopener"
                    >
                        <IconBehance class="size-12 lg:size-10" id="icon_social" />
                    </a>
                    <a
                        class="hero-social"
                        :href="vimeoPage(prjdata.video)"
                        target="_blank"
                        rel="noopener"
                    >
                        <IconVimeo class="size-6 lg:size-8" id="icon_social" />
                    </a>
                </div>
            </div>
        </div>
        <div class="xl:ml-auto">
            <h3 class="hero-3 mb-4 text-stone-950">Roles</h3>
            <h5 class="hero-4 mb-2" v-for="item in prjdata.roles" :key="item">{{ item }}</h5>
        </div>
    </section>
</template>
