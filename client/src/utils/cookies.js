// https://developer.mozilla.org/en-US/docs/web/api/document/cookie
// Cookies are primarily for communication with SERVER, for all CLIENT storage use localStorage!


export default class Cookies {
    static db = {};
    static init = false;

    static initialize() {
        const arr = document.cookie.split('; ');
        for (let i = 0; i < arr.length; i++) {
            let pair = arr[i].split('=');
            Cookies.db[pair[0]] = pair[1];
        }
        Cookies.init = true;
    }

    static toString() {
        return Object.keys(Cookies.db)
            .map(key => {
                return `${key}=${Cookies.db[key]}; sameSite=Lax`; // Must study further
            }).join('; ');
    }

    static checkValue(cookieID, defaultValue) {
        if (Cookies.init === false)
            Cookies.initialize();
        const val = Cookies.db[cookieID];
        if (val !== undefined) return val;
        return defaultValue;
    }

    static setValue(cookieID, value) {
        Cookies.db[cookieID] = value;
        // document.cookie property sets only one cookie at a time
        document.cookie = `${cookieID}=${value};` 
        console.log('Set ' + cookieID + ' to ' + value);
    }
}