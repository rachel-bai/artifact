export const getLikedWorks = () => {
    return JSON.parse(localStorage.getItem('likedArtworks')) || {};
}

export const isLiked = (id) => {
    const likedWorks = getLikedWorks();
    return !!likedWorks[id];
}

export const likeArtwork = (artworkObject) => {
    const likedWorks = getLikedWorks();
    likedWorks[artworkObject.id] = artworkObject;
    localStorage.setItem('likedArtworks', JSON.stringify(likedWorks));
}

export const unlikeArtwork = (artworkObject) => {
    const likedWorks = getLikedWorks();
    delete likedWorks[artworkObject.id];
    localStorage.setItem('likedArtworks', JSON.stringify(likedWorks));
}