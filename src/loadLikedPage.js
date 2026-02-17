import { getLikedWorks } from "./likedWorksManager.js";

export const loadLikedPage = () => {
    const likedArtworks = getLikedWorks();
    const container = document.getElementById('liked-content');

    Object.values(likedArtworks)
        .reverse()
        .forEach(work => {
            container.innerHTML += `
                <div class="col-6 col-md-4 col-lg-3">
                <div class="card h-100">
                    <img src="${work.url}" class="card-img-top">
                    <div class="card-body">
                    <p class="card-title">${work.title}</p>
                    </div>
                </div>
                </div>
            `;
        });
}