<script setup>
import FooterItem from "@/components/FooterItem.vue";
</script>
<template>
<div>
    <main class="contact d-flex-center container mx-auto h-screen sm:px-4">
        <div class="flex-fill flex w-full flex-wrap px-4 py-5 lg:px-0 xl:mb-6">
            <div class="xl:w-1/2"></div>
            <div class="contact-form w-full lg:max-w-(--breakpoint-sm) xl:w-1/2">
                <form action="https://formspree.io/f/meqbdlnk" method="POST">
                    <h2 class="mb-4 text-stone-950 lg:mb-12">Contact</h2>
                    <div class="space-y-4">
                        <!-- email -->
                        <div class="text-base">
                            <label for="InputName">Name</label>
                            <input name="Name" type="text" placeholder="" />
                        </div>
                        <!-- email -->
                        <div class="text-base">
                            <label for="InputEmail1">Email</label>
                            <input type="email" class="" name="Email" id="InputEmail1" placeholder="" />
                        </div>
                        <!-- msg -->
                        <div class="text-base">
                            <label for="FormControlTextarea1">Message</label>
                            <textarea class="" name="Messenge" id="FormControlTextarea1" rows="3"></textarea>
                        </div>
                    </div>
                    <button
                        type="submit"
                        class="btn inline-block h-10 w-full select-none rounded-lg border bg-main-orange px-3 py-1 text-center align-middle text-base leading-normal text-white no-underline duration-300 hover:bg-orange-400 lg:w-1/3"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    </main>
    <FooterItem />
</div>
</template>
