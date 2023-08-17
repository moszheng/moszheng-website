<script setup>
import Footer from '../components/Footer.vue'
import { ref } from 'vue'
import WorksData from '../data/WorksData.json'

</script>
<template>
<div>
    <main class="row flex-xl-nowrap">
		<!-- Columns filter Bar -->
		<aside class="col col-xl-1 bd-sidebar bg-white">
			<ul class="list-unstyled ps-0">
				<li class="my-2">
				<div class="mt-4 mb-3">
					<button class="btn btn-toggle align-items-center rounded collapsed advance-filter-button" 
					data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
					<svg id="icon_filter">
						<use xlink:href="#icon-filter-category"></use>
					</svg>
					<span class="t-bold">Works </span>
					</button>
				</div>
				<!-- Filters -->
				<div class="collapse" id="orders-collapse">
					<ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small ps-3">
						<li v-for="item in WorksData.project" class="mb-2">
							<a :href=item.url title="Link to project" target="_blank" rel="noopener" >
								{{item.name}}
							</a>
						</li>
					</ul>
				</div>
				</li>
				<li class="border-top"></li>
			</ul>
		</aside>
		<!----- Main Content----->
		<div class="col-xl-11 py-md-3 pl-md-5 px-xl-3 bd-content">
			<div class="row">
				<div  v-for="item in WorksData.project" class="col-md-4">
					<div class="card mb-4 text-white">
						<router-link :to="{ name : 'WorksPage' , params : { projecturl: item.name } }" title="Link to project">
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
  	</main>
	<Footer />
</div>
</template>

<style>
.card{
  display: block;
  transition: 0.4s ease; /* scale */
}
.works-text{
  position: absolute;
  bottom: 0; 
  /* left: 0; */
  width: 100%;
  overflow: hidden;
  background: linear-gradient( transparent, rgba(0, 0, 0, 0.7));
  height: 25%; /*transforms*/
  opacity: 0;
  transition: .4s ease; /* 添加过渡效果 */
}
.card:hover{
  transform: scale(1.01); 
}  
.card:hover .works-text {
  height: 30%;
  opacity: 1;
}

</style>