'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const CircularProgress_1 = require("@mui/material/CircularProgress");
const Box_1 = require("@mui/material/Box");
function SemiCircularProgress({ value, size, ...props }) {
    const sizeParsed = size ? parseInt(size + "") : 40; //px
    return (0, jsx_runtime_1.jsx)(Box_1.default, { sx: {
            position: "relative",
            display: "inline-flex",
            width: sizeParsed,
            height: (sizeParsed / 2) + "px",
            overflow: "hidden",
        }, children: (0, jsx_runtime_1.jsx)(Box_1.default, { sx: {
                position: "absolute",
                display: "inline-flex",
                top: 0,
                left: 0,
                transform: "rotate(-90deg)"
            }, children: (0, jsx_runtime_1.jsx)(CircularProgress_1.default, { variant: "determinate", value: value / 2, size: size, ...props }) }) });
}
exports.default = SemiCircularProgress;
