'use client'

import { useCallback, useState } from "react"

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

type SearchFiltersOptions<K extends string> = {
    transform?: {[key in K]: (val: any) => any},
    transformToArray?: K[]                                //The keys to transform to array
    transformToInteger?: K[]                                //The keys to transform to integer
}

function parseSearchParamsForFilters(keys: string[], searchParams: any, defaultFilters: any, options?: SearchFiltersOptions<any>){
    const {transform, transformToArray, transformToInteger} = {...options}
    const values: any = {page: searchParams.get("page") ?? 1}
    for(const k of keys){
        if(!searchParams.get(k)) values[k] = defaultFilters[k]
        else{
            if(transform) values[k] = 
                transform[k](searchParams.get(k))
            else if(transformToArray && transformToArray.includes(k))
                values[k] = searchParams.get(k)?.split(',').filter((el: any) => el != "").map((el: any) => (transformToInteger && transformToInteger.includes(k)) ? parseInt(el) : el)
            else if(transformToInteger && transformToInteger.includes(k))
                values[k] = parseInt(searchParams.get(k) ?? "0")
        }
    }
    return values
}

/**
 * 
 * @param breakpoints Breakpoints in pixels, each number is the minimum for the level, 
 * @returns 
 */
export function useScreenSize(breakpoints: {sm: number, md: number, lg: number, xl: number, xxl: number} = {sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 }): {xs: boolean, sm: boolean, md: boolean, lg: boolean, xl: boolean, xxl: boolean}{
    const xs = window.innerWidth < breakpoints.sm
    const sm = !xs && window.innerWidth < breakpoints.md
    const md = !sm && window.innerWidth < breakpoints.lg
    const lg = !md && window.innerWidth < breakpoints.xl
    const xl = !lg && window.innerWidth < breakpoints.xxl
    const xxl = !xl 

    return {xs, sm, md, lg, xl, xxl}
}

/**
 * 
 * @returns key, refreshKey()
 */
export function useRefreshKey(): [value: number, refresh: () => void]{
    const [key, setKey] = useState(Math.random)

    return [key, useCallback(() => setKey(Math.random()), [])]
}