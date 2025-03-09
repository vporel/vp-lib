"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const icons_material_1 = require("@mui/icons-material");
/**
 * Mui modal with a predefined style
 * @param param0
 * @returns
 */
function Modal({ open, onClose, sx, children, title, closeButton = true, fullscreenOnMobile = false, width, height, ...props }) {
    (0, react_1.useEffect)(() => {
        document.body.style.overflowY = open ? "hidden" : "auto";
    }, [open]);
    return (0, jsx_runtime_1.jsx)(material_1.Modal, { open: open, onClose: onClose, children: (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                outline: "none",
                background: "white",
                borderRadius: { xs: fullscreenOnMobile ? "0" : "10px", md: "10px" },
                p: { xs: 3, md: 3.5 }, boxShadow: "0 0 5px rgba(0, 0, 0, .3)",
                position: 'absolute',
                top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: width ?? { xs: fullscreenOnMobile ? "100%" : "90%", md: "auto" },
                height: height ?? { xs: fullscreenOnMobile ? "100%" : "auto", md: "auto" },
                ...sx
            }, ...props, children: [(title || closeButton) && (0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", justifyContent: "space-between", alignItems: { xs: fullscreenOnMobile ? "start" : "center", md: "center" }, mb: 2, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h3", children: title }), closeButton && (0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: onClose, children: (0, jsx_runtime_1.jsx)(icons_material_1.Close, { sx: { width: 25, height: 25 } }) })] }), children] }) });
}
exports.default = Modal;
