import { FormikProps } from 'formik';
import * as react from 'react';
import react__default, { ReactElement, ReactNode, ElementType } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as _mui_material from '@mui/material';
import { ButtonTypeMap, SxProps, Theme, TextFieldProps, TypographyProps as TypographyProps$1, BoxProps, FormControlLabelProps, TooltipProps } from '@mui/material';
import * as _mui_material_OverridableComponent from '@mui/material/OverridableComponent';
import { DefaultComponentProps } from '@mui/material/OverridableComponent';
import { CircularProgressProps } from '@mui/material/CircularProgress';
import { TypographyProps } from '@mui/material/Typography';
import { FileUploadError } from '@vporel/dom';
import * as _mui_system from '@mui/system';
import Cropper from 'cropperjs';

type FieldPropsOptions = {
    placeholder?: string;
    defaultHelperText?: string;
    startIcon?: any;
    endIcon?: any;
    onChangeValue?: (value: any) => void;
    transform?: (value: any) => any;
};
declare function formikFieldProps(formikProps: Omit<FormikProps<any>, "handleSubmit" | "isSubmitting">, field: string, label?: string, options?: FieldPropsOptions): {
    label?: string;
    name: string;
    value: any;
    placeholder?: string;
    onChange: (e: any) => void;
    onBlur: any;
    error: boolean;
    InputProps?: {
        startAdornment?: ReactElement;
        endAdornment?: ReactElement;
    };
};
type CheckboxPropsOptions = {
    onChangeValue?: (value: boolean) => void;
};
declare function formikCheckboxProps(formikProps: any, field: string, options?: CheckboxPropsOptions): any;

declare function ButtonWithLoading({ loading, ...props }: {
    loading: boolean;
} & DefaultComponentProps<ButtonTypeMap>): react_jsx_runtime.JSX.Element;

declare function CircularProgressWithLabel({ labelProps, ...props }: CircularProgressProps & {
    value: number;
    labelProps: TypographyProps;
}): react_jsx_runtime.JSX.Element;

declare function CustomDrawer({ onOpen, open, onClose, title, mdWidth, children, closeButton, paperSx }: {
    onOpen?: () => void;
    open: boolean;
    onClose: () => void;
    title?: string;
    mdWidth?: string;
    children: ReactNode;
    closeButton?: boolean;
    paperSx?: SxProps<Theme>;
}): react_jsx_runtime.JSX.Element;

type RadioOption = {
    value: any;
    label: string;
    detail?: string | react__default.JSX.Element;
    gridOptions?: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
    };
};
type CustomRadioGroupWithDetailsProps = {
    label?: string | ReactElement;
    name: string;
    value: any;
    onChange?: (value: any) => void;
    options: RadioOption[];
    error?: boolean;
};
declare function CustomRadioGroupWithDetails({ label, name, value, onChange, error, options }: CustomRadioGroupWithDetailsProps): react_jsx_runtime.JSX.Element;

type DialogParams = {
    title?: string;
    detail: string;
    onValidate: () => Promise<boolean>;
    validateButton?: {
        label?: string;
    };
    onCancel?: () => Promise<void>;
    cancelButton?: {
        label?: string;
    };
};
type InputDialogParams = DialogParams & {
    fieldProps?: TextFieldProps;
};
declare function alert(options: Omit<DialogParams, "onCancel" | "cancelButton">): void;
declare function confirm(options: DialogParams): void;
declare namespace confirm {
    var yesNo: (options: DialogParams) => void;
}
declare function promptText(options: InputDialogParams): void;
declare function promptNumber(options: InputDialogParams): void;
declare function promptTextarea(options: InputDialogParams): void;
declare function DialogBoxesContainer(): react_jsx_runtime.JSX.Element;

/**
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */
type SelectOption = {
    value: string | number;
    label: string;
    helperText?: string;
};

type EditableSelectFieldProps = {
    options: SelectOption[];
    groups?: boolean;
    sort?: boolean;
    exclude?: any[];
    required?: boolean;
    fullWidth?: boolean;
    label?: string;
    name: string;
    value?: any;
    onChange?: (value: any) => void;
    onBlur?: Function;
    helperText?: string;
    error?: boolean;
    variant?: "filled" | "outlined" | "standard";
    InputProps?: object;
    sx?: SxProps<Theme>;
    className?: string;
};
declare function EditableSelectField({ options, groups, sort, exclude, required, fullWidth, label, name, value, onChange, onBlur, helperText, error, variant, InputProps, className, ...props }: EditableSelectFieldProps): react_jsx_runtime.JSX.Element;

type FileData = {
    file: File;
    dataToUpload: File | Blob | null;
    src: any;
    progress: number;
};
declare function FilesUploader({ label, labelProps, compressImages, extensions, maxSize, showRequirements, showFilesNames, onFilesChange, onError, multiple }: {
    label?: string;
    labelProps?: TypographyProps$1;
    compressImages?: boolean;
    extensions: string[];
    /** In MB */
    maxSize?: number;
    showRequirements?: boolean;
    showFilesNames?: boolean;
    onFilesChange: (filesData: FileData[]) => void;
    onError?: (error: FileUploadError, file: File) => void;
    multiple?: boolean;
}): react_jsx_runtime.JSX.Element;

