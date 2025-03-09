'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightTooltip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
function LightTooltip({ sx, componentsProps, children, ...props }) {
    return (0, jsx_runtime_1.jsx)(material_1.Tooltip, { componentsProps: {
            tooltip: { sx: { background: "white", boxShadow: "0 0 2px rgba(0, 0, 0, .3)", color: "gray", ...sx } }
        }, ...props, children: children });
}
exports.LightTooltip = LightTooltip;
