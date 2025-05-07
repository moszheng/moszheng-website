<script setup>
function ScrollTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
}
</script>
<template>
    <div class="work-end mx-auto w-full max-w-full sm:px-4">
        <a @click="ScrollTop" class="d-flex-center flex-col p-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                class="bi bi-chevron-compact-up mb-1"
                viewBox="0 0 16 16"
            >
                <path fill-rule="evenodd" d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z" />
            </svg>
            <p class="text-sm">BACK TO TOP</p>
        </a>
    </div>
</template>
