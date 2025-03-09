'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptTextarea = exports.promptNumber = exports.promptText = exports.confirm = exports.alert = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const ButtonWithLoading_1 = require("./ButtonWithLoading");
const EVENT = "onCustomDialog";
function alert(options) {
    window.dispatchEvent(new CustomEvent(EVENT, { detail: { event: "alert", options } }));
}
exports.alert = alert;
function confirm(options) {
    window.dispatchEvent(new CustomEvent(EVENT, { detail: { event: "confirm", options } }));
}
exports.confirm = confirm;
confirm.yesNo = (options) => confirm({ ...options, validateButton: { label: "OUI" }, cancelButton: { label: "NON" } });
function promptText(options) {
    window.dispatchEvent(new CustomEvent(EVENT, { detail: { event: "promptText", options } }));
}
exports.promptText = promptText;
function promptNumber(options) {
    window.dispatchEvent(new CustomEvent(EVENT, { detail: { event: "promptNumber", options } }));
}
exports.promptNumber = promptNumber;
function promptTextarea(options) {
    window.dispatchEvent(new CustomEvent(EVENT, { detail: { event: "promptTextarea", options } }));
}
exports.promptTextarea = promptTextarea;
function DialogBoxesContainer() {
    const [data, setData] = (0, react_1.useState)({ event: null, options: null });
    const [validating, setValidating] = (0, react_1.useState)(false);
    const handleValidate = (0, react_1.useCallback)(async () => {
        setValidating(true);
        if (await data.options?.onValidate())
            setData({ event: null, options: null });
        setValidating(false);
    }, [data]);
    const handleCancel = (0, react_1.useCallback)(async () => {
        if (data.options?.onCancel)
            await data.options.onCancel();
        setData({ event: null, options: null });
    }, [data]);
    (0, react_1.useEffect)(() => {
        const eventListener = (e) => setData(e.detail);
        window.addEventListener(EVENT, eventListener);
        return () => {
            window.removeEventListener(EVENT, eventListener);
        };
    }, []);
    return (0, jsx_runtime_1.jsx)(react_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(material_1.Dialog, { open: data.event !== null && (data.event == "alert" || data.event == "confirm"), onClose: handleCancel, children: [data.options?.title && (0, jsx_runtime_1.jsx)(material_1.DialogTitle, { children: data.options?.title }), (0, jsx_runtime_1.jsx)(material_1.DialogContent, { children: (0, jsx_runtime_1.jsx)(material_1.DialogContentText, { id: "alert-dialog-description", children: data.options?.detail }) }), (0, jsx_runtime_1.jsxs)(material_1.DialogActions, { children: [data.event == "confirm" && (0, jsx_runtime_1.jsx)(material_1.Button, { onClick: handleCancel, autoFocus: true, children: (data.options?.cancelButton?.label ?? "Annuler").toUpperCase() }), (0, jsx_runtime_1.jsx)(ButtonWithLoading_1.default, { loading: validating, onClick: handleValidate, children: (data.options?.validateButton?.label ?? "OK").toUpperCase() })] })] }) });
}
exports.default = DialogBoxesContainer;
