'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkSecondary = exports.LinkPrimary = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const link_1 = require("next/link");
function LinkPrimary({ href, children, ...props }) {
    return (0, jsx_runtime_1.jsx)(material_1.Typography, { component: link_1.default, href: href, color: "primary", ...props, children: children });
}
exports.LinkPrimary = LinkPrimary;
function LinkSecondary({ href, children, ...props }) {
    return (0, jsx_runtime_1.jsx)(material_1.Typography, { component: link_1.default, href: href, color: "secondary", ...props, children: children });
}
exports.LinkSecondary = LinkSecondary;
