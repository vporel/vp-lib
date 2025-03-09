import { PipeTransform } from "@nestjs/common";
export default class ParseJSONPipe implements PipeTransform {
    transform(value: any): any;
}
