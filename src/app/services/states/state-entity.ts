import { BehaviorSubject, Observable } from "rxjs";

export class StateEntity<T> {
    private valueSubject: BehaviorSubject<T>;
    public value$: Observable<T>;

    public constructor(initialState: T) {
        this.valueSubject = new BehaviorSubject<T>(initialState);
        this.value$ = this.valueSubject.asObservable();
    }

    public getValue(): T {
        return this.valueSubject.getValue();
    }

    public update(value: T) {
        this.valueSubject.next(value);
    }
}

export class StateArray<T> extends StateEntity<T[]> {
    private equal: (v1: T, v2: T) => boolean;

    public constructor(initialState: T[], equalFunc?: (v1: T, v2: T) => boolean) {
        super(initialState);
        this.equal = equalFunc || ((v1: T, v2: T) => v1 === v2);
    }

    public find(value: T): T | undefined {
        const values = this.getValue();
        return values.find((v => this.equal(v, value)));
    }
    public findIndex(value: T): number {
        const values = this.getValue();
        return values.findIndex((v => this.equal(v, value)));
    }

    public push(...newValues: T[]) {
        const values = this.getValue();
        values.push(...newValues);
        this.update(values);
    }
    public unshift(value: T) {
        const values = this.getValue();
        values.unshift(value);
        this.update(values);
    }
    public pop(): T | undefined {
        const values = this.getValue();
        const removedValue = values.pop();
        this.update(values);
        return removedValue;
    }
    public shift(): T | undefined {
        const values = this.getValue();
        const removedValue = values.shift();
        this.update(values);
        return removedValue;
    }
    public splice(start: number, deleteCount?: number): T[] {
        const values = this.getValue();
        const removedValues = values.splice(start, deleteCount);
        this.update(values);
        return removedValues;
    }
    public set(value: T) {
        const values = this.getValue();
        const index = values.findIndex((v => this.equal(v, value)));
        if (index >= 0) {
            values[index] = value;
        } else {
            values.push(value);
        }
        this.update(values);
    }
}