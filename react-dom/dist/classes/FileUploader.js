"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compressorjs_1 = require("compressorjs");
class FileUploader {
    options;
    constructor(options) {
        this.options = options;
        if (this.options.maxSize)
            this.options.maxSize = this.options.maxSize * 1000000;
    }
    upload(file) {
        if (this.options.extensions.length > 0) {
            let fileName = file.name.toLowerCase();
            let extensionError = true;
            for (let ext of this.options.extensions) {
                if (fileName.endsWith(ext.toLowerCase()))
                    extensionError = false;
            }
            if (extensionError) {
                if (typeof this.options.onError == "function")
                    this.options.onError(file, "EXTENSION");
                return;
            }
        }
        if (this.options.maxSize && file.size > this.options.maxSize && (!file.type.startsWith('image') || !this.options.compressImages)) {
            if (typeof this.options.onError == "function")
                this.options.onError(file, "SIZE");
            return;
        }
        if (this.options.onStart)
            this.options.onStart(file);
        let fileReader = new FileReader();
        //Events
        fileReader.onprogress = event => {
            if (typeof this.options.onProgress == "function")
                this.options.onProgress(file, Math.round((event.loaded / event.total) * 100)); // (file, percentage)
        };
        fileReader.onload = () => {
            if (typeof this.options.onUploaded == "function") {
                if (this.options.maxSize && file.size > this.options.maxSize && file.type.startsWith('image') && this.options.compressImages)
                    new compressorjs_1.default(file, {
                        quality: (this.options.maxSize / file.size),
                        success: result => this.options.onUploaded(file, result, URL.createObjectURL(result))
                    });
                else
                    this.options.onUploaded(file, file, fileReader.result);
            }
        };
        // Read file asynchronously.
        fileReader.readAsDataURL(file); // fileReader.result -> String
    }
}
exports.default = FileUploader;
