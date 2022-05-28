import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'memoize', pure: true })
export class MemoizePipe implements PipeTransform {
    transform(fn: Function, ...args: any[]): any {
        return fn(...args);
    }
}