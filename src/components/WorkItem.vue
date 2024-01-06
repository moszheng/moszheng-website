<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue'
import {onBeforeRouteUpdate} from 'vue-router'
import gsap from 'gsap'

import FooterItem from './FooterItem.vue'
import WorksData from '@/data/WorksData.json'

const props = defineProps({
    projecturl: String,
})

// data initial
const prjdata = ref('null');
const shuffleprj = ref('null');
prjdata.value = WorksData.project.find(item => item.url_name == props.projecturl);
shuffleprj.value = WorksData.project.filter(item => item.url_name !== prjdata.value.url_name).sort(() => Math.random() - 0.5).slice(0, 3); // 2. shuffle array, pick top 3 item

// Transfer Data
// Other Project Random method
const vimeoPage = (item) => {return `https://vimeo.com/${ item }`}
const vimeoEmbed = (item) => {
    if (item[0]=="vimeo") {
        return `https://player.vimeo.com/video/${ item[1] }?h=6ea64f06ea&color=ffffff&title=0&byline=0&portrait=0`
    }
    else if (item[0]=="youtube") {
        return `https://www.youtube.com/embed/${ item[1] }?si=S_7EpUA151r9khLz`
    }
}
const imgLocation = (item) => {return '../src/img/'+ item}

/* ---------Router Fix-----------*/

const getWorksData = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                WorksData.project.find(item => item.url_name == id),
            )
        }, 0)
    })
}

onBeforeRouteUpdate(async (to, from) => {
    // console.log("beforeRouteUpdate")
    if (to.params.projecturl !== from.params.projecturl) {
        prjdata.value = await getWorksData(to.params.projecturl);
        shuffleprj.value = WorksData.project.filter(item => item.url_name !== prjdata.value.url_name).sort(() => Math.random() - 0.5).slice(0,3);
    }
})

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});


/* Scroll picture*/
const scrollPosition = ref(0);

const handleScroll = () => {
    scrollPosition.value = window.scrollY;
    gsap.to('.imgContainer-img', {
        y: scrollPosition.value * .15,
        duration: .1,
        ease: 'power1',
    });
};

/* --------Animation--------- */
const beforeEnter = (el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(50px)';
}
const sigleEnter = (el, done) => {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        onComplete: done,
    })
}
</script>

<template>
<div class="WorksItem">
    <!-- video -->
    <div class="ratio ratio-16x9 mb-5" data-scroll-section>
        <iframe :src=vimeoEmbed(prjdata.video) allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
    </div>
    <main class="container">
        <!-- Workitem-info -->
        <div class="workitem-info row mb-5 mx-md-3 mx-2 px-xl-5 px-3">
            <!-- Left -->
            <div class="col-9">
                <Transition name="move" mode="out-in" appear
                    @before-enter="beforeEnter"
                    @enter="sigleEnter">

                    <h3 class="mb-4">{{ prjdata.en_name}}</h3>

                </Transition>
                <h6 class="mb-3">@{{prjdata.company}}</h6>
                <p class="mb-4">{{prjdata.date}}</p>
                <div>
                    <a class="me-3" :href=prjdata.behance target="_blank" rel="noopener">
                        <svg id="icon_social">
                            <use xlink:href="#icon-behance"></use>
                        </svg>
                    </a>
                    <!-- vimeo Link -->
                    <a class="" :href=vimeoPage(prjdata.video) target="_blank" rel="noopener">
                        <svg id="icon_social">
                            <use xlink:href="#icon-vimeo"></use>
                        </svg>
                    </a>
                </div>
            </div>
            <!-- Right -->
            <div class="col-3 justify-content-end">
                <h3 class="mb-4">Roles</h3>
                <p class="mb-2" v-for="item in prjdata.roles" :key="item">
                    {{item}}
                </p>
            </div>
            <hr class="mt-5">
        </div>
        <!-- Workitem-Content -->
        <section class="workitem-content row mx-md-3 mx-1 mb-xl-0 mb-5 px-xl-5 px-3">
            <!-- img -->
            <div class="col-xxl-5 mb-md-4 mb-5">
                <div class="imgContainer d-flex-center">
                    <img :src="imgLocation(prjdata.img_md)" class="imgContainer-img d-flex-center img-fluid " alt="firstImg">
                </div>
            </div>
            <!-- Right Content -->
            <div class="col-xxl-5">
                <div class="">
                    <p v-for="item in prjdata.msg" :key="item">
                        {{item}}
                    </p>
                </div>
            </div>
        </section>
        <!-- credit -->
        <div class="workitem-credit row mx-md-3 mx-1 px-xl-5 px-3 mb-5">
            <div class="col-xl-5">
            </div>
            <!-- Right Content -->
            <div class="col-xl-7">
                <h4 class="mb-5">Credit</h4>
                <div v-for = "value, key in prjdata.credit" class="row" :key="value">
                    <p class="col-lg-4 col">{{key}}</p>
                    <p class="col-lg-8 col">{{value}}</p>
                </div>
            </div>
        </div>
    </main>
    <!-- Other Prj -->
    <section class="container-fluid workitem-otherprj px-md-5 px-1 " data-scroll-section>
        <div class="container ">
            <h2 class="text-white my-4">Other Project</h2>
            <div class="py-md-3 pl-md-5 px-xl-3 bd-content">
                <div class="row">
                    <div v-for="item in shuffleprj" class="col-xl-4" :key="item.url_name">
                        <div class="card mb-4 text-white">
                            <!-- routerlink -->
                            <router-link :to="{ name : 'WorksItem' , params : { projecturl: item.url_name } }" :title="item.name">
                                <img :src=imgLocation(item.img_md) class="card-img" alt="...">
                                <div class="works-black"></div>
                                <div class="works-text text-white px-4">
                                    <h5 class="card-title">{{ item.name }}</h5>
                                    <h6 class="card-title">@{{ item.company }}</h6>
                                    <p class="card-text">{{ item.date }}</p>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <FooterItem />
</div>
</template>
<style scoped>
/* -----Section------ */
main{
    padding-right: 0 !important;
    padding-left: 0 !important;
}

@media only screen and (min-width: 1200px) {
    .workitem-info{
        min-height: 20vh;
    }
}

.workitem-content, .workitem-credit{
    min-height: 60vh;
}
.workitem-otherprj{
    min-height: 40vh;
    display: flex;
    align-items: center;
    background-color: #0e0e0e;
}

/* Card */
.card{
    margin-bottom: 35px;
    height: 25vh;
}
/* Mobile */
@media only screen and (max-width: 1500px) {
    /* img */
    .imgContainer{
        width: 80vw;
        height: 30vh;
    }
}
/* First Img */
.imgContainer{
    /* position: relative; */
    width: 95%;
    height: 50vh;
    overflow: hidden;
}
.imgContainer-img{
    /* position: absolute; */
    width: 1920px;
    height: 1080px;
    /* top: -50%; */
    /* left: -50%; */
    max-width: none;
    max-height: none;
    object-fit: cover;
}
</style>
