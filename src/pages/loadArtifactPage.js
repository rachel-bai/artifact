import { isLiked, likeArtwork, unlikeArtwork } from '../state/likedWorksManager.js';

let artworkObject = null;

export const loadArtifactPage = async () => {
    await loadArtwork();
    likeUnlikeManager(artworkObject);
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
        // document.getElementById('description').textContent = data.description;
        // document.getElementById('medium').textContent = data.medium_display;
    } catch (err) {
        console.error('Failed to fetch artwork:', err);
    }
}

/* visual heart button logic */
const likeUnlikeManager = artworkObject => {
    const button = document.getElementById('heart-button');
    const icon = document.getElementById('heart-icon');
    const liked = isLiked(artworkObject.id);

    if (liked) {
        icon.classList.remove('bi-heart');
        icon.classList.add('bi-heart-fill', 'text-danger');
    }

    button.addEventListener('click', () => {
        icon.classList.toggle('bi-heart-fill');
        icon.classList.toggle('bi-heart');
        icon.classList.toggle('text-danger');

        const currentlyLiked = isLiked(artworkObject.id);

        if (currentlyLiked) {
            unlikeArtwork(artworkObject);
        } else {
            likeArtwork(artworkObject);
        }
    });
}