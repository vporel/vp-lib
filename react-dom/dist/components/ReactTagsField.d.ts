import { SelectOption } from "./forms.types";
export type ReactTagsFieldProps = {
    label?: string;
    name?: string;
    value?: any[];
    onChange?: (e: any) => void;
    placeholder?: string;
    error?: boolean;
    helperText?: string;
    rounded?: boolean;
    allowNew?: boolean;
    newOptionText?: string;
    onBlur?: (e: any) => void;
    exclude?: any[];
};
export type ReactTagsFieldPropsWithOptions = ReactTagsFieldProps & {
    options: SelectOption[];
};
export default function ReactTagsField({ options, label, name, value, onChange, placeholder, error, helperText, rounded, exclude, onBlur, ...props }: ReactTagsFieldPropsWithOptions): import("react/jsx-runtime").JSX.Element;
