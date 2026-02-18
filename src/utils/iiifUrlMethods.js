import fs from 'fs';

// Getter + Setter functions for the IIIF URL of the latest atwork batch 
export const getIiifUrl = () => {
    if (fs.existsSync('./data/batchData.json')) {
        const data = JSON.parse(fs.readFileSync('./data/batchData.json', 'utf-8'))
        return data.iiifUrl;
    }
}
    
export const setIiifUrl = url => {
    const iiifUrl = { 'iiifUrl': url }
    fs.writeFileSync('./data/batchData.json', JSON.stringify(iiifUrl));
}