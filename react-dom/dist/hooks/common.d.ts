export declare function useBooleanState(defaultValue?: boolean): [value: boolean, set: () => void, reset: () => void, toggle: () => void];
export declare function useToggle(defaultValue?: boolean): [value: boolean, toggle: () => void];
/**
 *
 * @param breakpoints Breakpoints in pixels, each number is the minimum for the level,
 * @returns
 */
export declare function useScreenSize(breakpoints?: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
}): {
    xs: boolean;
    sm: boolean;
    md: boolean;
    lg: boolean;
    xl: boolean;
    xxl: boolean;
};
/**
 *
 * @returns key, refreshKey()
 */
export declare function useRefreshKey(): [value: number, refresh: () => void];
