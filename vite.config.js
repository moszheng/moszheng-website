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
            try { fs.appendFileSync(path.resolve(__dirname, "middleware_hit.log"), `${new Date().toISOString()} - ${req.method} ${req.url}\n`); } catch(e){}
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
                        try {
                            fs.writeFileSync(path.resolve(__dirname, "save_error.log"), `Error: ${error.message}\nStack: ${error.stack}\n`);
                        } catch (logErr) {
                            console.error("Failed to write log:", logErr);
                        }
                        res.statusCode = 500;
                        res.end(`Error saving file: ${error.message}`);
                    }
                });
            } else {
                next();
            }
        });
    },
});
