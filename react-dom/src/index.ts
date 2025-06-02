/**
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 * @description This package contains components, hooks, and utilities for React applications
 */

export { formikFieldProps, formikCheckboxProps } from "./formik"

export { default as ButtonWithLoading } from "./components/ButtonWithLoading"
export { default as CircularProgressWithLabel } from "./components/CircularProgressWithLabel"
export { default as CustomDrawer } from "./components/CustomDrawer"
export { default as CustomRadioGroupWithDetails, CustomRadioGroupWithDetailsProps } from "./components/CustomRadioGroupWithDetails"
export { default as DialogBoxesContainer, alert, confirm, promptNumber, promptText, promptTextarea } from "./components/DialogBoxesContainer"
export { default as EditableSelectField, EditableSelectFieldProps } from "./components/EditableSelectField"
export { default as FilesUploader, FileData } from "./components/FilesUploader"
export { default as FlexBox } from "./components/FlexBox"
export { default as ImageCropper } from "./components/ImageCropper"
export { default as Loader } from "./components/Loader"
export { default as Modal } from "./components/Modal"
export { default as MultipleCheckboxesField, MultipleCheckboxesFieldProps } from "./components/MultipleCheckboxesField"
export { default as ReactTagsField, ReactTagsFieldProps, ReactTagsFieldPropsWithOptions } from "./components/ReactTagsField"
export { default as SemiCircularProgress } from "./components/SemiCircularProgress"
export { default as SemiCircularProgressWithLabel } from "./components/SemiCircularProgressWithLabel"
export { default as SwipeableDrawerPuller } from "./components/SwipeableDrawerPuller"
export { LightTooltip } from "./components/Tooltips"

export { CustomBoxProps } from "./components/types"
export { ApiHooks } from "./hooks/api"
export { useBooleanState, useRefreshKey, useScreenSize, useToggle } from "./hooks/common"