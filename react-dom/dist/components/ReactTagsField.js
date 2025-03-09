'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_1 = require("react");
const react_tag_autocomplete_1 = require("react-tag-autocomplete");
const uniqid_1 = require("uniqid");
function ReactTagsField({ options, label, name, value, onChange, placeholder, error, helperText, rounded, exclude, onBlur, ...props }) {
    const [selectedTags, setSelectedTags] = (0, react_1.useState)(options.filter(opt => value?.includes(opt.value)));
    const _options = (0, react_1.useMemo)(() => {
        if (!exclude)
            return options;
        else
            return options.filter(opt => !exclude.includes(opt.value));
    }, [options, exclude]);
    const onAdd = (0, react_1.useCallback)((newTag) => setSelectedTags((tags) => [...tags, newTag]), []);
    const onDelete = (0, react_1.useCallback)((tagIndex) => setSelectedTags((tags) => tags.filter((_, i) => i !== tagIndex)), []);
    (0, react_1.useEffect)(() => {
        //Simulate fields change event
        if (onChange)
            onChange({
                target: {
                    name,
                    value: selectedTags.map(t => t.value)
                }
            });
    }, [selectedTags]);
    return (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
            ".react-tags": {
                position: "relative", padding: "0.8rem 1rem 0.3rem 1rem", border: "1px solid #afb8c1", background: "#fff", lineHeight: "1.2", cursor: "text",
                borderRadius: rounded ? "30px" : "5px"
            },
            ".react-tags.is-active": { borderColor: theme => theme.palette.primary.main },
            ".react-tags.is-disabled": { opacity: .75, backgroundColor: "#eaeef2", pointerEvents: "none", cursor: "not-allowed" },
            ".react-tags.is-invalid": { borderColor: "#fd5956", boxShadow: "0 0 0 2px #fd565340" },
            ".react-tags__label": { display: "none" },
            ".react-tags__list": { display: "inline", padding: 0 },
            ".react-tags__list-item": { display: "inline", listStyle: "none" },
            ".react-tags__tag": { margin: "0 .5rem .5rem 0", padding: ".375rem .5rem", border: 0, borderRadius: "3px", background: "#eaeef2", fontSize: "inherit", lineHeight: "inherit" },
            ".react-tags__tag:hover": { color: "#fff", backgroundColor: theme => theme.palette.primary.main },
            ".react-tags__tag::after": { content: '""', display: "inline-block", width: ".65rem", height: ".65rem", clipPath: "polygon(10% 0,0 10%,40% 50%,0 90%,10% 100%,50% 60%,90% 100%,100% 90%,60% 50%,100% 10%,90% 0,50% 40%)", marginLeft: ".5rem", fontSize: ".875rem", backgroundColor: "#7c7d86" },
            ".react-tags__tag:hover:after": { backgroundColor: "#fff" },
            ".react-tags__combobox": { display: "inline-block", padding: ".375rem .25rem", marginBottom: ".25rem", maxWidth: "100%" },
            ".react-tags__combobox-input": { maxWidth: "100%", margin: 0, padding: 0, border: 0, outline: "none", background: "none", fontSize: "inherit", lineHeight: "inherit" },
            ".react-tags__combobox-input::placeholder": { color: "#7c7d86", opacity: 1 },
            ".react-tags__listbox": { position: "absolute", zIndex: 2, top: "calc(100% + 5px)", left: "-2px", right: "-2px", maxHeight: "12.5rem", overflowY: "auto", background: "#fff", border: "1px solid #afb8c1", borderRadius: "6px", boxShadow: "#0000001a 0 10px 15px -4px, #0000000d 0 4px 6px -2px" },
            ".react-tags__listbox-option": { padding: ".375rem .5rem" },
            ".react-tags__listbox-option:hover": { cursor: "pointer", background: th => (0, material_1.alpha)(th.palette.primary.main, .07) },
            ".react-tags__listbox-option:not([aria-disabled=true]).is-active": { background: "rgb(210, 210, 210)" },
            ".react-tags__listbox-option[aria-disabled=true]": { color: "#7c7d86", cursor: "not-allowed", pointerEvents: "none" },
            ".react-tags__listbox-option[aria-selected=true]:after": { content: '"✓"', position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" },
            ".react-tags__listbox-option[aria-selected=true]:not(.is-active):after": { color: "#4f46e5" },
            ".react-tags__listbox-option-highlight": { backgroundColor: "#fd0" }
        }, children: [label && (0, jsx_runtime_1.jsx)(material_1.FormLabel, { sx: { mb: .5, display: "block" }, children: label }), (0, jsx_runtime_1.jsx)(react_tag_autocomplete_1.ReactTags, { id: (0, uniqid_1.default)(), placeholderText: placeholder ?? "...", onBlur: undefined, selected: selectedTags, suggestions: _options, onAdd: onAdd, onDelete: onDelete, renderOption: ({ option, classNames, ...optionProps }) => {
                    const classes = [
                        classNames.option,
                        option.active ? 'is-active' : '',
                        option.selected ? 'is-selected' : '',
                    ];
                    return (0, jsx_runtime_1.jsxs)(material_1.Box, { className: classes.join(' '), sx: { position: "relative" }, ...optionProps, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { fontSize: 14, children: option.label }), option.helperText && (0, jsx_runtime_1.jsx)(material_1.Typography, { fontSize: 11, children: option.helperText })] });
                }, noOptionsText: "Aucun r\u00E9sultat", ...props }), helperText ?
                (0, jsx_runtime_1.jsx)(material_1.Typography, { color: error ? "#d32f2f" : "inherit", fontSize: "0.75rem", fontWeight: "400", mt: .5, children: helperText })
                : ""] });
}
exports.default = ReactTagsField;
