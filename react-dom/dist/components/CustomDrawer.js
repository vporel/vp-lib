'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const SwipeableDrawerPuller_1 = require("./SwipeableDrawerPuller");
const FlexBox_1 = require("./FlexBox");
const common_1 = require("../hooks/common");
const Close_1 = require("@mui/icons-material/Close");
function CustomDrawer({ onOpen, open, onClose, title, mdWidth, children, closeButton = true, paperSx }) {
    const screenSize = (0, common_1.useScreenSize)();
    return (0, jsx_runtime_1.jsx)(material_1.SwipeableDrawer, { onOpen: onOpen ? onOpen : () => { }, anchor: screenSize.xs ? "bottom" : "right", open: open, onClose: onClose, PaperProps: {
            sx: { pt: 1, borderRadius: { xs: "15px 15px 0 0", md: "15px 0 0 15px" }, overflowX: "hidden", ...paperSx }
        }, children: (0, jsx_runtime_1.jsxs)(material_1.Box, { p: 2.5, width: { xs: "100%", md: mdWidth ?? "600px" }, height: "100%", sx: { position: "relative" }, children: [screenSize.xs && (0, jsx_runtime_1.jsx)(SwipeableDrawerPuller_1.default, {}), (title || closeButton) && (0, jsx_runtime_1.jsxs)(FlexBox_1.default, { between: true, centerVertical: true, mt: 1, mb: 2, sx: { width: "100%", position: title ? "relative" : "absolute", ml: title ? 0 : -3 }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h3", children: title }), (closeButton && !screenSize.xs) && (0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: e => {
                                e.preventDefault();
                                e.stopPropagation();
                                onClose();
                            }, children: (0, jsx_runtime_1.jsx)(Close_1.default, {}) })] }), children] }) });
}
exports.default = CustomDrawer;
