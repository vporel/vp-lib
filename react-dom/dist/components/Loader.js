'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
function Loader({ size = 35, color = "primary", children, ...props }) {
    return (0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", justifyContent: "center", alignItems: "center", gap: 1, flexDirection: "column", ...props, children: [(0, jsx_runtime_1.jsx)(material_1.CircularProgress, { size: size, sx: {
                    color: theme => ["primary", "secondary"].includes(color) ? theme.palette[color].main : color
                } }), children && (0, jsx_runtime_1.jsx)(material_1.Box, { children: children })] });
}
exports.default = Loader;
