<script setup>
const imgLocation = (item) => {
    return "../src/img/" + item;
};
const { prjdata } = defineProps({ prjdata: Object });
</script>
<template>
    <div class="mb-5 flex flex-wrap md:mb-0">
        <!-- first-img -->
        <div class="mb-5 max-w-full xl:mb-6 xl:w-1/2">
            <div class="head-img-container d-flex-center w-full overflow-hidden">
                <figure class="parallax">
                    <img
                        :src="imgLocation(prjdata.img_md[0])"
                        class="head-img-container-img h-[1080px] w-[1920px] object-cover"
                        alt="firstImg"
                        ref="lazyPics"
                    />
                </figure>
            </div>
        </div>
        <!-- Right Content -->
        <div class="mb-5 flex justify-center xl:mb-0 xl:w-1/2">
            <div class="content-container max-w-2xl space-y-5 xl:pl-15">
                <p v-for="item in prjdata.msg" :key="item" class="text-lg" id="content-context">
                    {{ item }}
                </p>
            </div>
        </div>
    </div>
</template>