declare const FlexBox: react.ForwardRefExoticComponent<Omit<_mui_system.BoxOwnProps<_mui_material.Theme> & _mui_material_OverridableComponent.CommonProps & Omit<any, keyof _mui_material_OverridableComponent.CommonProps | keyof _mui_system.BoxOwnProps<_mui_material.Theme>> & {
    component?: React.ElementType;
} & {
    children?: react.ReactNode;
    component?: react.ElementType<any, keyof react.JSX.IntrinsicElements>;
} & {
    fullSize?: boolean;
    between?: boolean;
    around?: boolean;
    end?: boolean;
    center?: boolean;
    centerHorizontal?: boolean;
    centerVertical?: boolean;
    column?: boolean;
    wrap?: boolean;
}, "ref"> & react.RefAttributes<HTMLElement>>;

declare function ImageCropper({ imageSrc, cropperOptions, showZoomControls, canvasHeight, containerProps, saving, onValidate, validateButtonLabel, extraOptions, exportProps }: {
    imageSrc: string;
    cropperOptions?: Cropper.Options;
    showZoomControls?: boolean;
    canvasHeight: string | number | {
        xs: number | string;
        md: string | number;
    };
    containerProps?: BoxProps;
    saving?: boolean;
    onValidate: (blob: Blob | null) => any;
    validateButtonLabel?: string;
    extraOptions?: (cropper: Cropper | null) => {
        label: string;
        onClick: any;
    }[];
    exportProps?: {
        type?: 'image/jpeg' | 'image/png';
        quality?: number;
    };
}): react_jsx_runtime.JSX.Element;

declare function Loader({ size, color, children, ...props }: BoxProps & {
    size?: number;
    color?: string;
}): react_jsx_runtime.JSX.Element;

/**
 * Mui modal with a predefined style
 * @param param0
 * @returns
 */
declare function Modal({ open, onClose, sx, children, title, closeButton, fullscreenOnMobile, width, height, ...props }: BoxProps & {
    open: boolean;
    onClose: any;
    closeButton?: boolean;
    width?: number | string;
    height?: number | string;
    fullscreenOnMobile?: boolean;
}): react_jsx_runtime.JSX.Element;

type MultipleCheckboxesFieldProps = Omit<BoxProps, "onChange"> & {
    value: any;
    onChange: (values: any[]) => void;
    items: SelectOption[];
    itemTypographyProps?: TypographyProps$1;
    formControlLabelProps?: FormControlLabelProps;
    styled?: boolean;
    column?: boolean;
    maxToShow?: number;
};
declare function MultipleCheckboxesField({ value, onChange, items, itemTypographyProps, formControlLabelProps, styled, column, sx, flexDirection, maxToShow, ...props }: MultipleCheckboxesFieldProps): react_jsx_runtime.JSX.Element;

type ReactTagsFieldProps = {
    label?: string;
    name?: string;
    value?: any[];
    onChange?: (e: any) => void;
    required?: boolean;
    fullWidth?: boolean;
    placeholder?: string;
    error?: boolean;
    helperText?: string;
    rounded?: boolean;
    className?: string;
    allowNew?: boolean;
    newOptionText?: string;
    onBlur?: (e: any) => void;
    exclude?: any[];
};
type ReactTagsFieldPropsWithOptions = ReactTagsFieldProps & {
    options: SelectOption[];
};
declare function ReactTagsField({ options, label, name, value, onChange, required, fullWidth, placeholder, error, helperText, rounded, className, exclude, onBlur, ...props }: ReactTagsFieldPropsWithOptions): react_jsx_runtime.JSX.Element;

declare function SemiCircularProgress({ value, size, ...props }: CircularProgressProps & {
    value: number;
}): react_jsx_runtime.JSX.Element;

declare function SemiCircularProgressWithLabel({ labelProps, ...props }: CircularProgressProps & {
    value: number;
    labelProps: TypographyProps;
}): react_jsx_runtime.JSX.Element;

declare const SwipeableDrawerPuller: StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;

declare function LightTooltip({ sx, componentsProps, children, ...props }: TooltipProps & {
    sx: SxProps;
}): react_jsx_runtime.JSX.Element;

type CustomBoxProps<C extends ElementType = 'div'> = BoxProps<C> & {
    children?: ReactNode;
    component?: C;
};

declare function useGet<DataType>(serverFunctionCall: Function): [data: DataType | null | undefined, setData: (data: DataType) => void];
declare const ApiHooks: {
    useGet: typeof useGet;
};

declare function useBooleanState(defaultValue?: boolean): [value: boolean, set: () => void, reset: () => void, toggle: () => void];
declare function useToggle(defaultValue?: boolean): [value: boolean, toggle: () => void];
/**
 *
 * @param breakpoints Breakpoints in pixels, each number is the minimum for the level,
 * @returns
 */
declare function useScreenSize(breakpoints?: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
}): {
    xs: boolean;
    sm: boolean;
    md: boolean;
    lg: boolean;
    xl: boolean;
    xxl: boolean;
};
/**
 *
 * @returns key, refreshKey()
 */
declare function useRefreshKey(): [value: number, refresh: () => void];

export { ApiHooks, ButtonWithLoading, CircularProgressWithLabel, type CustomBoxProps, CustomDrawer, CustomRadioGroupWithDetails, type CustomRadioGroupWithDetailsProps, DialogBoxesContainer, EditableSelectField, type EditableSelectFieldProps, type FileData, FilesUploader, FlexBox, ImageCropper, LightTooltip, Loader, Modal, MultipleCheckboxesField, type MultipleCheckboxesFieldProps, ReactTagsField, type ReactTagsFieldProps, type ReactTagsFieldPropsWithOptions, SemiCircularProgress, SemiCircularProgressWithLabel, SwipeableDrawerPuller, alert, confirm, formikCheckboxProps, formikFieldProps, promptNumber, promptText, promptTextarea, useBooleanState, useRefreshKey, useScreenSize, useToggle };
