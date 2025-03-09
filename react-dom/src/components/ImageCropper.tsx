'use client'
import { Box, BoxProps, Button } from "@mui/material"
import Cropper from "cropperjs"
import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import FlexBox from "./FlexBox"
import ButtonWithLoading from "./ButtonWithLoading"

export default function ImageCropper(
    {
        imageSrc, cropperOptions, showZoomControls, canvasHeight, containerProps,
        saving, onValidate, validateButtonLabel = "Valider", extraOptions,
        exportProps
    }: 
    {
        imageSrc: string, cropperOptions?: Cropper.Options, showZoomControls?: boolean, 
        canvasHeight: string|number|{xs: number|string, md: string|number}, containerProps?: BoxProps,
        saving?: boolean,
        onValidate: (blob: Blob|null) => any, validateButtonLabel?: string,
        extraOptions?: (cropper: Cropper|null) => {label: string, onClick: any}[],
        exportProps?: {type?: 'image/jpeg'|'image/png', quality?: number}
    }
){
    const imageRef = useRef(null)
    const [cropper, setCropper] = useState<Cropper|null>(null)

    useEffect(() => {
        cropper?.replace(imageSrc)
    }, [cropper, imageSrc])

    useEffect(() => {
        setCropper(cropper => {
            if(cropper) return cropper //Instance only one time
            return imageRef.current ? new Cropper(imageRef.current, {viewMode: 1, aspectRatio: 1, ...cropperOptions}): null
        })
    }, [imageRef, cropperOptions])

    return <Box {...containerProps}>
        <Box height={canvasHeight}>
            <Box component="img" src={imageSrc} ref={imageRef} height={canvasHeight}/>
        </Box>
        <FlexBox justifyContent="space-between" alignItems={{xs: "stretch", md: "space-between"}} mt={1} gap={1} flexDirection={{xs: "column", md: "row"}}>
            <FlexBox gap={1} justifyContent={{xs: "space-between", md: "start"}}>
                {showZoomControls && <Fragment>
                    <Button variant="outlined" className="btn-rounded" onClick={() => cropper?.zoom(-0.1)}>Zoom -</Button>
                    <Button variant="outlined" className="btn-rounded" onClick={() => cropper?.zoom(+0.1)}>Zoom +</Button>
                </Fragment>}
            </FlexBox>
            <FlexBox gap={1} justifyContent={{xs: "space-between", md: "end"}}>
                {extraOptions && extraOptions(cropper).map(opt => <Button key={opt.label} variant="outlined" className="btn-rounded" onClick={opt.onClick}>{opt.label}</Button>)}
                <ButtonWithLoading loading={!!saving} variant="outlined" className="btn-rounded" onClick={() => {
                    if(!onValidate) return
                    cropper?.getCroppedCanvas().toBlob(blob => {
                        onValidate(blob)
                    }, exportProps?.type ?? 'image/jpeg', exportProps?.quality ?? 0.7)
                }}>{validateButtonLabel}</ButtonWithLoading>
            </FlexBox>
        </FlexBox>
    </Box>
}