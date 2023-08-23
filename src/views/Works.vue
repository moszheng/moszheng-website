<script setup>
import Footer from '../components/Footer.vue'
import { ref } from 'vue'
import WorksData from '../data/WorksData.json'

// Return Real route
const img_location = (item) => { return '../src/img/'+ item }

</script>
<template>
<div data-scroll-container>
    <main class="flex-xl-nowrap" data-scroll-section>
		<!----- Main Content----->
		<div class="row py-md-3 pl-md-5 px-xl-3 bd-content">
			<div  v-for="item in WorksData.project" class="col-md-4">
				<div class="card mb-md-3 mb-1 text-white">
					<router-link :to="{ name : 'WorksPage' , params : { projecturl: item.url_name } }" :title="item.name">
						<img :src=img_location(item.img) class="card-img" :alt="item.name">
						<div class="works-text text-white px-3">
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