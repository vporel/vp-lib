import { InputAdornment, } from "@mui/material"
import { FormikProps } from "formik"
import { ReactElement } from "react"

type FieldPropsOptions = {
    placeholder?: string,
    defaultHelperText?: string,
    startIcon?: any,
    endIcon?: any,
    onChangeValue?: (value: any) => void,
    transform?: (value: any) => any
}

export function formikFieldProps(
    formikProps: Omit<FormikProps<any>, "handleSubmit"|"isSubmitting">, field: string, label?: string,
    options: FieldPropsOptions = {}
): {
    label?: string
    name: string, 
    value: any,  
    placeholder?: string
    onChange: (e: any) => void 
    onBlur: any, 
    error: boolean,
    InputProps?: {
        startAdornment?: ReactElement,
        endAdornment?: ReactElement
    }
}{
    const {placeholder, defaultHelperText, startIcon, endIcon, onChangeValue, transform} = options
    const fieldMeta = formikProps.getFieldMeta(field)
    const props: any = {
        label, name: field, value: fieldMeta.value,  placeholder,
        onChange: (e: any) => {
            let value  = ((typeof e == "object") && e.target) ? e.target.value : e
            if(transform) value = transform(value)
            formikProps.setFieldValue(field, value)
            if(onChangeValue) onChangeValue(value)
        }, 
        onBlur: formikProps.handleBlur, 
        error: fieldMeta.error && fieldMeta.touched
    }
    props.helperText = props.error ? fieldMeta.error : defaultHelperText
    if(startIcon || endIcon){
        props.InputProps = {
            startAdornment: startIcon && <InputAdornment position="start">{startIcon}</InputAdornment>,
            endAdornment: endIcon && <InputAdornment position="end">{endIcon}</InputAdornment>
        }
    }
    
    return props
}

type CheckboxPropsOptions = {
    onChangeValue?: (value: boolean) => void
}

export function formikCheckboxProps(formikProps: any, field: string, options: CheckboxPropsOptions = {}){
    const {onChangeValue} = options
    const fieldMeta = formikProps.getFieldMeta(field)
    const props: any = {
        name: field, checked: fieldMeta.value === true || fieldMeta.value == "true",
        onChange: (e: any) => {
            const value  = e.target.checked
            formikProps.setFieldValue(field, value)
            if(onChangeValue) onChangeValue(value)
        }, 
        onBlur: formikProps.handleBlur, 
        error: fieldMeta.error && fieldMeta.touched
    }
    
    return props
}