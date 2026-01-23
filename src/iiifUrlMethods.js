import fs from 'fs';

export const getIiifUrl = () => {
    if (fs.existsSync('iiifUrl.json')) {
        return JSON.parse(fs.readFileSync('iiifUrl.json', 'utf-8'));
    }
}
    
export const setIiifUrl = url => {
    fs.writeFileSync('iiifUrl.json', JSON.stringify(url));
}