'use client'
import { Box, IconButton, Typography, TypographyProps } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PlusIcon from "@mui/icons-material/Add";
import PlusCircleIcon from "@mui/icons-material/AddCircleOutline";
import FileUploader, { FileUploadError } from "../classes/FileUploader";
import FileIcon from "@mui/icons-material/InsertDriveFile"
import PdfFileIcon from "@mui/icons-material/PictureAsPdf";
import FlexBox from "./FlexBox";
import CloseIcon from "@mui/icons-material/Close";

export type FileData = {
    file: File, 
    dataToUpload: File|Blob|null, 
    src: any, 
    progress: number
}

function FileReading({fileData, onRemove, showFileName}: {fileData: FileData, onRemove: any, showFileName: boolean}){
    const fileNameLower = fileData.file.name.toLowerCase()
    return <Box sx={{border: "1px solid lightgray", borderRadius: "4px", overflow: "hidden", width: "140px", position: "relative", background: "rgb(250, 250, 250)"}}>
        <FlexBox height="80px" center>
            {fileNameLower.endsWith(".jpeg") || fileNameLower.endsWith(".jpg") || fileNameLower.endsWith(".png") || fileNameLower.endsWith(".gif")
                ? <Box component="img"  src={fileData.src} width="100%"/>
                : (fileNameLower.endsWith(".pdf")
                    ? <PdfFileIcon sx={{width: 60, height: 60}} />
                    : <FileIcon sx={{width: 60, height: 60}} />
                )
            }
        </FlexBox>
        {showFileName && <Typography fontSize={8} pl="2px" sx={{background: "lightgray", position: "relative", zIndex: 2}}>{fileData.file.name}</Typography>}
        {fileData.progress < 100 && <Box sx={{width: "100%", height: "5px", position: "absolute", top: 0, left: 0}}>
            <Box sx={{width: fileData.progress+"%", height: "100%", background: t => t.palette.primary.main}}></Box>
        </Box>}
        <IconButton sx={{position: "absolute", top: 0, right: 0, p: "3px"}} onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            onRemove(fileData.file)
        }}>
            <CloseIcon sx={{width: 18, height: 18, background: "red", borderRadius: "5px", color: "white"}}/>
        </IconButton>
    </Box>
}

export default function FilesUploader(
    {
        label = "Déposez vos fichiers ici", labelProps,
        compressImages,
        extensions, maxSize, showRequirements, showFilesNames = true,
        onFilesChange, onError, multiple = false
    }:
    {
        label?: string, labelProps?: TypographyProps,
        compressImages?: boolean,
        extensions: string[], 
        /** In MB */
        maxSize?: number, 
        showRequirements?: boolean, 
        showFilesNames?: boolean,
        onFilesChange: (filesData: FileData[])  => void, 
        onError?: (error: FileUploadError, file: File) => void, 
        multiple?: boolean
    }
){
    const [filesData, setFilesData] = useState<FileData[]>([])
    const [dragging, setDragging] = useState(false)
    const inputFileRef = useRef(null)
    
    const updateFile = useCallback((file: File, changes: {dataToUpload?: File|Blob|null, src?: any, progress?: number}) => {
        setFilesData(data => {
            const newFilesData = [...data]
            const currentFileData = newFilesData.find(f => f.file.name == file.name)
            if(currentFileData){
                for(let key in changes) currentFileData[key] = changes[key]
            }
            return newFilesData
        })
    }, [])

    const removeFile = useCallback((file: File) => {
        setFilesData(data => data.filter(fd => fd.file.name != file.name))
    }, [])

    const fileUploader = useMemo(() => new FileUploader({
        maxSize, extensions, compressImages,
        onStart: file => {
            setFilesData(d => [...d, {file, dataToUpload: null, src: null, progress: 0}])
        },
        onUploaded: (file, dataToUpload, src) => updateFile(file, {dataToUpload, src}),
        onError: (file, error) => {
            if(typeof onError == "function") onError(error, file)
        },
        onProgress: (file, percentage) => updateFile(file, {progress: percentage})
    }), [maxSize, extensions, compressImages])

    useEffect(() => {
        if(onFilesChange) onFilesChange(filesData)
    }, [filesData, onFilesChange])

    return <Box>
        {(label && multiple) && <Typography mb={.5} fontSize={11} {...labelProps}>{label}</Typography>}
        <Box 
            sx={{
                p: 2, border: t => "2px dashed " + (dragging ? t.palette.primary.main : "gray"), borderRadius: "10px",
                display: "flex", gap: 1, alignItems: "start", transition: "all .2s ease",
            }}
            onDragOver={e => {e.preventDefault(); setDragging(true)}}
            onDragLeave={e => {e.preventDefault(); setDragging(false)}}
            onDrop={e => {
                e.stopPropagation()
                e.preventDefault()
                setDragging(false)
                for(let i = 0; i < e.dataTransfer.files.length; i++) fileUploader.upload(e.dataTransfer.files[i])                
            }}
        >
            {filesData.map(fileData => <FileReading key={fileData.file.name} fileData={fileData} onRemove={removeFile} showFileName={showFilesNames}/>)}
            <input type="file" multiple={multiple} hidden ref={inputFileRef} onChange={e => {
                if(e.target.files){
                    for(let i = 0; i < e.target.files.length; i++) fileUploader.upload(e.target.files[i])   
                }
                e.target.value = ""
            }} accept={extensions ? extensions.join(",") : "*"}/>
            {multiple && <IconButton 
                sx={{
                    borderRadius: "5px", background: "rgb(245, 245, 245)",
                    "&, *": {transition: "all .2s ease"},
                    "&:hover": { 
                        background: t => t.palette.primary.main,
                        "*": {color: "white"}
                    }
                }}
                onClick={() => inputFileRef.current?.click()}
            ><PlusIcon /></IconButton>}
            {(!multiple && filesData.length == 0) && <FlexBox center flexDirection="column" width="100%" minHeight={90} onClick={() => inputFileRef.current?.click()}>
                {label && <Typography mb={.5} fontSize={11} textAlign="center" {...labelProps}>{label}</Typography>}
                {showRequirements && <Box my={1}>
                    <Typography textAlign="center" fontSize={12}>Format : <Typography fontSize={12} component="span" fontWeight="bold">{extensions.length == 0 ? "*" : extensions.map(e => e.toUpperCase()).join(", ")}</Typography></Typography>
                    {maxSize && <Typography textAlign="center" fontSize={12}>Poids : <Typography fontSize={12} component="span" fontWeight="bold">{maxSize}MB maximum</Typography></Typography>}
                </Box>}
                <FlexBox center><PlusCircleIcon sx={{width: 25, height: 25, cursor: "pointer"}}/></FlexBox>
            </FlexBox>}
        </Box>
        {(showRequirements && multiple) && <Box mt={1}>
            <Typography fontSize={12}>Format : <Typography fontSize={12} component="span" fontWeight="bold">{extensions.length == 0 ? "*" : extensions.map(e => e.toUpperCase()).join(", ")}</Typography></Typography>
            {maxSize && <Typography fontSize={12}>Poids : <Typography fontSize={12} component="span" fontWeight="bold">{maxSize}Mo maximum</Typography></Typography>}
        </Box>}
    </Box>
}