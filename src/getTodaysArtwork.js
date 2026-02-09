/* 
browser-facing functionality to switch the artwork currently being displayed for
all users. the artwork (index) is determined by the amount of time elapsed since
the fixed start date, which i have assigned to be the first day i started working
on this project!
*/

import * as fs from 'fs';
import { getIiifUrl } from './iiifUrlMethods.js';
import { daysElapsedEpoch } from './dateMethods.js';
import { artworkBatchManager, getBatchSize } from './artworkBatchManager.js';

const epoch = new Date("2026-01-15T00:00:00Z").getTime();

export const getTodaysArtwork = async () => {
    await artworkBatchManager();
    
    const artwork = getArtworkObject();
    const artworkUrl = getArtworkUrl(artwork);
    const artworkData = getArtworkMetadata(artwork);
    artworkData.url = artworkUrl;
    
    return artworkData;  // returns artwork object with required metadata
}

/* get current artwork index based on date */
const getArtworkObject = () => {
    const lastBatchSize = getBatchSize();
    const index = daysElapsedEpoch(epoch) % lastBatchSize;
    const artworkBatch = JSON.parse(fs.readFileSync('./data/artworkBatch.json', 'utf-8'));
    return artworkBatch[index];
}

/* construct new URL based on chosen image */
const getArtworkUrl = artwork => {
    const iiifUrl = getIiifUrl() + '/';
    const imageId = artwork.image_id;
    const suffix = '/full/843,/0/default.jpg';  // recommended by the AIC docs
    const artworkUrl = `${iiifUrl}${imageId}${suffix}`;
    return artworkUrl;
}

/* keep required metadata */
const getArtworkMetadata = artwork => {
    delete artwork['id'];
    delete artwork['api_link'];
    delete artwork['image_id'];
    return artwork;
}