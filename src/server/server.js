import http from 'http';
import fs from 'fs';
import path from 'path';
import { getTodaysArtwork } from '../state/getTodaysArtwork.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
    if (req.url === '/') {
        const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
        return;
    } else if (req.url === '/current-artwork') {
        const artwork = await getTodaysArtwork();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(artwork));
        return;
    } else if (req.url.endsWith('.js')) {
        try {
            const jsPath = path.join(__dirname, '..', req.url);
            const jsContent = fs.readFileSync(jsPath, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(jsContent);
        } catch (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
        }
        return;
    } else if (req.url.endsWith('.html')) {
        try {
            const htmlPath = path.join(__dirname, '..', req.url.slice(1));
            const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(htmlContent);
        } catch (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
        }
        return;
    } else if (req.url.endsWith('.css')) {
        try {
            const cssPath = path.join(__dirname, '..', req.url.slice(1));
            const cssContent = fs.readFileSync(cssPath, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(cssContent);
        } catch (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
        }
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("404 Not Found");
});

server.listen(3000, () => console.log("Server running at http://localhost:3000"));