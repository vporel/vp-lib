'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const colors_1 = require("@mui/material/colors");
const SwipeableDrawerPuller = (0, material_1.styled)('div')(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? colors_1.grey[300] : colors_1.grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));
exports.default = SwipeableDrawerPuller;
