<script setup>
import Footer from '../components/Footer.vue'
import { ref } from 'vue'
import WorksData from '../data/WorksData.json'
import LogoData from '../data/LogoData.json'

const profile_image = '../src/img/profile.png';

</script>
<template>
<div>
    <main class="container">
        <!-- Intro -->
        <div class="AboutIntro d-flex align-items-center row mx-md-3 mx-1 px-md-2 px-1 py-5">
            <div class="col-xl-5">
                <div class="align-self-center text-center">
                    <div class="mb-4 ">
                        <img class="avatar avatar-user width-full border" alt="" :src=profile_image>
                    </div>
                </div>
            </div>
            <div class="col-xl-7 mt-xl-0 mt-4 px-md-5 ">
                <div class="mb-5">
                    <h1 class="mb-5">Hi, My name is Mos Zheng</h1>
                    <h3 class="mb-5">A 3D Generalist and Motion Designer freelancer based in Taiwan.</h3>

                    <p>I established Slothfellas, a platform that provides C4D plugins and After Effects scripts,  designed to enhance workflows and simplify processes.</p>

                    <p>For any inquiries, please send me an email</p>
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
        </div>
        <div class="border-top"></div>
        <!-- Experience -->
        <!-- d-flex align-items-center -->
        <div class="AboutExp px-md-5 px-1 my-5">
            <div class="mt-xl-0 mt-4">
                <div class="row mb-4">
                    <!-- title -->
                    <div class="col-md-3">
                        <h3 class="mb-4">Experience</h3>
                    </div>
                    <div class="col-md-9 px-xl-3">
                        <!-- Freelance -->
                        <div class="row">
                            <div class="col-2 my-4">
                                <div class="col text-center">2023 - Now</div>
                            </div>
                            <div class="col-1"></div>
                            <div class="col my-4">
                                <div class="row mb-3">
                                    <h4 class="col">Freelance</h4>
                                    
                                    <div>3D Generalist</div>
                                </div>
                                <ul>
                                    <li>
                                        Primarily work remotely as a freelance artist, 
                                        specializing in a diverse range of disciplines such as 3D artwork, visual effects (VFX), and motion graphics.
                                    </li>
                                    <li>
                                        Developing various programs and websites, 
                                        and founded a brand called "SlothFellas" released a set of tools designed to assist creators in working more efficiently.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- Mixcode -->
                        <div class="row">
                            <div class="col-2 my-4">
                                <div class="col text-center">2021 - 2022</div>
                            </div>
                            <div class="col-1"></div>
                            <div class="col my-4">
                                <div class="row mb-3">
                                    <h4 class="col">Mixcode</h4>
                                    
                                    <div>Motion Designer</div>
                                </div>
                                <ul>
                                    <li>
                                        Specialize in procedural NFT character development, 
                                        utilizing Python and JavaScript to create custom Cinema 4D and AfterEffects plug-ins.
                                    </li>
                                    <li>
                                        Executing and developing motion graphics, 3D animations.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <!-- JL -->
                        <div class="row">
                            <div class="col-2 my-4">
                                <div class="col text-center">2018 - 2021</div>
                            </div>
                            <div class="col-1"></div>
                            <div class="col my-4">
                                <div class="row mb-3">
                                    <h4 class="col">JL design</h4>
                                    
                                    <div>Intern, Motion Designer</div>
                                </div>
                                <ul>
                                    <li>
                                        Exploring and implementing new techniques, including PBR texturing, lighting, and rendering, 
                                        to enhance the visual quality of projects.
                                    </li>
                                    <li>
                                        Creating highly detailed models with smooth topology, ensuring realistic animations.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            
        </div>
        <div class="border-top"></div>
        <!-- Skill -->
        <div class="AboutSkill px-md-5 px-1 my-5">
            <div class="row">
                <div class="col-md-3">
                    <h2 class="mb-4 ">Service & Skill</h2>
                </div>
                <div class="col px-md-5 ">
                    <div class="row mb-5">
                        <div class="col-md-6">
                            <h3 class="mb-4">Motion Design</h3>
                            <h5>Modeling</h5>
                            <h5>Texturing</h5>
                            <h5>Lighting</h5>
                            <h5>Compositing</h5>
                            <h5>VFX Simulating</h5>
                        </div>
                        <div class="col-md-6">
                            <h3 class="mb-4">Development</h3>
                            <h5>C4D Python Scripts</h5>
                            <h5>Frontend Developing</h5>
                            <h5>Workflow R&D</h5>
                        </div>
                    </div>
                    <!-- LOGO -->
                    <div class="row d-flex align-items-center pe-md-5">
                        <div v-for="item in LogoData.logo" class="col-2 px-lg-4 py-lg-3">
                            <img :src=item.img :alt=item.name class="img-thumbnail">
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="mb-4 px-md-5 px-1 ">
            <h2>Recent Project</h2>
            <div class="py-md-3 pl-md-5 px-xl-3 bd-content">
                <div class="row">
                    <div  v-for="item in WorksData.project" class="col-md-6">
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
        </div>
    </main>
    <Footer />
</div>
</template>

<style>
.AboutIntro, .AboutExp, .AboutSkill{
    min-height: 1080px; 
}
.avatar-user {
  border-radius: 50% !important;
  width: 320px;
  height: 320px; 
  height: auto;
}

.img-thumbnail{
    border:0;
}
</style>