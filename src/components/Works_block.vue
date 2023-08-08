<script setup>
import { ref } from 'vue'

const props = defineProps({
  name: String,
  company: String,
  url: String,
  img: String,
  date: String,
})

</script>
<template>
<div class="col-md-4">
    <div class="card mb-4 text-white">
        <a :href=url class="" title="Link to project" target="_blank" rel="noopener" >
            <img :src=img class="card-img" alt="...">
            <div class="works-text text-white px-3">
                <h5 class="card-title">{{ name }}</h5>
                <h6 class="card-title">@{{ company }}</h6>
                <p class="card-text">{{ date }}</p>
            </div>
        </a>
    </div>
</div>
</template>
