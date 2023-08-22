<script setup>
import gsap from 'gsap'

import Footer from './Footer.vue'
import WorksData from '../data/WorksData.json'
import { ref } from 'vue'

const props = defineProps({
    projecturl: String
})

const prjdata = WorksData.project.find(item => item.url_name == props.projecturl);

/* vimeo id to vimeo_page and vimeo_embed */

// const vimeo_page = WorksData.project.map(item => item.video + "123")
const vimeo_page = "https://vimeo.com/" + prjdata.video ;
const vimeo_embed = "https://player.vimeo.com/video/" + prjdata.video + "?h=6ea64f06ea&color=ffffff&title=0&byline=0&portrait=0";

/* ----------------- */
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
        <iframe :src=vimeo_embed allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
    </div>
    <main class="container">
        <div class="TitleDsc mb-5 mx-md-3 mx-1 px-md-5">
            <Transition name="move" mode="out-in" appear
                @before-enter="beforeEnter"
                @enter="sigleEnter">

                <h3 class="mb-3">{{ prjdata.en_name}}</h3>

            </Transition>
            <h6 class="mb-3">@{{prjdata.company}}</h6>
            <p class="mb-4">{{prjdata.date}}</p>
            <a class="" :href=prjdata.behance target="_blank" rel="noopener">
                <svg id="icon_twitter">
                    <use xlink:href="#icon-behance"></use>
                </svg>
            </a>
            <!-- vimeo Link -->
            <a class="" :href=vimeo_page target="_blank" rel="noopener">
                <svg id="icon_twitter">
                    <use xlink:href="#icon-vimeo"></use>
                </svg>
            </a>
        </div>
        <section class="WorkDsc row mx-md-3 mx-1 px-md-5">
            <div class="col-md-5">
                <div class="imgContainer">
                    <!-- prjdata.img -->
                    <img src="../img/02_gha56_01.png" class="img-fluid " alt="...">
                </div>
            </div>
            <!-- Right Content -->
            <div class="col-md-5">
                <div class="">
                    <p>The Golden Melody Award (GMA) is Taiwan's most prominent music ceremony, and it holds a special place in my heart as it has been my usual project for five times since 2018 when I was a student and took an Internship at JL Design.</p>
                    <p>During the three-month period leading up to the ceremony, we worked diligently to create the main visual, which included several elements aimed at producing a captivating TV package. It was a challenging yet rewarding experience, and each year, the project allowed me to grow both personally and professionally.</p>
                </div>
            </div>
        </section>
        <!-- Credit -->
        <div class="Credit row px-md-5 mb-5">
            <div class="col">
                
            </div>
            <!-- Right Content -->
            <div class="col-md-7 col">
                <h4 class="mb-5">Credit</h4>
                <div v-for = "value, key in prjdata.credit" class="row">
                    <p class="col-lg-4">{{key}}</p>
                    <p class="col-lg-8">{{value}}</p>
                </div>
            </div>
        </div>
        
    </main>
    
    <!-- Other Prj -->
    <section class="container-fluid OtherPrj px-md-5 px-1 " data-scroll-section>

        <h2 class="text-white my-4">Other Project</h2>
        <div class="py-md-3 pl-md-5 px-xl-3 bd-content">
            <div class="row">
                <div  v-for="item in WorksData.project.slice(0,3)" class="col-md-4">
                    <div class="card mb-4 text-white">
                        <router-link :to="{ name : 'WorksPage' , params : { projecturl: item.url_name } }" title="Link to project">
                            <img :src=item.img class="card-img" alt="...">
                            <div class="works-text text-white px-3">
                                <h5 class="card-title">{{ item.name }}</h5>
                                <h6 class="card-title">@{{ item.company }}</h6>
                                <p class="card-text">{{ item.date }}</p>
                            </div>
                        </router-link>
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

.TitleDsc{
    min-height: 25vh;
}

.WorkDsc, .Credit{
    min-height: 60vh;
}

.OtherPrj{
    min-height: 40vh;
    background-color: rgb(22, 22, 22);
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