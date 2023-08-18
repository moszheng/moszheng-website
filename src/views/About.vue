<script setup>
import Footer from '../components/Footer.vue'
import { ref } from 'vue'
import WorksData from '../data/WorksData.json'
import LogoData from '../data/LogoData.json'

const profile_image = '../src/img/profile.png';

</script>
<template>
<div class="about">
    <main class="container">
        <!-- Intro -->
        <section class="AboutIntro d-flex align-items-center row mx-md-3 mx-1 px-md-2 px-1 py-5" data-scroll-section>
            <!-- profile image -->
            <div class="col-xl-5" data-scroll data-scroll-speed="-1">
                <div class="align-self-center text-center">
                    <div class="mb-4 ">
                        <img class="avatar avatar-user width-full border" alt="" :src=profile_image>
                    </div>
                </div>
            </div>
            <div class="col-xl-7 mt-xl-0 mt-4 px-md-5 ">
                <div class="mb-4">
                    <h1 class="mb-5" data-scroll>Sheng Wen Cheng</h1>
                    <h3 class="mb-5">A <strong>3D Generalist</strong> and <strong>Motion Designer</strong> based in Taiwan.</h3>

                    <p>I established Slothfellas, a platform that provides C4D plugins and After Effects scripts,  designed to enhance workflows and simplify processes.</p>

                    <p>For any inquiries,<strong> please send me an email </strong></p>
                </div>
                <div class=" ">
                    <div class="mb-3">
                        <svg id="icon_twitter">
                            <use xlink:href="#icon-behance"></use>
                        </svg>
                        <span class="ms-3">behance.net/moszheng</span>
                        
                    </div>
                    <div class="mb-3">                        
                        <svg id="icon_twitter">
                            <use xlink:href="#bi-envelope-fill"></use>
                        </svg>
                        <span class="ms-3">moszheng.design@gmail.com</span>
                    </div>
                    <div class="mb-3">
                        <svg id="icon_twitter">
                            <use xlink:href="#bi-geo-alt-fill"></use>
                        </svg>
                        <span class="ms-3">Taipei, Taiwan</span>
                    </div>
                </div>
            </div>
            <div class="border-top"></div>
        </section>
        <!-- Experience -->
        <!-- d-flex align-items-center -->
        <section class="AboutExp px-lg-5 px-1 my-5" data-scroll-section>
            <div class="mt-xl-0 mt-4">
                <div class="row mb-4">
                    <!-- title -->
                    <div class="col-lg-3">
                        <h3 class="mb-4">Experience</h3>
                    </div>
                    <div class="col-lg-9 px-xl-3">
                        <!-- Freelance -->
                        <div class="row">
                            <div class="col-2 my-4">
                                <div class="col text-center">
                                    <p>2023 - Now</p>
                                </div>
                            </div>
                            <div class="col-1"></div>
                            <div class="col my-4">
                                <div class="row mb-3">
                                    <h4 class="col">Freelance</h4>
                                    
                                    <div>3D Generalist</div>
                                </div>
                                <ul>
                                    <li>
                                        <p>Primarily work remotely as a freelance artist, 
                                        specializing in a diverse range of disciplines such as 3D artwork, visual effects (VFX), and motion graphics.</p>
                                    </li>
                                    <li>
                                        <p>Developing various programs and websites, 
                                        and founded a brand called <strong>"SlothFellas"</strong> released a set of tools designed to assist creators in working more efficiently.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- Mixcode -->
                        <div class="row">
                            <div class="col-2 my-4">
                                <div class="col text-center">
                                    <p>2021 - 2022</p>
                                </div>
                            </div>
                            <div class="col-1"></div>
                            <div class="col my-4">
                                <div class="row mb-3">
                                    <h4 class="col">Mixcode</h4>
                                    
                                    <div>Motion Designer</div>
                                </div>
                                <ul>
                                    <li>
                                        <p>Specialize in procedural NFT character development, 
                                        utilizing Python and JavaScript to create custom Cinema 4D and AfterEffects plug-ins.
                                        </p>
                                    </li>
                                    <li>
                                        <p>Executing and developing motion graphics, 3D animations.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <!-- JL -->
                        <div class="row">
                            <div class="col-2 my-4">
                                <div class="col text-center">
                                    <p>2018 - 2021</p>
                                </div>
                            </div>
                            <div class="col-1"></div>
                            <div class="col my-4">
                                <div class="row mb-3">
                                    <h4 class="col">JL DESIGN .</h4>
                                    
                                    <div>Intern, Motion Designer</div>
                                </div>
                                <ul>
                                    <li>
                                        <p>Exploring and implementing new techniques, including PBR texturing, lighting, and rendering, 
                                        to enhance the visual quality of projects.</p>
                                    </li>
                                    <li>
                                        <p>Creating highly detailed models with smooth topology, ensuring realistic animations.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <div class="border-top"></div>
        </section>
        
        <!-- Skill -->
        <section class="AboutSkill px-lg-5 px-1 my-5" data-scroll-section>
            <div class="row">
                <div class="col-md-3">
                    <h2 class="mb-4 ">Service & Skill</h2>
                </div>
                <div class="col px-md-5 ">
                    <div class="row mb-5">
                        <div class="col-md-6 mb-md-0 mb-5">
                            <h3 class="mb-5">Motion Design</h3>
                            <h5 class="mb-3">Modeling</h5>
                            <h5 class="mb-3">Texturing</h5>
                            <h5 class="mb-3">Lighting</h5>
                            <h5 class="mb-3">Rendering</h5>
                            <h5 class="mb-3">Compositing</h5>
                            <h5 class="mb-3">VFX Simulating</h5>
                        </div>
                        <div class="col-md-6">
                            <h3 class="mb-5">Development</h3>
                            <h5 class="mb-3">C4D Python Plug-in</h5>
                            <h5 class="mb-3">After Effects Scripts</h5>
                            <h5 class="mb-3">Project Workflow R&D</h5>
                            <h5 class="mb-3">Frontend Developing</h5>
                        </div>
                    </div>
                    <!-- LOGO -->
                    <div class="row d-flex align-items-center pe-md-5">
                        <div v-for="item in LogoData.logo" class="col-lg-2 col-3 px-xl-4 py-xl-3 px-2 py-2">
                            <img :src=item.img :alt=item.name class="img-thumbnail">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Recent Prj -->
        <section class="mb-4 px-md-5 px-1 " data-scroll-section>
            <h2>Recent Project</h2>
            <div class="py-md-3 pl-md-5 px-xl-3 bd-content">
                <div class="row">
                    <div  v-for="item in WorksData.project.slice(0,4)" class="col-md-6">
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
        </section>
    </main>
    <Footer />
</div>
</template>

<style>
.AboutIntro, .AboutExp, .AboutSkill{
    min-height: 1080px; 
}
.avatar-user {
  /* border-radius: 50% !important; */
  width: 500px;
  height: 500px; 
  height: auto;
}

.img-thumbnail{
    border:0;
}
</style>