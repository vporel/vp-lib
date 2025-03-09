'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
function CustomRadioGroupWithDetails({ label, name, value, onChange, error, options }) {
    return (0, jsx_runtime_1.jsxs)(material_1.Box, { children: [label && (0, jsx_runtime_1.jsx)(material_1.FormLabel, { sx: { mb: 1, display: "block" }, children: label }), (0, jsx_runtime_1.jsx)(material_1.RadioGroup, { name: name, value: value, onChange: (e, newValue) => { if (onChange)
                    onChange(newValue); }, children: (0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, spacing: 2, children: options.map(opt => {
                        const selected = opt.value == value;
                        return (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: opt.gridOptions?.xs || 12, sm: opt.gridOptions?.sm, md: opt.gridOptions?.md, lg: opt.gridOptions?.lg, children: (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { value: opt.value, sx: {
                                    background: "white", borderRadius: "10px", transition: "all .3s ease",
                                    border: theme => "2px solid " + (selected ? theme.palette.primary.main : "lightgray"),
                                    p: 2, m: 0, display: "flex", gap: .5,
                                    boxShadow: selected ? "0 0 3px rgba(0, 0, 0, .5)" : "none", alignItems: "start",
                                    "&:hover": {
                                        borderColor: theme => theme.palette.primary.main,
                                        boxShadow: "0 0 3px rgba(0, 0, 0, .5)"
                                    }
                                }, control: (0, jsx_runtime_1.jsx)(material_1.Radio, {}), label: (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex", flexDirection: "column", gap: 1, pt: 1.2, height: "auto" }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { sx: { fontWeight: selected ? "bold" : "normal" }, children: opt.label }), (opt.detail && selected) && (0, jsx_runtime_1.jsx)(material_1.Fade, { in: selected, children: (0, jsx_runtime_1.jsx)(material_1.Box, { mb: 1, ml: { xs: "-40px", md: 0 }, children: opt.detail }) })] }), slotProps: { typography: { display: "block", width: "100%" } } }) }, opt.label);
                    }) }) }), error && (0, jsx_runtime_1.jsx)(material_1.Typography, { color: "#d32f2f", fontSize: "0.85rem", fontWeight: "400", mt: .5, children: "Choisir une option" })] });
}
exports.default = CustomRadioGroupWithDetails;
