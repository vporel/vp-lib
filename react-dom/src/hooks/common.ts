'use client'

import { useCallback, useState, useEffect } from "react"

export function useBooleanState(defaultValue: boolean = false): [value: boolean, set: () => void, reset: () => void, toggle: () => void]{
    const [value, setValue] = useState(defaultValue)
    return [
        value, 
        () => setValue(true),  
        () => setValue(false),
        () => setValue(v => !v) 
    ]
}

export function useToggle(defaultValue: boolean = false): [value: boolean, toggle: () => void]{
    const [value, setValue] = useState(defaultValue)
    return [
        value, 
        () => setValue(v => !v) 
    ]
}

/**
 * 
 * @param breakpoints Breakpoints in pixels, each number is the minimum for the level, 
 * @returns 
 */
export function useScreenSize(breakpoints: {sm: number, md: number, lg: number, xl: number, xxl: number} = {sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 }): {xs: boolean, sm: boolean, md: boolean, lg: boolean, xl: boolean, xxl: boolean}{
    const getSize = () => {
        if (typeof window === 'undefined') return null;
        const width = window.innerWidth;
        return {
          xs: width < breakpoints.sm,
          sm: width >= breakpoints.sm && width < breakpoints.md,
          md: width >= breakpoints.md && width < breakpoints.lg,
          lg: width >= breakpoints.lg && width < breakpoints.xl,
          xl: width >= breakpoints.xl && width < breakpoints.xxl,
          xxl: width >= breakpoints.xxl,
        };
    };
    const [size, setSize] = useState(getSize);

    useEffect(() => {
        function handleResize() {
          setSize(getSize());
        }
    
        if (typeof window !== 'undefined') {
          handleResize();
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
        }
      }, []);
    return size ?? { xs: false, sm: false, md: false, lg: false, xl: false, xxl: false };
}

/**
 * 
 * @returns key, refreshKey()
 */
export function useRefreshKey(): [value: number, refresh: () => void]{
    const [key, setKey] = useState(Math.random)

    return [key, useCallback(() => setKey(Math.random()), [])]
}