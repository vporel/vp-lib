'use client'
import { Box, IconButton, PaperProps, SwipeableDrawer, SxProps, Theme, Typography } from "@mui/material"
import Puller from "./SwipeableDrawerPuller"
import { ReactNode, useContext } from "react"
import FlexBox from "./FlexBox"
import { useScreenSize } from "../hooks/common"
import CloseIcon from "@mui/icons-material/Close"

export default function CustomDrawer(
    {onOpen, open, onClose, title, mdWidth, children, closeButton = true, paperSx}: 
    {
        onOpen?: () => void, open: boolean, onClose: () => void, title?: string, mdWidth?: string, children: ReactNode,
        closeButton?: boolean, paperSx?: SxProps<Theme>
    }
){
    const screenSize = useScreenSize()

    return <SwipeableDrawer 
        onOpen={onOpen ? onOpen : () => {}} anchor={screenSize.xs ? "bottom" : "right"} open={open} onClose={onClose}
        slotProps={{
            paper: {sx: {pt: 1, borderRadius: {xs: "15px 15px 0 0", md: "15px 0 0 15px"}, overflowX: "hidden", ...paperSx}}
        }}
    >
        <Box p={2.5} width={{xs: "100%", md: mdWidth ?? "600px"}} height="100%" sx={{position: "relative"}}>
            {screenSize.xs && <Puller />}
            {(title || closeButton) &&<FlexBox between centerVertical mt={1} mb={2} sx={{width: "100%", position: title ? "relative" : "absolute", ml: title ? 0 : -3}}>
                <Typography variant="h3">{title}</Typography>
                {(closeButton && !screenSize.xs) && <IconButton onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    onClose()
                }}>
                    <CloseIcon />
                </IconButton>}
            </FlexBox>}
            {children}
        </Box>
    </SwipeableDrawer>
}