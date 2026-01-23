let dateBatched = null; // date of the latest batch selection
const isBrowser = typeof window !== 'undefined' 
    && typeof window.document !== 'undefined';

/* Extend prototypes for Date */ 
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

/* Getter + Setter function for the most recent date batched */
export const getDateBatched = () => {
    if (isBrowser) {
        return localStorage.getItem('dateBatched');
    } else {
        return dateBatched;
    }
}

export const setDateBatched = date => {
    if (isBrowser) {
        localStorage.setItem('dateBatched', date);
    } else {
        dateBatched = date;
    }
}

export {}; // satisfies ESM syntax