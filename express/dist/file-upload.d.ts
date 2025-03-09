import * as Express from "express";
/**
 *
 * @param file
 * @param fileNameToSave without extension
 * @param destFolder
 */
export declare function moveUploadedFile(file: Express.Multer.File, baseName: string, destFolder: string): string;
