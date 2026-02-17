import * as fs from 'fs';

let dateBatched = null; // date of the latest batch selection
const isBrowser = typeof window !== 'undefined' 
    && typeof window.document !== 'undefined';

// Extend prototypes for Date
Date.prototype.dateRecorded = function () { 
    return ((this.getDate() < 10)?"0":"") + this.getDate() 
    +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) 
    +"/"+ this.getFullYear();
}

Date.prototype.timeRecorded = function () {
    return ((this.getHours() < 10)?"0":"") + this.getHours() 
    +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() 
    +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

// Getter + Setter functions for the most recent date batched
export const getDateBatched = () => {
    if (fs.existsSync('./data/batchData.json')) {
        const data = JSON.parse(fs.readFileSync('./data/batchData.json', 'utf-8'));
        return data.dateBatched;
    }
}
    
export const setDateBatched = date => {
    const batchData = JSON.parse(fs.readFileSync('./data/batchData.json', 'utf-8'));
    batchData.dateBatched = date;
    fs.writeFileSync('./data/batchData.json', JSON.stringify(batchData, null, 2));
}

// Functions to calculate days elapsed since significant dates
export const daysElapsedEpoch = epoch =>        // days since initialisation
    Math.floor((new Date() - new Date(epoch).setHours(0,0,0,0)) / 86400000);

export const daysElapsedBatching = () => {      // days since last batching
    const dateFormat = getDateBatched().split('/');
    const day = dateFormat[0];
    const month = dateFormat[1];
    const year = dateFormat[2];
    const dateBatched = new Date(`${year}-${month}-${day}T00:00:00Z`).getTime();

    return Math.floor((new Date() - new Date(dateBatched).setHours(0,0,0,0)) / 86400000);
}

export {}; // satisfies ESM syntax