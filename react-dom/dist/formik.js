"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formikCheckboxProps = exports.formikFieldProps = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
function formikFieldProps(formikProps, field, label, options = {}) {
    const { placeholder, defaultHelperText, startIcon, endIcon, onChangeValue, transform } = options;
    const fieldMeta = formikProps.getFieldMeta(field);
    const props = {
        label, name: field, value: fieldMeta.value, placeholder,
        onChange: (e) => {
            let value = ((typeof e == "object") && e.target) ? e.target.value : e;
            if (transform)
                value = transform(value);
            formikProps.setFieldValue(field, value);
            if (onChangeValue)
                onChangeValue(value);
        },
        onBlur: formikProps.handleBlur,
        error: fieldMeta.error && fieldMeta.touched
    };
    props.helperText = props.error ? fieldMeta.error : defaultHelperText;
    if (startIcon || endIcon) {
        props.InputProps = {
            startAdornment: startIcon && (0, jsx_runtime_1.jsx)(material_1.InputAdornment, { position: "start", children: startIcon }),
            endAdornment: endIcon && (0, jsx_runtime_1.jsx)(material_1.InputAdornment, { position: "end", children: endIcon })
        };
    }
    return props;
}
exports.formikFieldProps = formikFieldProps;
function formikCheckboxProps(formikProps, field, options = {}) {
    const { onChangeValue } = options;
    const fieldMeta = formikProps.getFieldMeta(field);
    const props = {
        name: field, checked: fieldMeta.value === true || fieldMeta.value == "true",
        onChange: (e) => {
            const value = e.target.checked;
            formikProps.setFieldValue(field, value);
            if (onChangeValue)
                onChangeValue(value);
        },
        onBlur: formikProps.handleBlur,
        error: fieldMeta.error && fieldMeta.touched
    };
    return props;
}
exports.formikCheckboxProps = formikCheckboxProps;
