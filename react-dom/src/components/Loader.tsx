'use client'
import { Box, BoxProps, CircularProgress } from "@mui/material"
import React, { ReactNode } from "react"

export default function Loader({size = 35, color = "primary", children, ...props}: BoxProps & {size?: number, color?: string}){
    return <Box display="flex" justifyContent="center" alignItems="center" gap={1} flexDirection="column" {...props}>
        <CircularProgress size={size} sx={{
            color: theme => ["primary", "secondary"].includes(color) ? theme.palette[color].main : color
        }}/>
        {children && <Box>{children}</Box>}
    </Box>
}