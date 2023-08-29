<script setup>
import Footer from '../components/Footer.vue'
import { ref } from 'vue'

</script>
<template>
<div>
    <main class="Contact container">
        <div class="row py-5">
            <div class="col-xl-6">
            </div>
            <div class="col-xl-6">
                <form name="submit-to-google-sheet">
                    <h1 class="my-5">Contact</h1>
                    <input class="form-control" name="Name" type="text" placeholder="Name">
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
    <Footer />
</div>
</template>
<style>
.Contact{
    min-height: 80vh;
}
</style>
