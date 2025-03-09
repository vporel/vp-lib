'use client'
import { SxProps, Tooltip, TooltipProps } from "@mui/material";

export function LightTooltip({sx, componentsProps, children, ...props}: TooltipProps & {sx: SxProps}){
    return <Tooltip componentsProps={{
        tooltip: {sx: {background: "white", boxShadow: "0 0 2px rgba(0, 0, 0, .3)", color: "gray", ...sx}}
    }} {...props}>
        {children}
    </Tooltip>
}