'use client'
import { Box, Fade, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import React, { ReactElement } from "react";

type RadioOption = {
    value: any, label: string, 
    detail?: string|React.JSX.Element, 
    gridOptions?: {xs?: number, sm?: number, md?: number, lg?: number}
}

export type CustomRadioGroupWithDetailsProps = {
    label?: string|ReactElement, 
    name: string, 
    value: any, 
    onChange?: (value: any) => void, 
    options: RadioOption[],
    error?: boolean
}

export default function CustomRadioGroupWithDetails({label, name, value, onChange, error, options}: CustomRadioGroupWithDetailsProps){
    return <Box>
        {label && <FormLabel sx={{mb: 1, display: "block"}}>{label}</FormLabel>}
        <RadioGroup name={name} value={value} onChange={(e, newValue) => {if(onChange) onChange(newValue)}}>
            <Grid container spacing={2}>
                {options.map(opt => {
                    const selected = opt.value == value
                    return <Grid key={opt.label} item xs={opt.gridOptions?.xs || 12} sm={opt.gridOptions?.sm} md={opt.gridOptions?.md} lg={opt.gridOptions?.lg}>
                        <FormControlLabel 
                            value={opt.value} 
                            sx={{
                                background: "white", borderRadius: "10px", transition: "all .3s ease",
                                border: theme => "2px solid "+(selected ? theme.palette.primary.main : "lightgray"), 
                                p: 2, m: 0, display:"flex", gap: .5,
                                boxShadow: selected ? "0 0 3px rgba(0, 0, 0, .5)" : "none", alignItems: "start",
                                "&:hover": {
                                    borderColor: theme => theme.palette.primary.main,
                                    boxShadow: "0 0 3px rgba(0, 0, 0, .5)"
                                }
                            }}
                            control={<Radio />}
                            label={<Box sx={{display: "flex", flexDirection: "column", gap: 1, pt: 1.2, height: "auto"}}>
                                <Typography sx={{fontWeight: selected ? "bold" : "normal"}}>{opt.label}</Typography>
                                {(opt.detail && selected) && <Fade in={selected}>
                                    <Box mb={1} ml={{xs: "-40px", md: 0}}>{opt.detail}</Box>
                                </Fade>}
                            </Box>}
                            slotProps={{typography: {display: "block", width: "100%"}}}
                        />
                    </Grid>
                })}
            </Grid>
        </RadioGroup>
        {error && <Typography color="#d32f2f" fontSize="0.85rem" fontWeight="400" mt={.5}>Choisir une option</Typography>}
    </Box>
}