'use client'

export function getCookie(key: string) {
    var cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        if (cookie.trim().startsWith(key + '=')) 
            return cookie.split("=")[1]
    }
    return null;
}

/**
 * 
 * @param key 
 * @param value 
 * @param expiresIn in seconds
 */
export function setCookie(key: string, value: string, expiresIn: number) {
    var date = new Date();
    date.setTime(date.getTime() + expiresIn)
    document.cookie = key + '=' + value + '; expires=' + date.toUTCString()
}