import { getLikedWorks } from '../state/likedWorksManager.js';

export const loadLikedPage = () => {
    const likedArtworks = getLikedWorks();
    const container = document.getElementById('liked-content');

    Object.values(likedArtworks)
        .forEach(artwork => {
            container.innerHTML += `
                <div class='col-6 col-md-4 col-lg-3'>
                    <div class='card liked-artwork'
                    data-url='${artwork.url}'
                    data-artist='${artwork.artist_title}'
                    data-title='${artwork.title}'
                    data-date='${artwork.date_display}'
                    data-medium='${artwork.artwork_type_title}'>
                        <div class='square-image-wrapper'>
                            <img src='${artwork.url}' class='card-img-top'>
                        </div>
                    </div>
                </div>
            `;
        });
    
    container.addEventListener('click', e=> {
        const card = e.target.closest('.liked-artwork');
        console.log(card.dataset);
        if (!card) return;

        document.getElementById('modal-artwork').src = card.dataset.url;
        document.getElementById('modal-artist').textContent = card.dataset.artist;
        document.getElementById('modal-title').textContent = card.dataset.title;
        document.getElementById('modal-date').textContent = card.dataset.date;
        document.getElementById('modal-medium').textContent = card.dataset.medium;

        const modal = new bootstrap.Modal(document.getElementById('artwork-modal'));
        modal.show();
    })
}