import http from 'http';
import fs from 'fs'
import { artworkSelectionManager } from './getTodaysArtwork.js';

const server = http.createServer(async (req, res) => {

    if (req.url === '/') {
        const html = fs.readFileSync('public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
        return;
    } else if (req.url === '/style.css') {
        const css = fs.readFileSync('public/style.css', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(css);
        return;
    } else if (req.url === '/current-artwork') {
        const artworkUrl = await artworkSelectionManager();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ "artworkUrl": artworkUrl }));
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
});

server.listen(3000, () => console.log("Server running at http://localhost:3000"));