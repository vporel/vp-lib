'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_1 = require("react");
const Add_1 = require("@mui/icons-material/Add");
const AddCircleOutline_1 = require("@mui/icons-material/AddCircleOutline");
const dom_1 = require("@vporel/dom");
const InsertDriveFile_1 = require("@mui/icons-material/InsertDriveFile");
const PictureAsPdf_1 = require("@mui/icons-material/PictureAsPdf");
const FlexBox_1 = require("./FlexBox");
const Close_1 = require("@mui/icons-material/Close");
function FileReading({ fileData, onRemove, showFileName }) {
    const fileNameLower = fileData.file.name.toLowerCase();
    return (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { border: "1px solid lightgray", borderRadius: "4px", overflow: "hidden", width: "140px", position: "relative", background: "rgb(250, 250, 250)" }, children: [(0, jsx_runtime_1.jsx)(FlexBox_1.default, { height: "80px", center: true, children: fileNameLower.endsWith(".jpeg") || fileNameLower.endsWith(".jpg") || fileNameLower.endsWith(".png") || fileNameLower.endsWith(".gif")
                    ? (0, jsx_runtime_1.jsx)(material_1.Box, { component: "img", src: fileData.src, width: "100%" })
                    : (fileNameLower.endsWith(".pdf")
                        ? (0, jsx_runtime_1.jsx)(PictureAsPdf_1.default, { sx: { width: 60, height: 60 } })
                        : (0, jsx_runtime_1.jsx)(InsertDriveFile_1.default, { sx: { width: 60, height: 60 } })) }), showFileName && (0, jsx_runtime_1.jsx)(material_1.Typography, { fontSize: 8, pl: "2px", sx: { background: "lightgray", position: "relative", zIndex: 2 }, children: fileData.file.name }), fileData.progress < 100 && (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { width: "100%", height: "5px", position: "absolute", top: 0, left: 0 }, children: (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { width: fileData.progress + "%", height: "100%", background: t => t.palette.primary.main } }) }), (0, jsx_runtime_1.jsx)(material_1.IconButton, { sx: { position: "absolute", top: 0, right: 0, p: "3px" }, onClick: e => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRemove(fileData.file);
                }, children: (0, jsx_runtime_1.jsx)(Close_1.default, { sx: { width: 18, height: 18, background: "red", borderRadius: "5px", color: "white" } }) })] });
}
function FilesUploader({ label = "Déposez vos fichiers ici", labelProps, compressImages, extensions, maxSize, showRequirements, showFilesNames = true, onFilesChange, onError, multiple = false }) {
    const [filesData, setFilesData] = (0, react_1.useState)([]);
    const [dragging, setDragging] = (0, react_1.useState)(false);
    const inputFileRef = (0, react_1.useRef)(null);
    const updateFile = (0, react_1.useCallback)((file, changes) => {
        setFilesData(data => {
            const newFilesData = [...data];
            const currentFileData = newFilesData.find(f => f.file.name == file.name);
            if (currentFileData) {
                for (let key in changes)
                    currentFileData[key] = changes[key];
            }
            return newFilesData;
        });
    }, []);
    const removeFile = (0, react_1.useCallback)((file) => {
        setFilesData(data => data.filter(fd => fd.file.name != file.name));
    }, []);
    const fileUploader = (0, react_1.useMemo)(() => new dom_1.FileUploader({
        maxSize, extensions, compressImages,
        onStart: file => {
            setFilesData(d => [...d, { file, dataToUpload: null, src: null, progress: 0 }]);
        },
        onUploaded: (file, dataToUpload, src) => updateFile(file, { dataToUpload, src }),
        onError: (file, error) => {
            if (typeof onError == "function")
                onError(error, file);
        },
        onProgress: (file, percentage) => updateFile(file, { progress: percentage })
    }), [maxSize, extensions, compressImages]);
    (0, react_1.useEffect)(() => {
        if (onFilesChange)
            onFilesChange(filesData);
    }, [filesData, onFilesChange]);
    return (0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(label && multiple) && (0, jsx_runtime_1.jsx)(material_1.Typography, { mb: .5, fontSize: 11, ...labelProps, children: label }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                    p: 2, border: t => "2px dashed " + (dragging ? t.palette.primary.main : "gray"), borderRadius: "10px",
                    display: "flex", gap: 1, alignItems: "start", transition: "all .2s ease",
                }, onDragOver: e => { e.preventDefault(); setDragging(true); }, onDragLeave: e => { e.preventDefault(); setDragging(false); }, onDrop: e => {
                    e.stopPropagation();
                    e.preventDefault();
                    setDragging(false);
                    for (let i = 0; i < e.dataTransfer.files.length; i++)
                        fileUploader.upload(e.dataTransfer.files[i]);
                }, children: [filesData.map(fileData => (0, jsx_runtime_1.jsx)(FileReading, { fileData: fileData, onRemove: removeFile, showFileName: showFilesNames }, fileData.file.name)), (0, jsx_runtime_1.jsx)("input", { type: "file", multiple: multiple, hidden: true, ref: inputFileRef, onChange: e => {
                            if (e.target.files) {
                                for (let i = 0; i < e.target.files.length; i++)
                                    fileUploader.upload(e.target.files[i]);
                            }
                            e.target.value = "";
                        }, accept: extensions ? extensions.join(",") : "*" }), multiple && (0, jsx_runtime_1.jsx)(material_1.IconButton, { sx: {
                            borderRadius: "5px", background: "rgb(245, 245, 245)",
                            "&, *": { transition: "all .2s ease" },
                            "&:hover": {
                                background: t => t.palette.primary.main,
                                "*": { color: "white" }
                            }
                        }, onClick: () => inputFileRef.current?.click(), children: (0, jsx_runtime_1.jsx)(Add_1.default, {}) }), (!multiple && filesData.length == 0) && (0, jsx_runtime_1.jsxs)(FlexBox_1.default, { center: true, flexDirection: "column", width: "100%", minHeight: 90, onClick: () => inputFileRef.current?.click(), children: [label && (0, jsx_runtime_1.jsx)(material_1.Typography, { mb: .5, fontSize: 11, textAlign: "center", ...labelProps, children: label }), showRequirements && (0, jsx_runtime_1.jsxs)(material_1.Box, { my: 1, children: [(0, jsx_runtime_1.jsxs)(material_1.Typography, { textAlign: "center", fontSize: 12, children: ["Format : ", (0, jsx_runtime_1.jsx)(material_1.Typography, { fontSize: 12, component: "span", fontWeight: "bold", children: extensions.length == 0 ? "*" : extensions.map(e => e.toUpperCase()).join(", ") })] }), maxSize && (0, jsx_runtime_1.jsxs)(material_1.Typography, { textAlign: "center", fontSize: 12, children: ["Poids : ", (0, jsx_runtime_1.jsxs)(material_1.Typography, { fontSize: 12, component: "span", fontWeight: "bold", children: [maxSize, "MB maximum"] })] })] }), (0, jsx_runtime_1.jsx)(FlexBox_1.default, { center: true, children: (0, jsx_runtime_1.jsx)(AddCircleOutline_1.default, { sx: { width: 25, height: 25, cursor: "pointer" } }) })] })] }), (showRequirements && multiple) && (0, jsx_runtime_1.jsxs)(material_1.Box, { mt: 1, children: [(0, jsx_runtime_1.jsxs)(material_1.Typography, { fontSize: 12, children: ["Format : ", (0, jsx_runtime_1.jsx)(material_1.Typography, { fontSize: 12, component: "span", fontWeight: "bold", children: extensions.length == 0 ? "*" : extensions.map(e => e.toUpperCase()).join(", ") })] }), maxSize && (0, jsx_runtime_1.jsxs)(material_1.Typography, { fontSize: 12, children: ["Poids : ", (0, jsx_runtime_1.jsxs)(material_1.Typography, { fontSize: 12, component: "span", fontWeight: "bold", children: [maxSize, "Mo maximum"] })] })] })] });
}
exports.default = FilesUploader;
