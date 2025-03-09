/**
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */
import * as path from "path";
import * as mime from "mime-types"
import { existsSync, mkdirSync, renameSync, writeFileSync } from "fs";
import * as Express from "express"

/**
 * 
 * @param file 
 * @param fileNameToSave without extension
 * @param destFolder 
 */
export function moveUploadedFile(file: Express.Multer.File, baseName: string, destFolder: string): string{
    let extension = path.extname(file.filename ?? file.originalname).toLowerCase()
    if(!extension || extension == "") extension = mime.extension(file.mimetype)
    if(!existsSync(destFolder)) mkdirSync(destFolder, {recursive: true})
    const newFileName = baseName + (extension.startsWith(".") ? "" : ".") +  extension
    const destPath = path.join(destFolder, newFileName)
    if(file.path) renameSync(file.path, destPath)
    else writeFileSync(destPath, file.buffer)
    return newFileName
}