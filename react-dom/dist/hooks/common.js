'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRefreshKey = exports.useScreenSize = exports.useToggle = exports.useBooleanState = void 0;
const react_1 = require("react");
const material_1 = require("@mui/material");
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
function useScreenSize() {
    const theme = (0, material_1.useTheme)();
    const xs = (0, material_1.useMediaQuery)(theme.breakpoints.down("sm"));
    const sm = (0, material_1.useMediaQuery)(theme.breakpoints.between("sm", "md"));
    const md = (0, material_1.useMediaQuery)(theme.breakpoints.between("md", "lg"));
    const lg = (0, material_1.useMediaQuery)(theme.breakpoints.between("lg", "xl"));
    const xl = (0, material_1.useMediaQuery)(theme.breakpoints.up("xl"));
    return { xs, sm, md, lg, xl };
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
