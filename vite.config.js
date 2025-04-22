import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/",
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },

    // build: {
    //   rollupOptions: {
    //     // https://rollupjs.org/guide/en/#outputmanualchunks
    //     output: {
    //       manualChunks: {
    //         'group-user': [
    //           './src/views/Home.vue',
    //           './src/views/Works.vue',
    //           './src/views/Contact.vue',
    //         ],
    //       },
    //     },
    //   },
    // },
});
