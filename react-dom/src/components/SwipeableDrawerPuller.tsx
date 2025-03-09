'use client'
import { styled } from "@mui/material";
import { grey } from "@mui/material/colors";

const SwipeableDrawerPuller = styled('div')(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));
export default SwipeableDrawerPuller