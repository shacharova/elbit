import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'square', pure: false })
export class SquarePipe implements PipeTransform {
    private counter: number = 0;
    transform(value: number | string): any {
        this.counter += 1;
        debugger;
        if (typeof value === 'string') {
            value = +value;
        }
        return value * value;
    }
}