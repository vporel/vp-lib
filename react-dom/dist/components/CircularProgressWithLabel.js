'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const CircularProgress_1 = require("@mui/material/CircularProgress");
const Typography_1 = require("@mui/material/Typography");
const Box_1 = require("@mui/material/Box");
function CircularProgressWithLabel({ labelProps, ...props }) {
    return ((0, jsx_runtime_1.jsxs)(Box_1.default, { sx: { position: 'relative', display: 'inline-flex' }, children: [(0, jsx_runtime_1.jsx)(CircularProgress_1.default, { variant: "determinate", ...props }), (0, jsx_runtime_1.jsx)(Box_1.default, { sx: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(Typography_1.default, { variant: "caption", component: "div", color: "text.secondary", ...labelProps, children: `${Math.round(props.value)}%` }) })] }));
}
exports.default = CircularProgressWithLabel;
