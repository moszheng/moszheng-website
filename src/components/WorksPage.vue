<script setup>
import Footer from './Footer.vue'
import WorksData from '../data/WorksData.json'
import { ref } from 'vue'

const props = defineProps({
    projecturl: String
})

const prjdata = WorksData.project.find(item => item.name == props.projecturl);

</script>
<template>
<div>
    <main class="container">
        <!-- video -->
        <div class="ratio ratio-16x9 mb-5">
            <iframe :src=prjdata.video allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="WorkDsc row px-md-5">
            <div class="col-md-5">
                <h3 class="mb-3">{{ projecturl}}</h3>
                <h6 class="mb-3">@{{prjdata.company}}</h6>
                <p class="mb-4">{{prjdata.date}}</p>
                <a class="" :href=prjdata.behance target="_blank" rel="noopener">
                    <svg id="icon_twitter">
                        <use xlink:href="#icon-behance"></use>
                    </svg>
                </a>
                <a class="" :href=prjdata.behance target="_blank" rel="noopener">
                    <svg id="icon_twitter">
                        <use xlink:href="#icon-behance"></use>
                    </svg>
                </a>
            </div>
            <div class="col-md-7">
                <div class="mb-5">
                    <p>The Golden Melody Award (GMA) is Taiwan's most prominent music ceremony, and it holds a special place in my heart as it has been my usual project for five times since 2018 when I was a student and took an Internship at JL Design.</p>
                    <p>During the three-month period leading up to the ceremony, we worked diligently to create the main visual, which included several elements aimed at producing a captivating TV package. It was a challenging yet rewarding experience, and each year, the project allowed me to grow both personally and professionally.</p>
                </div>
                <div>
                    <h5>Credit</h5>
                    <span>text</span>
                </div>
            </div>
        </div>
    </main>
    <Footer />
</div>
</template>
<style>
.WorkDsc{
    min-height: 600px;
}
</style>