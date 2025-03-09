/**
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 * @description Compile a file template with handlebars
 */
import { readFileSync } from "fs";
import Handlebars from "handlebars";

export const compileTemplate = (templatePath: string, data: object): string => {
    const templateContent = readFileSync(templatePath, 'utf8');
    const compiledTemplate = Handlebars.compile(templateContent);
    return compiledTemplate(data);
}