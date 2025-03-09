"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description Unit tests for file-upload
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */
const file_upload_1 = require("./file-upload");
const path = require("path");
const os = require("os");
const fs = require("fs");
describe("file-upload", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('moveUploadedFile', () => {
        const mockFile = {
            fieldname: 'file',
            originalname: 'test.txt',
            encoding: '7bit',
            mimetype: 'text/plain',
            size: 1024,
            destination: 'uploads/',
            filename: 'test.txt',
            path: undefined,
            buffer: Buffer.from('test content'),
            stream: null
        };
        it('should move the uploaded file to the destination folder', () => {
            const destFolder = os.tmpdir();
            const baseName = 'file-upload-test-file-' + (new Date()).getTime();
            const result = (0, file_upload_1.moveUploadedFile)(mockFile, baseName, destFolder);
            //test if the file exists in the destination folder
            const expectedPath = path.join(destFolder, result);
            expect(fs.existsSync(expectedPath)).toBe(true);
            fs.unlinkSync(expectedPath); //The file is deleted after the test
        });
    });
});
