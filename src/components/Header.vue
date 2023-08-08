<template>
<header class="sticky-top">
    <nav class="container navbar navbar-expand-lg flex-wrap flex-lg-nowrap">
        <div class="container-fluid">
            <div class="navbar-brand flex-column flex-md-row align-items-center">
                <h3 class="t-bold mx-lg-3">moszheng.design</h3>
            </div>
            <!-- navbar button -->
            <button class="navbar-toggler collapsed d-flex d-lg-none flex-column justify-content-around" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="toggler-icon top-bar"></span>
                <span class="toggler-icon mid-bar"></span>
                <span class="toggler-icon bot-bar"></span>
            </button>
            <!-- Canvas -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="nav mx-lg-4">
                    <li class="nav-item"><router-link to="/" class="nav-link link-dark px-2 active" aria-current="page">Home</router-link></li>
                    <li class="nav-item"><router-link to="/works" class="nav-link link-dark px-2">Works</router-link></li>
                    <li class="nav-item"><router-link to="/about" class="nav-link link-dark px-2">About</router-link></li>
                    <li class="nav-item"><router-link to="/contact" class="nav-link link-dark px-2">Contact</router-link></li>
                </ul>
                <div class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                    <ul class="navbar-nav flex-row flex-wrap ms-md-auto">
                        <li class="nav-item col-3 col-md-auto">
                            <a class="nav-link p-2" href="https://github.com/moszheng" target="_blank" rel="noopener">
                                <svg id="icon_github">
                                    <use xlink:href="#icon-github"></use>
                                </svg>
                            </a>
                        </li>
                        <li class="nav-item col-3 col-md-auto">
                            <a class="nav-link p-2" href="https://www.behance.net/moszheng" target="_blank" rel="noopener">
                                <svg id="icon_twitter">
                                    <use xlink:href="#icon-behance"></use>
                                </svg>
                            </a>
                        </li>
                        <li class="nav-item col-3 col-md-auto">
                            <a class="nav-link p-2" href="https://www.instagram.com/slothfellas/" target="_blank" rel="noopener">
                                <svg id="icon_twitter">
                                    <use xlink:href="#icon-instagram"></use>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    <div class="border-bottom"></div>
</header>
</template>