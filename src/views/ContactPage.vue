<script setup>
import FooterItem from '@/components/FooterItem.vue';
</script>
<template>
<div>
    <main class="contact h-screen container mx-auto sm:px-4 d-flex-center">
        <div class="flex flex-wrap flex-fill w-full lg:px-0 px-4 py-5 xl:mb-6">
            <div class="xl:w-1/2">
            </div>
            <div class="contact-form xl:w-1/2 w-full lg:max-w-screen-sm">
                <form action="https://formspree.io/f/meqbdlnk" method="POST">
                    <h2 class="lg:mb-12 mb-4">Contact</h2>
                    <div class="space-y-4">
                        <!-- email -->
                        <div class="text-base">
                            <label for="InputName">Name</label>
                            <input name="Name" type="text" placeholder="">
                        </div>
                        <!-- email -->
                        <div class="text-base">
                            <label for="InputEmail1">Email</label>
                            <input type="email" class="" name="Email" id="InputEmail1" placeholder="">
                        </div>
                        <!-- msg -->
                        <div class="text-base">
                            <label for="FormControlTextarea1">Messenge</label>
                            <textarea class="" name="Messenge" id="FormControlTextarea1" rows="3"></textarea>
                        </div>
                    </div>
                    <button type="submit" class="btn inline-block align-middle text-center text-base select-none border whitespace-no-wrap lg:w-1/3 w-full h-10 rounded-lg py-1 px-3 leading-normal no-underline bg-main-orange text-white hover:bg-orange-400 duration-300">Send</button>
                </form>
            </div>
        </div>
    </main>
    <FooterItem />
</div>
</template>
<style scoped>

</style>
