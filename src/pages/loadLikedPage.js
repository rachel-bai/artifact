import { getLikedWorks } from "./likedWorksManager.js";

export const loadLikedPage = () => {
    const likedArtworks = getLikedWorks();
    const container = document.getElementById('liked-content');

    Object.values(likedArtworks)
        .reverse()
        .forEach(work => {
            container.innerHTML += `
                <div class="col-6 col-md-4 col-lg-3">
                    <div class="card">
                        <div class="square-image-wrapper">
                            <img src="${work.url}" class="card-img-top">
                        </div>
                    </div>
                </div>
            `;
        });
}