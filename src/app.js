import { loadArtifactPage } from "./loadArtifactPage.js";
import { loadLikedPage } from "./loadLikedPage.js";

// let artworkObject = null;

/* navbar links */
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("artifact-page").addEventListener("click", e => {
        e.preventDefault();
        loadPage('artifact');
    });

    document.getElementById("liked-page").addEventListener("click", e => {
        e.preventDefault();
        loadPage('liked');
    });
});

/* load the DOM */
const loadPage = async page => {
    const response = await fetch(`./${page}.html`);
    const html = await response.text();
    document.getElementById("content").innerHTML = html;

    switch (page) {
        case 'artifact':
            loadArtifactPage();
            break;
        case 'liked':
            loadLikedPage();
            break;
    }
}

/* initial page load */
loadPage('artifact');