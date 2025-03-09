import Compressor from "compressorjs"

export type FileUploadError = "EXTENSION"|"SIZE"

type FileUploaderOptions = {
    extensions: string[],
    maxSize?: number, //Megas
    compressImages?: boolean,
    onStart: (file: File) => void, 
    onUploaded: (file: File, dataToUpload: File|Blob, result: string|ArrayBuffer|null) => void, 
    onError: (file: File, errorType: FileUploadError) => void, 
    onProgress: (file: File, percentage: number) => void
}

export default class FileUploader{
    options: FileUploaderOptions

    constructor(options: FileUploaderOptions){
        this.options = options
        if(this.options.maxSize) this.options.maxSize = this.options.maxSize * 1000000
    }

    upload(file: File){
        if(this.options.extensions.length > 0){
		    let fileName = file.name.toLowerCase()
            let extensionError = true 
            for(let ext of this.options.extensions){
                if(fileName.endsWith(ext.toLowerCase()))
                    extensionError = false
            }
            if(extensionError){
                if(typeof this.options.onError == "function")
                    this.options.onError(file, "EXTENSION")
                return;
            }
	    }
        if(this.options.maxSize && file.size > this.options.maxSize && (!file.type.startsWith('image') || !this.options.compressImages)){
            if(typeof this.options.onError == "function")
                this.options.onError(file, "SIZE")
            return
        }
        
        if(this.options.onStart)
            this.options.onStart(file)
        let fileReader = new FileReader()
        //Events
        fileReader.onprogress = event => {
            if(typeof this.options.onProgress == "function")
                this.options.onProgress(file, Math.round((event.loaded/event.total) * 100)) // (file, percentage)
        }
        fileReader.onload = () => {
            if(typeof this.options.onUploaded == "function"){
                if(this.options.maxSize && file.size > this.options.maxSize && file.type.startsWith('image') && this.options.compressImages)
                    new Compressor(file, {
                        quality: (this.options.maxSize / file.size), 
                        success: result => this.options.onUploaded(file, result, URL.createObjectURL(result))
                    })
                else
                    this.options.onUploaded(file, file, fileReader.result)
            }
        }

        // Read file asynchronously.
        fileReader.readAsDataURL(file); // fileReader.result -> String
    }
}