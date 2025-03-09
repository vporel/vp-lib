import { BoxProps, FormControlLabelProps, TypographyProps } from "@mui/material";
import { SelectOption } from "./forms.types";
export type MultipleCheckboxesFieldProps = Omit<BoxProps, "onChange"> & {
    value: any;
    onChange: (values: any[]) => void;
    items: SelectOption[];
    itemTypographyProps?: TypographyProps;
    formControlLabelProps?: FormControlLabelProps;
    styled?: boolean;
    column?: boolean;
    maxToShow?: number;
};
export default function MultipleCheckboxesField({ value, onChange, items, itemTypographyProps, formControlLabelProps, styled, column, sx, flexDirection, maxToShow, ...props }: MultipleCheckboxesFieldProps): import("react/jsx-runtime").JSX.Element;
