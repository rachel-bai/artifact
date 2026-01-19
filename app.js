// fetches a random batch of artworks 
export const getArtworkBatch = async () => {
    const baseUrl = 'https://api.artic.edu/api/v1/artworks'
    // finds total no. of artworks
    // finds total no. of pages once artworks are batched by 100s
    const artworkCountUrl = `${baseUrl}?limit=1`;

    try {
        const response = await fetch(artworkCountUrl);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        const totalBatchedPages = Math.ceil(data.pagination.total_pages / 100);

        // generate a random page from batched pages 
        const randomPage = Math.floor(Math.random() * totalBatchedPages);
        const limit = 100;
        const fields = "id,api_link,image_id,title,artwork_type_title,date_display,artist_title,artist_display,short_description";
        const randomBatchUrl = `${baseUrl}?page=${randomPage}&limit=${limit}&fields=${fields}`;
        
        const randomBatch = await fetch(randomBatchUrl);
        if (!randomBatch.ok) {
            throw new Error(`Response status: ${randomBatch.status}`);
        }

        const randomBatchData = await randomBatch.json();
        return randomBatchData;
        
    } catch (error) {
        console.error(error.message);
    }
}