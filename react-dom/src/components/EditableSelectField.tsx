'use client'
import { Autocomplete, AutocompleteProps, SxProps, TextField, Theme } from "@mui/material"
import { useMemo } from "react"
import { SelectOption } from "./forms.types"
import uniqid from "uniqid"

export type EditableSelectFieldProps = {
    options: SelectOption[], groups?: boolean, sort?: boolean, exclude?: any[], required?: boolean, fullWidth?: boolean, label?: string, name: string,  
    value?: any, onChange?: (value: any) => void, onBlur?: Function, helperText?: string, error?: boolean, 
    variant?: "filled"|"outlined"|"standard", InputProps?: object, sx?: SxProps<Theme>, className?: string
}
export default function EditableSelectField(
    {
        options, groups = true, sort = true, exclude, required, fullWidth, label, name, value, onChange, 
        onBlur, helperText, error, variant="outlined", InputProps, className, ...props
    }: EditableSelectFieldProps
){

    const _options = useMemo(() => {
        return options.filter(opt => exclude ? !exclude.includes(opt.value) : true)
    }, [options, exclude])

    return <Autocomplete
        id={uniqid()}
        fullWidth={fullWidth}
        options={sort ? _options.sort((a, b) => -b.label[0].localeCompare(a.label[0])) : _options}
        groupBy={groups ? ((option) => option.label[0]): undefined} //Group by first letter
        getOptionLabel={optionValue => {
            if(optionValue == undefined || optionValue === null) return ""
            if(typeof optionValue == "object") return optionValue.label
            const option = _options.find(o => o.value == optionValue)
            return option ? option.label : ""
        }}
        className={className}
        value={value || null}
        inputValue={value ? _options.find(o => o.value == value)?.label : ""}
        isOptionEqualToValue={(option, value) => option.value == value}
        onChange={(e, option) => {
            const customEventObject = {target: {name: name, value: option ? option.value : ""}} //!!! Warning : Weird technique used because the handlers only need the name and the value of the target
            if(onChange) onChange(customEventObject)
        }}
        onBlur={(e: any) => {
            e.target.name = name 
            if(onBlur) onBlur(e)
        }}
        renderInput={(params) => <TextField {...params} required={required} label={label} variant={variant} helperText={helperText} error={error} InputProps={{...params.InputProps, ...InputProps}}/>}
        {...props}
    />
}