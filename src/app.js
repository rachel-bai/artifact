/* load the daily artwork */
function loadArtwork() {
    fetch('/current-artwork')
    .then(response => response.json())
    .then(data => {
        const img = document.getElementById('current-artwork');
        const artworkUrl = data.url;
        const artist = data.artist_title;
        const title = data.title;
        const date = data.date_display;
        const medium = data.artwork_type_title;
        const artist_date = data.artist_display;
        
        img.src = artworkUrl;
        document.getElementById('artist').textContent = artist;
        document.getElementById('title').textContent = `${title},`;
        document.getElementById('date').textContent = date;
        document.getElementById('medium').textContent = medium;
        document.getElementById('artist_date').textContent = `(${artist_date})`;
    })
    .catch(err => console.error("Failed to fetch artwork:", err));
}

/* heart button logic */
function heartButtonManager() {
    const button = document.getElementById("heart-button");
    const icon = document.getElementById("heart-icon");

    button.addEventListener("click", () => {
        icon.classList.toggle("bi-heart");
        icon.classList.toggle("bi-heart-fill");
        icon.classList.toggle("text-danger");
    });
}

/* load the DOM */
document.addEventListener("DOMContentLoaded", () => {
    loadArtwork();
    heartButtonManager();
});