<script setup>
import { ref, onMounted } from 'vue'
import Masonry from "masonry-layout"

import Footer from '../components/Footer.vue'
import WorksData from '../data/WorksData.json'

// Return Real route
const img_location = (item) => { return '../src/img/'+ item }

onMounted(() => {
    // initialize masonry
    var row = document.querySelector("[data-masonry]");
    new Masonry(row, {
      	// options
		percentPosition: true,
	  	// gutter: 20
    });
});

function randomHeight(){
	let max = 50;
	let min = 25;
	let rnd = Math.floor( Math.random()*( max - min + 1 )) + min 

	return "height:"+ rnd + "vh";
	// return `height: ${ rnd } vh`
}
</script>
<template>
<div data-scroll-container>
    <main class="container flex-xl-nowrap" data-scroll-section>
		<!----- Main Content----->
		<!-- py-md-3 pl-md-5 px-xl-3 -->
		<!-- -->
		<!-- data-masonry='{"percentPosition": true }' -->
		<div class="row pt-5" data-masonry='{"percentPosition": true }'>
			<div v-for="item in WorksData.project" class="col-md-4 col">
				<div class="card text-white" :style="randomHeight()">
					<router-link :to="{ name : 'WorksPage' , params : { projecturl: item.url_name } }" :title="item.name">
						<img :src=img_location(item.img) class="card-img" :alt="item.name" >
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
		<div class="container-fluid text-center">
            <a href="#" class="nav-link p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chevron-compact-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"/>
                </svg>
                <p>BACK TO TOP</p>
            </a>
        </div>
  	</main>
	<Footer />
</div>
</template>

<style scoped>
.card{
	margin-bottom: 35px;
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
</style>