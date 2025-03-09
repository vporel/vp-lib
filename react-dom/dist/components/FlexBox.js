'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_1 = require("react");
const FlexBox = (0, react_1.forwardRef)(function ({ children, fullSize, between, around, end, center, centerHorizontal, centerVertical, wrap, justifyContent, alignItems, column, flexDirection, flexWrap, width, height, ...props }, ref) {
    return (0, jsx_runtime_1.jsx)(material_1.Box, { ref: ref, display: "flex", width: fullSize ? "100%" : width, height: fullSize ? "100%" : height, justifyContent: (center || centerHorizontal) ? "center" : (between ? "space-between" : (around ? "space-around" : (end ? "flex-end" : justifyContent))), alignItems: (center || centerVertical) ? "center" : alignItems, flexDirection: column ? "column" : flexDirection, flexWrap: wrap ? "wrap" : flexWrap, ...props, children: children });
});
exports.default = FlexBox;
