import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'square', pure: false })
export class SquarePipe implements PipeTransform {
    transform(value: number | string): any {
        if (typeof value === 'string') {
            value = +value;
        }
        return value * value;
    }
}