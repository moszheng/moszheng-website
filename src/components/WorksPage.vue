<script>
import Footer from './Footer.vue'
export default{
    props: ['projecturl'],
}
</script>
<template>
<main class="container">
    <div class="embed-responsive embed-responsive-16by9">
        <iframe class="embed-responsive-item" 
            src="https://player.vimeo.com/video/276425004?h=6ea64f06ea&color=ffffff&title=0&byline=0&portrait=0"
            frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
        
    </div>
    <div class="row">
        <div class="col">
            <!-- {{ $router.params.projecturl }} -->
            <h2>{{ projecturl }}</h2>
            <p>company</p>
            <p>date</p>
            <p>www.behanceurl.com</p>
        </div>
        <div class="col">
            msg
        </div>
    </div>
</main>
<Footer />
</template>