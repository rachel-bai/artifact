/*
Functionality to fetch a pool of random artworks, shuffle the pool, take the
first 100 (random) artworks and store them using Node fs.
Only needs to be called when the existing batch of artworks has been cycled through.
*/

import './DatePrototypes.js';
import * as fs from 'fs';
export var iiifUrl;

const artworkBatchManager = async () => {
    const artworkPool = await fetchPool();
    shufflePool(artworkPool);
    const artworkBatch = selectBatch(artworkPool);
    persistBatch(artworkBatch);
}

const fetchPool = async () => {
    const baseUrl = 'https://api.artic.edu/api/v1/artworks'
    const artworkCountUrl = `${baseUrl}?limit=1`;

    try {
        const response = await fetch(artworkCountUrl);
        
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        /* finds total no. of pages once artworks are batched by 100 +
        current iiifUrl, used for building image URLs */
        const data = await response.json();
        const totalPages = Math.ceil(data.pagination.total_pages / 100);
        iiifUrl = data.config.iiif_url;

        // query params
        const limit = 100;
        const fields = [
            "id",
            "api_link",
            "image_id",
            "title",
            "artwork_type_title",
            "date_display",
            "artist_title",
            "artist_display",
            "short_description"
        ].join(",");
        
        // tracker for visited pages + array for randomly selected artworks
        var pageVisited = new Array(totalPages).fill(false);
        var artworkBatch = new Array();
        
        do {
            const randomPage = Math.floor(Math.random() * totalPages);
            const randomPageIndex = randomPage - 1;
            
            if (pageVisited[randomPageIndex] == false) {
                const randomBatchUrl =
                    `${baseUrl}?` +
                    `page=${randomPage}&` +
                    `limit=${limit}&` +
                    `fields=${fields}`;
                const randomBatch = await fetch(randomBatchUrl);
                
                if (!randomBatch.ok) {
                    throw new Error(`Response status: ${randomBatch.status}`);
                }

                const randomBatchJson = await randomBatch.json();
                const randomBatchData = randomBatchJson.data;
                
                artworkBatch.push(...randomBatchData);

                pageVisited[randomPageIndex] = true;
            }
        }
        while (artworkBatch.length < 100);

        return artworkBatch;

    } catch (error) {
        console.error(error.message);
    }
}

const shufflePool = (artworkBatch) => {
    let currentIndex = artworkBatch.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [artworkBatch[currentIndex], artworkBatch[randomIndex]] = 
        [artworkBatch[randomIndex], artworkBatch[currentIndex]];
    }
}

const selectBatch = (artworkPool) => {
    return artworkPool.slice(0, 100);
}

const persistBatch = (artworkBatch) => {
    fs.writeFileSync('artworkBatch.json', JSON.stringify(artworkBatch, null, 2));
}

artworkBatchManager();