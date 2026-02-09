/* all server-side logic related to the management of the artwork batch */

import * as fs from 'fs';
import { setIiifUrl } from './iiifUrlMethods.js';
import { daysElapsedBatching, setDateBatched } from './dateMethods.js';

/* generates a new artwork batch if required */
export const artworkBatchManager = async () => {
    batch_nonexistent: if (!fs.existsSync('./data/artworkBatch.json', 'utf-8')) {
        await newArtworkBatch();
        break batch_nonexistent;
    } else {
        const lastBatchAge = daysElapsedBatching();
        if (lastBatchAge > 100 ) {
            await newArtworkBatch();
        }
    }
}

/* functionality to fetch, shuffle, select, clean, & store a random artwork batch.
only needs to be called every 100 days, i.e. when the existing batch of artworks
has been cycled through. */
const newArtworkBatch = async () => {
    const artworkPool = await fetchPool();
    shufflePool(artworkPool);
    const cleanedBatch = cleanBatch(artworkPool);
    const artworkBatch = selectBatch(cleanedBatch);
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
        setIiifUrl(data.config.iiif_url);

        // query params
        const limit = 100;
        const fields = [
            'id',
            'api_link',
            'image_id',
            'title',
            'artwork_type_title',
            'date_display',
            'artist_title',
            'artist_display'
        ].join(',');
        
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
        while (artworkBatch.length < 500);
        return artworkBatch;

    } catch (error) {
        console.error(error.message);
    }
}

const shufflePool = artworkBatch => {
    let currentIndex = artworkBatch.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [artworkBatch[currentIndex], artworkBatch[randomIndex]] = 
        [artworkBatch[randomIndex], artworkBatch[currentIndex]];
    }
}

const cleanBatch = artworkPool => {
    return artworkPool.filter(artwork => {
        const requiredFields = [
            'image_id',
            'title', 
            'date_display', 
            'artist_display', 
            'artwork_type_title',
            'artist_title'
        ];
        return requiredFields.every(field => artwork[field] != null);
    });
}

const selectBatch = cleanedBatch => {
    return cleanedBatch.slice(0, 100);
}

const persistBatch = artworkBatch => {
    fs.writeFileSync('./data/artworkBatch.json', JSON.stringify(artworkBatch, null, 2));
    setDateBatched(new Date().dateRecorded());
    setBatchSize(artworkBatch.length);
}

// Getter + Setter functions for the size of the latest artwork batch
export const getBatchSize = () => {
    if (fs.existsSync('./data/batchData.json')) {
        const data = JSON.parse(fs.readFileSync('./data/batchData.json', 'utf-8'))
        return data.batchSize;
    }
}
    
export const setBatchSize = size => {
    const batchData = JSON.parse(fs.readFileSync('./data/batchData.json', 'utf-8'));
    batchData.batchSize = size;
    fs.writeFileSync('./data/batchData.json', JSON.stringify(batchData, null, 2));
}