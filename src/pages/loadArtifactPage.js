import { heartUnheartManager } from "../state/heartManager.js";

let artworkObject = null;

export const loadArtifactPage = async () => {
    await loadArtwork();
    heartUnheartManager(
        artworkObject,
        document.getElementById('heart-button'),
        document.getElementById('heart-icon')
    );
}

/* load the daily artwork */
const loadArtwork = async () => {
    try {
        const response = await fetch('/current-artwork');
        const data = await response.json();
        artworkObject = data;

        document.getElementById('current-artwork').src = artworkObject.url;
        document.getElementById('artist').textContent = artworkObject.artist_title;
        document.getElementById('title').textContent = `${artworkObject.title},`;
        document.getElementById('date').textContent = artworkObject.date_display;
        document.getElementById('medium').textContent = artworkObject.artwork_type_title;
    } catch (err) {
        console.error('Failed to fetch artwork:', err);
    }
}