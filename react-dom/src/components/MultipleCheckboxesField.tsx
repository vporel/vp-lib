'use client'
import { Box, BoxProps, Checkbox, FormControlLabel, FormControlLabelProps, FormGroup, MenuItem, SxProps, Theme, Typography, TypographyProps, } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { SelectOption } from "./forms.types";
import FlexBox from "./FlexBox";

export type MultipleCheckboxesFieldProps = Omit<BoxProps, "onChange"> & {value: any, onChange: (values: any[]) => void, items: SelectOption[], itemTypographyProps?: TypographyProps, formControlLabelProps?: FormControlLabelProps, styled?: boolean, column?: boolean, maxToShow?: number}

export default function MultipleCheckboxesField(
    {value, onChange, items, itemTypographyProps, formControlLabelProps, styled = true, column, sx, flexDirection, maxToShow, ...props} 
    : MultipleCheckboxesFieldProps
){
    const [choices, setChoices] = useState<any[]>(value ?? [])
    const [allVisible, setAllVisible] = useState(false)
    const {sx: formControlLabelSx, ...formControlLabelPropsWithoutSx} = {...formControlLabelProps}
    const formLabelStyle: (checkbox: boolean) => SxProps<Theme> = (checked: boolean) => ({
        border: th => "2px solid "+ (!checked ? "lightgray" : th.palette.primary.main), 
        transition: "all .2s ease",
        borderRadius: "5px", 
        px: 1.5, py: .5
    })
    const ref = useRef(null)

    useEffect(() => {
        setChoices(value)
    }, [value])

    return <FlexBox 
        ref={ref}
        sx={{
            display: "flex", flexWrap: "wrap", 
            gap: styled ? 2 : 0, 
            px: styled ? 2 : 0,
            flexDirection: column ? "column" : flexDirection,
            ...sx
        }}
        {...props}
    >
        {items.map((el, index) => {
            const checked = choices.includes(el.value)
            return (!maxToShow || index < maxToShow || allVisible) && <FormControlLabel key={el.value} label={el.label} 
                sx={({
                    ...(styled ? formLabelStyle(checked) : undefined),
                    ...formControlLabelSx
                }) as any}
                control={<Checkbox checked={checked} onChange={e => {
                    setChoices(vals => {
                        let newVals = [...vals]
                        if(e.target.checked){
                            if(!choices.includes(el.value)) newVals = [...newVals, el.value]
                        }else newVals = newVals.filter(v => v != el.value)
                        onChange(newVals)
                        return newVals
                    })
                }}/>}
                componentsProps={{typography: itemTypographyProps}}
                {...formControlLabelPropsWithoutSx}
            />
        })}
        {(maxToShow && items.length > maxToShow) && <Typography color="primary" sx={{cursor: "pointer"}} onClick={() =>  setAllVisible(v => !v)}>
            {!allVisible ? "Voir plus ("+(items.length - maxToShow)+")" : "Voir moins"}
        </Typography>}
    </FlexBox>
}