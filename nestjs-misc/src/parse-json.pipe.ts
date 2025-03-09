import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export default class ParseJSONPipe implements PipeTransform {
  transform(value: any) {
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new BadRequestException('Invalid JSON format');
    }
  }
}