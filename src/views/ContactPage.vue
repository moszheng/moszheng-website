<script setup>
import FooterItem from '@/components/FooterItem.vue';
</script>
<template>
<div>
    <main class="Contact container">
        <div class="row py-5">
            <div class="col-xl-6">
            </div>
            <div class="col-xl-6">
                <form action="https://formspree.io/f/meqbdlnk" method="POST">
                    <h1 class="my-5">Contact</h1>
                    <!-- email -->
                    <div class="form-group my-3">
                        <label for="InputName">Name</label>
                        <input class="form-control" name="Name" type="text" placeholder="">
                    </div>
                    <!-- email -->
                    <div class="form-group my-3">
                        <label for="InputEmail1">Email</label>
                        <input type="email" class="form-control" name="Email" id="InputEmail1" placeholder="">
                    </div>
                    <!-- msg -->
                    <div class="form-group my-3">
                        <label for="FormControlTextarea1">Messenge</label>
                        <textarea class="form-control" name="Messenge" id="FormControlTextarea1" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary mb-2">Send</button>
                </form>
            </div>
        </div>
    </main>
    <FooterItem />
</div>
</template>
<style>
.Contact{
    min-height: 80vh;
}
</style>
