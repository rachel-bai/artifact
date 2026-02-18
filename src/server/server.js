import http from 'http';
import fs from 'fs';
import path from 'path';
import { getTodaysArtwork } from '../state/getTodaysArtwork.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..', '..');

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
};

const server = http.createServer(async (req, res) => {
    let urlPath = req.url;

    if (urlPath === '/current-artwork') {
        const artwork = await getTodaysArtwork();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(artwork));
        return;
    }

    if (urlPath === '/') {
        urlPath = '/html/index.html';
    }

    const filePath = path.join(rootDir, urlPath);

    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'text/plain';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    })
})

server.listen(3000, () =>
    console.log('Server running at http://localhost:3000')
)