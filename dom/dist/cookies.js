'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookie = exports.getCookie = void 0;
function getCookie(key) {
    var cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        if (cookie.trim().startsWith(key + '='))
            return cookie.split("=")[1];
    }
    return null;
}
exports.getCookie = getCookie;
/**
 *
 * @param key
 * @param value
 * @param expiresIn in seconds
 */
function setCookie(key, value, expiresIn) {
    var date = new Date();
    date.setTime(date.getTime() + expiresIn);
    document.cookie = key + '=' + value + '; expires=' + date.toUTCString();
}
exports.setCookie = setCookie;
