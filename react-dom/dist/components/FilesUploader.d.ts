import { TypographyProps } from "@mui/material";
import { FileUploadError } from "@vporel/dom";
export type FileData = {
    file: File;
    dataToUpload: File | Blob | null;
    src: any;
    progress: number;
};
export default function FilesUploader({ label, labelProps, compressImages, extensions, maxSize, showRequirements, showFilesNames, onFilesChange, onError, multiple }: {
    label?: string;
    labelProps?: TypographyProps;
    compressImages?: boolean;
    extensions: string[];
    /** In MB */
    maxSize?: number;
    showRequirements?: boolean;
    showFilesNames?: boolean;
    onFilesChange: (filesData: FileData[]) => void;
    onError?: (error: FileUploadError, file: File) => void;
    multiple?: boolean;
}): import("react/jsx-runtime").JSX.Element;
