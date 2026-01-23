/* 
browser-facing functionality to switch the artwork currently being displayed for
all users. the artwork (index) is determined by the amount of time elapsed since
the fixed start date, which i have assigned to be the first day i started working
on this project!
*/

import * as fs from 'fs';
import { getIiifUrl } from './iiifUrlMethods.js';

const epoch = new Date("2026-01-15T00:00:00Z").getTime();

const artworkSwitchingManager = () => {
    // upon opening the browser...

    // get current artwork based on date
    const index = daysElapsed(epoch) % 100 - 1;
    const artworkBatch = JSON.parse(fs.readFileSync('artworkBatch.json', 'utf-8'));
    const currentArtwork = artworkBatch[index]

    // construct new URL based on chosen image
    const iiifUrl = getIiifUrl();
    const imageId = currentArtwork.image_id;
    const suffix = '/full/843,/0/default.jpg';  // recommended by the AIC docs
    const artworkUrl = `${iiifUrl}` + `${imageId}` + `${suffix}`;
    console.log(artworkUrl);
}

const daysElapsed = epoch => 
    Math.floor((new Date() - new Date(epoch).setHours(0,0,0,0)) / 86400000);

artworkSwitchingManager();