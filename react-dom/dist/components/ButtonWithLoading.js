'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Loader_1 = require("./Loader");
function ButtonWithLoading({ loading, ...props }) {
    return (0, jsx_runtime_1.jsx)(material_1.Button, { startIcon: loading && (0, jsx_runtime_1.jsx)(Loader_1.default, { size: 20, color: "white" }), ...props });
}
exports.default = ButtonWithLoading;
