import { isLiked, likeArtwork, unlikeArtwork } from './likedWorksManager.js';

/* liking (storing) an artwork logic */
export const heartUnheartManager = (artworkObject, button, icon)  => {
    renderHeart(artworkObject, icon)

    button.onclick = () => {
        if (isLiked(artworkObject)) {
            console.log("WE HERE")
            unlikeArtwork(artworkObject);
        } else {
            likeArtwork(artworkObject);
        }

        console.log(button.classList)
        console.log(icon.classList)

        renderHeart(artworkObject, icon)
    }
}

/* visual heart button logic */
export const renderHeart = (artworkObject, icon) => {
    const liked = isLiked(artworkObject);

    console.log(artworkObject)
    console.log(liked)

    icon.classList.toggle('bi-heart-fill', liked);
    icon.classList.toggle('bi-heart', !liked);
    icon.classList.toggle('text-danger', liked);
}