
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgDir = path.resolve(__dirname, '../src/img');
const backupDir = path.resolve(__dirname, '../src/img_backup');
const dataFile = path.resolve(__dirname, '../src/data/WorksData.json');

// Ensure backup dir
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
}

// Read JSON
let worksData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

// Get files
const files = fs.readdirSync(imgDir);

const changes = {}; // oldName -> newName

async function processImages() {
    console.log(`Found ${files.length} files in ${imgDir}`);

    for (const file of files) {
        const filePath = path.join(imgDir, file);
        const backupPath = path.join(backupDir, file);

        // Skip directories or non-images
        try {
            if (fs.lstatSync(filePath).isDirectory()) continue;
        } catch (e) {
            continue;
        }

        if (!/\.(jpg|jpeg|png|webp|gif)$/i.test(file)) continue;

        // Backup
        try {
             fs.copyFileSync(filePath, backupPath);
        } catch (e) {
             console.log("Backup failed for " + file);
        }

        const ext = path.extname(file);
        const name = path.basename(file, ext);
        const newFileName = `${name}.webp`;
        const newFilePath = path.join(imgDir, newFileName);

        console.log(`Processing ${file} -> ${newFileName}...`);

        try {
            // Check if we need to process
            // If already webp, we still might want to resize/compress if it's the original file
            // But if source is webp and target is webp, we are overwriting.

            const tempFile = newFilePath + ".tmp";

            const pipeline = sharp(filePath);
            const metadata = await pipeline.metadata();

            if (metadata.width > 2560) {
                 pipeline.resize({ width: 2560, withoutEnlargement: true });
            }

            // GIF handling: sharp can convert gif to webp (animated), but might lose quality or frames if not careful.
            // For now, treat all as static images or use 'animated: true' for webp if source is animated?
            // Simple approach: try to converting everything to static webp unless it's a gif?
            // User has gifs: "10_gha57_break.gif", "10_gha57_stage.gif" (large!)
            // Converting animated GIF to animated WebP is supported by sharp/libvips.

            let isAnimated = false;
            if (path.extname(file).toLowerCase() === '.gif') {
                isAnimated = true;
                 // Set animated: true
            }

            await pipeline
                .webp({ quality: 80, animated: isAnimated })
                .toFile(tempFile);

            // Success.
            // If new file name is different, delete old.
            if (file !== newFileName) {
                fs.unlinkSync(filePath);
            }
            // Move temp to real
            // Windows rename might fail if file exists and locked? default renameSync overwrites?
            // To be safe, unlink target if exists (excluding if it's the file we just deleted)
            if (fs.existsSync(newFilePath) && file !== newFileName) {
                 // Convert 'image.jpg' -> 'image.webp'. 'image.webp' might already exist?
                 // If it exists, overwrite it.
                 try { fs.unlinkSync(newFilePath); } catch(e){}
            }
            if (fs.existsSync(newFilePath) && file === newFileName) {
                  // We are overwriting itself. We already have temp.
                  // filePath is same as newFilePath.
                  try { fs.unlinkSync(newFilePath); } catch(e){}
            }

            fs.renameSync(tempFile, newFilePath);

            changes[file] = newFileName;

        } catch (err) {
            console.error(`Failed to process ${file}:`, err);
            // If failed, do not add to changes map.
        }
    }

    console.log("Updating JSON references...");
    let updateCount = 0;

    // Update WorksData
    if (worksData.project) {
        for (const proj of worksData.project) {
            // Update img
            if (proj.img && changes[proj.img]) {
                proj.img = changes[proj.img];
                updateCount++;
            }

            // Update img_md
            if (proj.img_md && Array.isArray(proj.img_md)) {
                proj.img_md = proj.img_md.map(img => {
                    if (changes[img]) {
                        updateCount++;
                        return changes[img];
                    }
                    return img;
                });
            }
        }
    }

    fs.writeFileSync(dataFile, JSON.stringify(worksData, null, 4));
    console.log(`Done. Updated ${updateCount} references.`);
}

processImages();
