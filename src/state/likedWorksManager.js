export const getLikedWorks = () => {
    return JSON.parse(localStorage.getItem('likedArtworks')) || [];
}

export const isLiked = artworkObject => {
    const likedWorks = getLikedWorks();
    return likedWorks.some(artwork => artwork.id === Number(artworkObject.id));
}

export const likeArtwork = artworkObject => {
    const likedWorks = getLikedWorks();

    if (!likedWorks.some(artwork => artwork.id === artworkObject.id)) {
        likedWorks.unshift(artworkObject);
        localStorage.setItem('likedArtworks', JSON.stringify(likedWorks));
    }
}

export const unlikeArtwork = artworkObject => {
    const likedWorks = getLikedWorks();

    const updatedWorks = likedWorks.filter(
        artwork => artwork.id !== Number(artworkObject.id)
    )
    
    localStorage.setItem('likedArtworks', JSON.stringify(updatedWorks));
}