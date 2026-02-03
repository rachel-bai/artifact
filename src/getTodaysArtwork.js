/* 
browser-facing functionality to switch the artwork currently being displayed for
all users. the artwork (index) is determined by the amount of time elapsed since
the fixed start date, which i have assigned to be the first day i started working
on this project!
*/

import * as fs from 'fs';
import { getIiifUrl } from '../iiifUrlMethods.js';
import { daysElapsedEpoch } from './dateMethods.js';
import { artworkBatchManager } from './artworkBatchManager.js';

const epoch = new Date("2026-01-15T00:00:00Z").getTime();

export const artworkSelectionManager = async () => {
    await artworkBatchManager();
    const artworkUrl = getArtworkUrl();
    return artworkUrl;
}

const getArtworkUrl = () => {
    // get current artwork index based on date
    const index = daysElapsedEpoch(epoch) % 100;
    const artworkBatch = JSON.parse(fs.readFileSync('./data/artworkBatch.json', 'utf-8'));
    const currentArtwork = artworkBatch[index]

    // construct new URL based on chosen image
    const iiifUrl = getIiifUrl() + '/';
    console.log(iiifUrl);
    const imageId = currentArtwork.image_id;
    const suffix = '/full/843,/0/default.jpg';  // recommended by the AIC docs
    const artworkUrl = `${iiifUrl}${imageId}${suffix}`;
    return artworkUrl;
}

const getArtworkMetadata = () => {

}