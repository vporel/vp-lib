'use client'
import { useCallback, useRef, useState, createContext, Fragment, useEffect} from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, TextFieldProps } from "@mui/material";
import ButtonWithLoading from "./ButtonWithLoading";

type DialogParams = {
    title?: string, 
    detail: string, 
    onValidate: () => boolean, 
    validateButton?: {
        label?: string
    },
    onCancel?: () => void,
    cancelButton?: {
        label?: string
    },
}
type InputDialogParams = DialogParams & {fieldProps?: TextFieldProps}

const EVENT = "onCustomDialog"

type EventType = "alert"|"confirm"|"promptText"|"promptNumber"|"promptTextarea"

export function alert(options: Omit<DialogParams, "onCancel"|"cancelButton">){
    window.dispatchEvent(new CustomEvent(EVENT, {detail: {event: "alert", options}}))
}

export function confirm(options: DialogParams){
    window.dispatchEvent(new CustomEvent(EVENT, {detail: {event: "confirm", options}}))
}

confirm.yesNo = (options: DialogParams) => confirm({...options, validateButton: {label: "OUI"}, cancelButton: {label: "NON"}})

export function promptText(options: InputDialogParams){
    window.dispatchEvent(new CustomEvent(EVENT, {detail: {event: "promptText", options}}))
}

export function promptNumber(options: InputDialogParams){
    window.dispatchEvent(new CustomEvent(EVENT, {detail: {event: "promptNumber", options}}))
}

export function promptTextarea(options: InputDialogParams){
    window.dispatchEvent(new CustomEvent(EVENT, {detail: {event: "promptTextarea", options}}))
}

export default function DialogBoxesContainer(){
    const [data, setData] = useState<{event: EventType|null, options: DialogParams|InputDialogParams|null}>({event: null, options: null})
    const [validating, setValidating] = useState(false)

    const handleValidate = useCallback(async () => {
        setValidating(true)
        if(await data.options?.onValidate()) setData({event: null, options: null})
        setValidating(false)
    }, [data])

    const handleCancel = useCallback(async () => {
        if(data.options?.onCancel) await data.options.onCancel()
        setData({event: null, options: null})
    }, [data])

    useEffect(() => {
        const eventListener = (e: CustomEventInit) => setData(e.detail)
        window.addEventListener(EVENT, eventListener)
        return () => {
            window.removeEventListener(EVENT, eventListener)
        }
    }, [])

    return <Fragment>
        <Dialog open={data.event !== null && (data.event == "alert" || data.event == "confirm")} onClose={handleCancel}>
            {data.options?.title && <DialogTitle>{data.options?.title}</DialogTitle>}
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {data.options?.detail}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {data.event == "confirm" && <Button onClick={handleCancel} autoFocus>{(data.options?.cancelButton?.label ?? "Annuler").toUpperCase()}</Button>}
                <ButtonWithLoading loading={validating} onClick={handleValidate}>{(data.options?.validateButton?.label ?? "OK").toUpperCase()}</ButtonWithLoading>
            </DialogActions>
        </Dialog>
    </Fragment>
}