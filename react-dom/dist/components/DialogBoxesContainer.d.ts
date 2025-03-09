import { TextFieldProps } from "@mui/material";
type DialogParams = {
    title?: string;
    detail: string;
    onValidate: () => boolean;
    validateButton?: {
        label?: string;
    };
    onCancel?: () => void;
    cancelButton?: {
        label?: string;
    };
};
type InputDialogParams = DialogParams & {
    fieldProps?: TextFieldProps;
};
export declare function alert(options: Omit<DialogParams, "onCancel" | "cancelButton">): void;
export declare function confirm(options: DialogParams): void;
export declare namespace confirm {
    var yesNo: (options: DialogParams) => void;
}
export declare function promptText(options: InputDialogParams): void;
export declare function promptNumber(options: InputDialogParams): void;
export declare function promptTextarea(options: InputDialogParams): void;
export default function DialogBoxesContainer(): import("react/jsx-runtime").JSX.Element;
export {};
