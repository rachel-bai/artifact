import fs from 'fs';
import { getArtworkBatch } from './app';

var iiifUrl;

// stores batch of artworks using Node fs once fetched
const storeArtworkBatch = async () => {

    // get a new batch of random artworks & collect their iiif_url
    const artworkBatch = await getArtworkBatch();
    iiifUrl = artworkBatch.config.iiif_url
    const artworkBatchData = artworkBatch.data;

    // write artworks to a JSON file
    artworkBatchData.forEach(element => {
        try {
            fs.writeFileSync('artworkBatch.json', JSON.stringify(element, null, 2));
        } catch (error) {
            console.error(error.message);
        }
    });
}

storeArtworkBatch();