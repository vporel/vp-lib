"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileTemplate = void 0;
/**
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 * @description Compile a file template with handlebars
 */
const fs_1 = require("fs");
const handlebars_1 = require("handlebars");
const compileTemplate = (templatePath, data) => {
    const templateContent = (0, fs_1.readFileSync)(templatePath, 'utf8');
    const compiledTemplate = handlebars_1.default.compile(templateContent);
    return compiledTemplate(data);
};
exports.compileTemplate = compileTemplate;
