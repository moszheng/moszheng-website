<script setup>
import { ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import gsap from 'gsap'

import Footer from './Footer.vue'
import WorksData from '../data/WorksData.json'

const props = defineProps({

    projecturl: String,

})

// data initial
const prjdata = ref('null');
const shuffleprj = ref('null');
prjdata.value = WorksData.project.find(item => item.url_name == props.projecturl);
shuffleprj.value = WorksData.project.filter(item => item.url_name !== prjdata.value.url_name).sort(() => Math.random() - 0.5).slice(0,3); // 2. shuffle array, pick top 3 item

// Transfer Data
// Other Project Random method
const vimeo_page =  (item) => { return "https://vimeo.com/" + item ;}
const vimeo_embed = (item) => { return "https://player.vimeo.com/video/" + item + "?h=6ea64f06ea&color=ffffff&title=0&byline=0&portrait=0";}
const img_location = (item) => { return '../src/img/'+ item }

/* ---------Router Fix-----------*/

const getWorksData = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                WorksData.project.find(item => item.url_name == id)
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

/* --------Animation--------- */

const beforeEnter = (el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(50px)'

}
const sigleEnter = (el, done) => {
    gsap.to(el, {
        opacity: 1 ,
        y: 0,
        duration: 1,
        onComplete: done
    })
}
</script>

<template>
<div class="WorksPage">
    <!-- video -->
    <div class="ratio ratio-16x9 mb-5" data-scroll-section>
        <iframe :src=vimeo_embed(prjdata.video) allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
    </div>
    <main class="container">
        <div class="title-section mb-5 mx-md-3 mx-2 px-md-5">
            <Transition name="move" mode="out-in" appear
                @before-enter="beforeEnter"
                @enter="sigleEnter">

                <h3 class="mb-3">{{ prjdata.en_name}}</h3>

            </Transition>
            <h6 class="mb-3">@{{prjdata.company}}</h6>
            <p class="mb-4">{{prjdata.date}}</p>
            <div>
                <a class="me-3" :href=prjdata.behance target="_blank" rel="noopener">
                    <svg id="icon_twitter">
                        <use xlink:href="#icon-behance"></use>
                    </svg>
                </a>
                <!-- vimeo Link -->
                <a class="" :href=vimeo_page(prjdata.video) target="_blank" rel="noopener">
                    <svg id="icon_twitter">
                        <use xlink:href="#icon-vimeo"></use>
                    </svg>
                </a>
            </div>
        </div>
        <section class="work-section row mx-md-3 mx-1 mb-md-0 mb-5 px-md-5">
            <div class="col-md-5 mb-md-0 mb-5">
                <div class="imgContainer">
                    <!-- -->
                    <img :src="img_location(prjdata.img)" class="img-fluid " alt="...">
                    <!-- <img src="../img/02_gha56_01.png" class="img-fluid " alt="..."> -->
                </div>
            </div>
            <!-- Right Content -->
            <div class="col-md-5">
                <div class="">
                    <!-- <p>The Golden Melody Award (GMA) is Taiwan's most prominent music ceremony, and it holds a special place in my heart as it has been my usual project for five times since 2018 when I was a student and took an Internship at JL Design.</p>
                    <p>During the three-month period leading up to the ceremony, we worked diligently to create the main visual, which included several elements aimed at producing a captivating TV package. It was a challenging yet rewarding experience, and each year, the project allowed me to grow both personally and professionally.</p> -->
                    <p v-for="item in prjdata.msg">
                        {{item}}
                    </p>
                </div>
            </div>
        </section>
        <!-- credit -->
        <div class="credit row mx-md-3 mx-1 px-md-5 mb-5">
            <div class="col-md-5">
                
            </div>
            <!-- Right Content -->
            <div class="col-md-7">
                <h4 class="mb-5">Credit</h4>
                <div v-for = "value, key in prjdata.credit" class="row">
                    <p class="col-lg-4 col">{{key}}</p>
                    <p class="col-lg-8 col">{{value}}</p>
                </div>
            </div>
        </div>
        
    </main>
    
    <!-- Other Prj -->
    <section class="container-fluid OtherPrj px-md-5 px-1 " data-scroll-section>
        <div class="container ">
            <h2 class="text-white my-4">Other Project</h2>
            <div class="py-md-3 pl-md-5 px-xl-3 bd-content">
                <div class="row">
                    <div  v-for="item in shuffleprj" class="col-md-4">
                        <div class="card mb-4 text-white">
                            <!-- routerlink -->
                            <router-link :to="{ name : 'WorksPage' , params : { projecturl: item.url_name } }" :title="item.name">
                                <img :src=img_location(item.img) class="card-img" alt="...">
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
    
    <Footer />
</div>
</template>
<style>

/* -----Section------ */

main{
    padding-right: 0 !important;
    padding-left: 0 !important;
    
}
.title-section{
    min-height: 25vh;
}
.work-section, .credit{
    min-height: 60vh;
}
.OtherPrj{
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
.card-img{
  	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	/* vertical-align: middle; */
  	transition: .8s ease;
}

/* img */

.imgContainer{
    overflow : hidden;
    width: 40vh;
    /* height: 600px; */
    position: relative;
    height: 50vh;
}
.imgContainer img{
    position: absolute;
    top: 50%;
    left: 50%;
    object-fit: cover;
    transform: translate(-50%, -50%);
    max-width: none; /* 取消最大宽度限制 */
    max-height: none; /* 取消最大高度限制 */
    /* object-fit: cover; */
    /* height: 50vh; */
    
    /* scale : 200%; */
    transition: .5s;
}
.imgContainer:hover img{
    scale: 120%;
}
</style>