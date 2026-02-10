export const loadLikedPage = () => {
    const likedArtworks =
    JSON.parse(localStorage.getItem("likedArtworks")) || {};
    const container = document.getElementById("liked-content");

    Object.values(likedArtworks)
        .reverse()
        .forEach(art => {
            container.innerHTML += `
                <div class="col-6 col-md-4 col-lg-3">
                <div class="card h-100">
                    <img src="${art.url}" class="card-img-top">
                    <div class="card-body">
                    <p class="card-title">${art.title}</p>
                    </div>
                </div>
                </div>
            `;
        });
}