import React, { useEffect } from "react"
import { Box, BoxProps, IconButton, Modal as MuiModal, Typography } from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"

/**
 * Mui modal with a predefined style
 * @param param0 
 * @returns 
 */
export default function Modal(
    {open, onClose, sx, children, title, closeButton = true, fullscreenOnMobile = false, width, height, ...props}: 
    BoxProps & {open: boolean, onClose: any, closeButton?: boolean, width?: number|string, height?: number|string, fullscreenOnMobile?: boolean}
){
    useEffect(() => {
        document.body.style.overflowY = open ? "hidden" : "auto"
    }, [open])

    return <MuiModal open={open} onClose={onClose} >
        <Box sx={{
            outline: "none",
            background: "white", 
            borderRadius: {xs: fullscreenOnMobile ? "0" : "10px", md: "10px"}, 
            p: {xs: 3, md: 3.5}, boxShadow: "0 0 5px rgba(0, 0, 0, .3)",
            position: 'absolute',
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: width ?? {xs: fullscreenOnMobile ? "100%" : "90%", md: "auto"},
            height: height ?? {xs: fullscreenOnMobile ? "100%" : "auto", md: "auto"}, 
            ...sx
        }} {...props}>
            {(title || closeButton) && <Box display="flex" justifyContent="space-between" alignItems={{xs: fullscreenOnMobile ? "start" : "center", md: "center"}} mb={2}>
                <Typography variant="h3">{title}</Typography>
                {closeButton && <IconButton onClick={onClose}><CloseIcon sx={{width: 25, height: 25}}/></IconButton>}
            </Box>}
            {children}
        </Box>
    </MuiModal>
    
}