'use client'

import { useCallback, useState } from "react"
import { useMediaQuery, useTheme } from "@mui/material"

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

export function useScreenSize(): {xs: boolean, sm: boolean, md: boolean, lg: boolean, xl: boolean}{
    const theme = useTheme()
    const xs = useMediaQuery(theme.breakpoints.down("sm"))
    const sm = useMediaQuery(theme.breakpoints.between("sm", "md"))
    const md = useMediaQuery(theme.breakpoints.between("md", "lg"))
    const lg = useMediaQuery(theme.breakpoints.between("lg", "xl"))
    const xl = useMediaQuery(theme.breakpoints.up("xl"))

    return {xs, sm, md, lg, xl}
}

/**
 * 
 * @returns key, refreshKey()
 */
export function useRefreshKey(): [value: number, refresh: () => void]{
    const [key, setKey] = useState(Math.random)

    return [key, useCallback(() => setKey(Math.random()), [])]
}