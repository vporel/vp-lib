'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_1 = require("react");
const uniqid_1 = require("uniqid");
function EditableSelectField({ options, groups = true, sort = true, exclude, required, fullWidth, label, name, value, onChange, onBlur, helperText, error, variant = "outlined", InputProps, className, ...props }) {
    const _options = (0, react_1.useMemo)(() => {
        return options.filter(opt => exclude ? !exclude.includes(opt.value) : true);
    }, [options, exclude]);
    return (0, jsx_runtime_1.jsx)(material_1.Autocomplete, { id: (0, uniqid_1.default)(), fullWidth: fullWidth, options: sort ? _options.sort((a, b) => -b.label[0].localeCompare(a.label[0])) : _options, groupBy: groups ? ((option) => option.label[0]) : undefined, getOptionLabel: optionValue => {
            if (optionValue == undefined || optionValue === null)
                return "";
            if (typeof optionValue == "object")
                return optionValue.label;
            const option = _options.find(o => o.value == optionValue);
            return option ? option.label : "";
        }, className: className, value: value || null, inputValue: value ? _options.find(o => o.value == value)?.label : "", isOptionEqualToValue: (option, value) => option.value == value, onChange: (e, option) => {
            const customEventObject = { target: { name: name, value: option ? option.value : "" } }; //!!! Warning : Weird technique used because the handlers only need the name and the value of the target
            if (onChange)
                onChange(customEventObject);
        }, onBlur: (e) => {
            e.target.name = name;
            if (onBlur)
                onBlur(e);
        }, renderInput: (params) => (0, jsx_runtime_1.jsx)(material_1.TextField, { ...params, required: required, label: label, variant: variant, helperText: helperText, error: error, InputProps: { ...params.InputProps, ...InputProps } }), ...props });
}
exports.default = EditableSelectField;
