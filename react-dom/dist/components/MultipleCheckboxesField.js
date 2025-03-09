'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_1 = require("react");
const FlexBox_1 = require("./FlexBox");
function MultipleCheckboxesField({ value, onChange, items, itemTypographyProps, formControlLabelProps, styled = true, column, sx, flexDirection, maxToShow, ...props }) {
    const [choices, setChoices] = (0, react_1.useState)(value ?? []);
    const [allVisible, setAllVisible] = (0, react_1.useState)(false);
    const { sx: formControlLabelSx, ...formControlLabelPropsWithoutSx } = { ...formControlLabelProps };
    const formLabelStyle = (checked) => ({
        border: th => "2px solid " + (!checked ? "lightgray" : th.palette.primary.main),
        transition: "all .2s ease",
        borderRadius: "5px",
        px: 1.5, py: .5
    });
    const ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        setChoices(value);
    }, [value]);
    return (0, jsx_runtime_1.jsxs)(FlexBox_1.default, { ref: ref, sx: {
            display: "flex", flexWrap: "wrap",
            gap: styled ? 2 : 0,
            px: styled ? 2 : 0,
            flexDirection: column ? "column" : flexDirection,
            ...sx
        }, ...props, children: [items.map((el, index) => {
                const checked = choices.includes(el.value);
                return (!maxToShow || index < maxToShow || allVisible) && (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { label: el.label, sx: ({
                        ...(styled ? formLabelStyle(checked) : undefined),
                        ...formControlLabelSx
                    }), control: (0, jsx_runtime_1.jsx)(material_1.Checkbox, { checked: checked, onChange: e => {
                            setChoices(vals => {
                                let newVals = [...vals];
                                if (e.target.checked) {
                                    if (!choices.includes(el.value))
                                        newVals = [...newVals, el.value];
                                }
                                else
                                    newVals = newVals.filter(v => v != el.value);
                                onChange(newVals);
                                return newVals;
                            });
                        } }), componentsProps: { typography: itemTypographyProps }, ...formControlLabelPropsWithoutSx }, el.value);
            }), (maxToShow && items.length > maxToShow) && (0, jsx_runtime_1.jsx)(material_1.Typography, { color: "primary", sx: { cursor: "pointer" }, onClick: () => setAllVisible(v => !v), children: !allVisible ? "Voir plus (" + (items.length - maxToShow) + ")" : "Voir moins" })] });
}
exports.default = MultipleCheckboxesField;
