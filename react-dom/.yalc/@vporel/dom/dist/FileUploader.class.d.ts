export type FileUploadError = "EXTENSION" | "SIZE";
type FileUploaderOptions = {
    extensions: string[];
    maxSize?: number;
    compressImages?: boolean;
    onStart: (file: File) => void;
    onUploaded: (file: File, dataToUpload: File | Blob, result: string | ArrayBuffer | null) => void;
    onError: (file: File, errorType: FileUploadError) => void;
    onProgress: (file: File, percentage: number) => void;
};
export default class FileUploader {
    options: FileUploaderOptions;
    constructor(options: FileUploaderOptions);
    upload(file: File): void;
}
export {};
