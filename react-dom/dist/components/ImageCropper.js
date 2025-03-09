'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const cropperjs_1 = require("cropperjs");
const react_1 = require("react");
const FlexBox_1 = require("./FlexBox");
const ButtonWithLoading_1 = require("./ButtonWithLoading");
function ImageCropper({ imageSrc, cropperOptions, showZoomControls, canvasHeight, containerProps, saving, onValidate, validateButtonLabel = "Valider", extraOptions, exportProps }) {
    const imageRef = (0, react_1.useRef)(null);
    const [cropper, setCropper] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        cropper?.replace(imageSrc);
    }, [cropper, imageSrc]);
    (0, react_1.useEffect)(() => {
        setCropper(cropper => {
            if (cropper)
                return cropper; //Instance only one time
            return imageRef.current ? new cropperjs_1.default(imageRef.current, { viewMode: 1, aspectRatio: 1, ...cropperOptions }) : null;
        });
    }, [imageRef, cropperOptions]);
    return (0, jsx_runtime_1.jsxs)(material_1.Box, { ...containerProps, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { height: canvasHeight, children: (0, jsx_runtime_1.jsx)(material_1.Box, { component: "img", src: imageSrc, ref: imageRef, height: canvasHeight }) }), (0, jsx_runtime_1.jsxs)(FlexBox_1.default, { justifyContent: "space-between", alignItems: { xs: "stretch", md: "space-between" }, mt: 1, gap: 1, flexDirection: { xs: "column", md: "row" }, children: [(0, jsx_runtime_1.jsx)(FlexBox_1.default, { gap: 1, justifyContent: { xs: "space-between", md: "start" }, children: showZoomControls && (0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Button, { variant: "outlined", className: "btn-rounded", onClick: () => cropper?.zoom(-0.1), children: "Zoom -" }), (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "outlined", className: "btn-rounded", onClick: () => cropper?.zoom(+0.1), children: "Zoom +" })] }) }), (0, jsx_runtime_1.jsxs)(FlexBox_1.default, { gap: 1, justifyContent: { xs: "space-between", md: "end" }, children: [extraOptions && extraOptions(cropper).map(opt => (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "outlined", className: "btn-rounded", onClick: opt.onClick, children: opt.label }, opt.label)), (0, jsx_runtime_1.jsx)(ButtonWithLoading_1.default, { loading: !!saving, variant: "outlined", className: "btn-rounded", onClick: () => {
                                    if (!onValidate)
                                        return;
                                    cropper?.getCroppedCanvas().toBlob(blob => {
                                        onValidate(blob);
                                    }, exportProps?.type ?? 'image/jpeg', exportProps?.quality ?? 0.7);
                                }, children: validateButtonLabel })] })] })] });
}
exports.default = ImageCropper;
