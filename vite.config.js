import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import fs from "node:fs";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/",
    plugins: [vue(), tailwindcss()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    configureServer(server) {
        server.middlewares.use("/api/save-works", (req, res, next) => {
            if (req.method === "POST") {
                console.log("POST /api/save-works received");
                let body = "";
                req.on("data", (chunk) => {
                    body += chunk.toString();
                });
                req.on("end", () => {
                    try {
                        // Current directory in ESM
                        const __dirname = path.dirname(fileURLToPath(import.meta.url));
                        const filePath = path.resolve(__dirname, "src/data/WorksData.json");
                        
                        console.log("Saving WorksData to:", filePath);

                        // Parse to ensure valid JSON before writing
                        const jsonData = JSON.parse(body);
                        
                        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 4));
                        res.statusCode = 200;
                        res.end("File saved successfully");
                    } catch (error) {
                        console.error("Error saving file:", error);
                        res.statusCode = 500;
                        res.end("Error saving file");
                    }
                });
            } else {
                next();
            }
        });
    },
});
