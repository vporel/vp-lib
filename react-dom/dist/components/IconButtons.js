'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconButtonFavorite = exports.IconButtonTip = exports.IconButtonDelete = exports.IconButtonEdit = exports.IconButtonAdd = exports.IconButtonClose = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Close_1 = require("@mui/icons-material/Close");
const Add_1 = require("@mui/icons-material/Add");
const Edit_1 = require("@mui/icons-material/Edit");
const Delete_1 = require("@mui/icons-material/Delete");
const ErrorOutline_1 = require("@mui/icons-material/ErrorOutline");
const FavoriteBorder_1 = require("@mui/icons-material/FavoriteBorder");
const Favorite_1 = require("@mui/icons-material/Favorite");
const material_1 = require("@mui/material");
const link_1 = require("next/link");
function IconButtonClose({ iconProps, onClick, ...props }) {
    return (0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: e => {
            e.preventDefault();
            e.stopPropagation();
            if (onClick)
                onClick(e);
        }, ...props, children: (0, jsx_runtime_1.jsx)(Close_1.default, { ...iconProps }) });
}
exports.IconButtonClose = IconButtonClose;
function IconButtonAdd({ iconProps, onClick, ...props }) {
    return (0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: e => {
            if (props.component != link_1.default && props.LinkComponent != link_1.default) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (onClick)
                onClick(e);
        }, ...props, children: (0, jsx_runtime_1.jsx)(Add_1.default, { ...iconProps }) });
}
exports.IconButtonAdd = IconButtonAdd;
function IconButtonEdit({ iconProps, onClick, ...props }) {
    return (0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: e => {
            if (props.component != link_1.default && props.LinkComponent != link_1.default) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (onClick)
                onClick(e);
        }, ...props, children: (0, jsx_runtime_1.jsx)(Edit_1.default, { ...iconProps }) });
}
exports.IconButtonEdit = IconButtonEdit;
function IconButtonDelete({ iconProps, onClick, ...props }) {
    return (0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: e => {
            if (props.component != link_1.default && props.LinkComponent != link_1.default) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (onClick)
                onClick(e);
        }, ...props, children: (0, jsx_runtime_1.jsx)(Delete_1.default, { ...iconProps }) });
}
exports.IconButtonDelete = IconButtonDelete;
function IconButtonTip({ iconProps, onClick, ...props }) {
    return (0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: e => {
            e.preventDefault();
            e.stopPropagation();
            if (onClick)
                onClick(e);
        }, ...props, children: (0, jsx_runtime_1.jsx)(ErrorOutline_1.default, { ...iconProps }) });
}
exports.IconButtonTip = IconButtonTip;
function IconButtonFavorite({ iconProps, onClick, filled, ...props }) {
    return (0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: e => {
            e.preventDefault();
            e.stopPropagation();
            if (onClick)
                onClick(e);
        }, ...props, children: !filled
            ? (0, jsx_runtime_1.jsx)(FavoriteBorder_1.default, { ...iconProps })
            : (0, jsx_runtime_1.jsx)(Favorite_1.default, { ...iconProps }) });
}
exports.IconButtonFavorite = IconButtonFavorite;
