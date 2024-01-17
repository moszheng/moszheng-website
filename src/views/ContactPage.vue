<script setup>
import FooterItem from '@/components/FooterItem.vue';
</script>
<template>
<div>
    <main class="contact container d-flex-center">
        <div class="row flex-fill py-5 mb-xl-4">
            <div class="col-xl-6">
            </div>
            <div class="contact-form col-xl-6 ">
                <form action="https://formspree.io/f/meqbdlnk" method="POST">
                    <h2 class="mb-5">Contact</h2>
                    <!-- email -->
                    <div class="form-group my-3 ">
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
                    <button type="submit" class="btn btn-primary text-white mb-2">Send</button>
                </form>
            </div>
        </div>
    </main>
    <FooterItem />
</div>
</template>
<style scoped>
.contact{
    height: 80dvh;
}
.contact-form{
    max-width: 600px;
}
.btn{
    min-width: 30%;
}
</style>
