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
        <div class="row mx-md-5 mx-1 px-md-5 px-1 py-5">
        <!-- <main class="row mx-5 px-5 py-5"> -->
            <div class="col-xxl-4 col-xl-5">
                <div class="text-center">
                    <div class="mb-4 ">
                        <img class="avatar avatar-user width-full border color-bg-default" alt="" :src=profile_image>
                    </div>
                    <h3 class="mb-1 ">Sheng Wen (Mos) Cheng</h3>
                    <span class="mb-4">@moszheng</span>
                </div>
                <div class="my-4 pe-3">
                    <p>Hi, My name is Mos Zheng, A 3D Generalist and Motion Designer freelancer based in Taiwan.</p>

                    <p>I established Slothfellas, a platform that provides C4D plugins and After Effects scripts,  designed to enhance workflows and simplify processes.</p>

                    <p>For any inquiries, please send me an email</p>
                </div>
                <ul>
                    <li>behance.net/moszheng</li>
                    <li>moszheng.design@gmail.com</li>
                    <li>Taipei, Taiwan</li>
                </ul>
            </div>
            <div class="col-xxl-8 col-xl-7 mt-xl-0 mt-4">
                <div class="mb-4">
                    <h3 class="mb-4 ">Experience</h3>
                    <div class="px-xl-3">
                        <!-- Freelance -->
                        <div class="my-4">
                            <div class="row mb-3">
                                <h5 class="col">Freelance</h5>
                                <div class="col">2023 - Now</div>
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
                        <!-- Mixcode -->
                        <div class="my-4">
                            <div class="row mb-3">
                                <h5 class="col">Mixcode</h5>
                                <div class="col">2021 - 2022</div>
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
                        
                        <!-- JL -->
                        <div class="my-4">
                            <div class="row mb-3">
                                <h5 class="col">JL design</h5>
                                <div class="col">2018 - 2021</div>
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
                <div class="border-top"></div>
                <div class="my-4">
                    <h3 class="mb-4">Education</h3>
                    <!-- SCCD -->
                    <div class="px-md-3 px-1 my-4">
                        <div class="row mb-3">
                            <h5 class="col">
                                B.A, Commuications Design
                                Shih-Chien University
                            </h5>
                            <div class="col">2015 - 2019</div>
                        </div>
                        <ul>
                            <li>
                                Major in 3D animation
                            </li>
                        </ul>
                    </div>
                    <div class="px-md-3 px-1 my-4">
                        <div class="row mb-3">
                            <h5 class="col">Cheng-Kung Senior High</h5>
                            <div class="col">2012 - 2015</div>
                        </div>
                        <ul>
                            <li>
                                @Computer Science Club
                            </li>
                        </ul>
                    </div>
                </div>
            </div>  
        </div>
        <div class="mb-5">
            <h2 class="mb-4">Skill</h2>
            <div class="row px-md-5 align-items-center">
                <div v-for="item in LogoData.logo" class="col-2 px-lg-4 py-3">
                    <img :src=item.img :alt=item.name class="img-thumbnail">
                </div>
            </div>
            
        </div>
        <div class="mb-4">
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
.img-thumbnail{
    border:0;
}
</style>