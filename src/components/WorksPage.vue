<script>
import Footer from './Footer.vue'
export default{
    props: ['projecturl'],
}
</script>
<template>
<main class="container">
    <div>vimeo video</div>
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