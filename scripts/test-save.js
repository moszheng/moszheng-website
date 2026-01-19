// import fetch from 'node-fetch'; // Native fetch in Node 18+

const text = JSON.stringify({ project: [] });

// Try default Vite port
const PORT = 5173;

async function testSave() {
    try {
        const res = await fetch(`http://localhost:${PORT}/api/save-works`, {
            method: 'POST',
            body: text,
            headers: { 'Content-Type': 'application/json' }
        });
        console.log("Status:", res.status);
        console.log("Text:", await res.text());
    } catch (e) {
        console.error("Fetch failed (server might be down or wrong port):", e);
    }
}

testSave();
