'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRefreshKey = exports.useScreenSize = exports.useToggle = exports.useBooleanState = void 0;
const react_1 = require("react");
function useBooleanState(defaultValue = false) {
    const [value, setValue] = (0, react_1.useState)(defaultValue);
    return [
        value,
        () => setValue(true),
        () => setValue(false),
        () => setValue(v => !v)
    ];
}
exports.useBooleanState = useBooleanState;
function useToggle(defaultValue = false) {
    const [value, setValue] = (0, react_1.useState)(defaultValue);
    return [
        value,
        () => setValue(v => !v)
    ];
}
exports.useToggle = useToggle;
function parseSearchParamsForFilters(keys, searchParams, defaultFilters, options) {
    const { transform, transformToArray, transformToInteger } = { ...options };
    const values = { page: searchParams.get("page") ?? 1 };
    for (const k of keys) {
        if (!searchParams.get(k))
            values[k] = defaultFilters[k];
        else {
            if (transform)
                values[k] =
                    transform[k](searchParams.get(k));
            else if (transformToArray && transformToArray.includes(k))
                values[k] = searchParams.get(k)?.split(',').filter((el) => el != "").map((el) => (transformToInteger && transformToInteger.includes(k)) ? parseInt(el) : el);
            else if (transformToInteger && transformToInteger.includes(k))
                values[k] = parseInt(searchParams.get(k) ?? "0");
        }
    }
    return values;
}
/**
 *
 * @param breakpoints Breakpoints in pixels, each number is the minimum for the level,
 * @returns
 */
function useScreenSize(breakpoints = { sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 }) {
    const xs = window.innerWidth < breakpoints.sm;
    const sm = !xs && window.innerWidth < breakpoints.md;
    const md = !sm && window.innerWidth < breakpoints.lg;
    const lg = !md && window.innerWidth < breakpoints.xl;
    const xl = !lg && window.innerWidth < breakpoints.xxl;
    const xxl = !xl;
    return { xs, sm, md, lg, xl, xxl };
}
exports.useScreenSize = useScreenSize;
/**
 *
 * @returns key, refreshKey()
 */
function useRefreshKey() {
    const [key, setKey] = (0, react_1.useState)(Math.random);
    return [key, (0, react_1.useCallback)(() => setKey(Math.random()), [])];
}
exports.useRefreshKey = useRefreshKey;
