<script setup>
import {ref, onMounted} from 'vue'
import Masonry from 'masonry-layout'

import FooterItem from '@/components/FooterItem.vue'
import WorksData from '@/data/WorksData.json'

// Return Real route
const imgLocation = (item) => {return '../src/img/'+ item};

const preloadimgs = ref(document.querySelectorAll('.lazy'));

onMounted(() => {
	// initialize masonry
	const row = document.querySelector("[data-masonry]");
	new Masonry(row, {
		percentPosition: true,
	});

	// Preloading status
	preloadimgs.value = document.querySelectorAll('.lazy')
	function loaded(img) {
		img.target.classList.add("loaded")
	}

	preloadimgs.value.forEach(function(img) {
		if(img.complete) {
			loaded(img)
		} else {
			img.addEventListener("load", loaded)
		}
	});

});

function randomHeight(index) {
	if (window.screen.width > 960) {
		const rndarray = [50, 35, 45, 45, 30];
		// const rndmax = 50;
		// const rndmin = 25;
		// const rnd = Math.floor( Math.random()*( rndmax - rndmin + 1 )) + rndmin;

		// return `height: ${ rnd }vh`;
		return `height: ${ rndarray[index%5] }vh`;
	} else {
		return `height: 30vh`;
	}
};

function scrolltop() {
	window.scrollTo(0, 0);
}

</script>
<template>
<div class="WorksPage">
	<main class="container flex-xl-nowrap">
		<div class="row pt-5" data-masonry='{"percentPosition": true }'>
			<div v-for="(item, index) in WorksData.project" :key="index" class="col-lg-4 col">
				<div class="card text-white" :style="randomHeight(index)">
					<router-link :to="{ name : 'WorksItem' , params : { projecturl: item.url_name } }" :title="item.name">
						<!-- replaceimg -->
						<img :src=imgLocation(item.img_md[0]) class="card-img lazy" :alt="item.name">
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
            <a @click = "scrolltop" class="nav-link p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chevron-compact-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"/>
                </svg>
                <p>BACK TO TOP</p>
            </a>
        </div>
	</main>
<FooterItem />
</div>
</template>

<style scoped>
.card{
	background-color: rgb(235, 235, 235);
	margin-bottom: 35px;
}

.lazy.loaded{
	opacity: 1;
	transition: all 0.5s;
}
.lazy{
	opacity: 0;
}

</style>

