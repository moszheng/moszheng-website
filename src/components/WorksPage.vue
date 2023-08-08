<script>
import Footer from './Footer.vue'
export default{
    props: ['projecturl'],
}
</script>
<template>
<main class="container">
    <div class="ratio ratio-16x9 mb-5">
        <iframe src="https://player.vimeo.com/video/276425004?h=6ea64f06ea&color=ffffff&title=0&byline=0&portrait=0"
            allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
        
    </div>
    <div class="row px-md-5">
        <div class="col-md-5">
            <!-- {{ $router.params.projecturl }} -->
            <h3>{{ projecturl }}</h3>
            <h6>@company</h6>
            <p>date</p>
            <p>www.behanceurl.com</p>
        </div>
        <div class="col-md-7">
            <p>
            The Golden Melody Award (GMA) is Taiwan's most prominent music ceremony, and it holds a special place in my heart as it has been my usual project for five times since 2018 when I was a student and took an Internship at JL Design.
            </p>
            <p>
            During the three-month period leading up to the ceremony, we worked diligently to create the main visual, which included several elements aimed at producing a captivating TV package. It was a challenging yet rewarding experience, and each year, the project allowed me to grow both personally and professionally.
            </p>
        </div>
    </div>
</main>
<Footer />
</template>