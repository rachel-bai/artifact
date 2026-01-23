let dateBatched = null;

// check which runtime environment we're in
const isBrowser = typeof window != undefined && typeof window.document != undefined;

// getter
export const getDateBatched = () => {
    if (isBrowser) {
        return localStorage.getItem('dateBatched');
    } else {
        return dateBatched;
    }
}

// setter
export const setDateBatched = (date) => {
    if (isBrowser) {
        localStorage.setItem('dateBatched', dateBatched);
    } else {
        dateBatched = date;
    }
}