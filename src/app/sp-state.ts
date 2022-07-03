import { BehaviorSubject, distinctUntilChanged, map, Observable } from "rxjs";

export class SpState<TState = any> {
	

    private initialState: Readonly<TState>;
    private stateSubject?: BehaviorSubject<Readonly<TState>>;
    private options?: Partial<ISpStateOptions>;

    constructor(initialState: TState, options?: Partial<ISpStateOptions>) {
        this.options = options;
        this.initialState = initialState;
        this.setNewState(Object.assign({}, initialState));
    }

    private deepFreeze(obj: any) {
        Object.keys(obj)?.forEach(prop => {
            if (typeof obj[prop] === 'object') {
                this.deepFreeze(obj[prop]);
            }
        });
        return Object.freeze(obj);
    };
    private setNewState(newState: TState) {
        if (this.options?.isDev) {
            this.deepFreeze(newState);
        }
        if (this.stateSubject) {
            this.stateSubject.next(newState);
        } else {
            this.stateSubject = new BehaviorSubject(newState);
        }
    }


    public getValue(): Readonly<TState> {
        return this.stateSubject!.getValue();
    }

    public select(): Observable<Readonly<TState>>;
    public select<K extends keyof TState>(key: K): Observable<Readonly<TState[K]>>;
    public select<R>(selector: (store: TState) => R): Observable<Readonly<R>>;
    public select<R>(arg?: keyof TState | ((store: TState) => Readonly<R>)) {
        const stateObs = this.stateSubject!.asObservable();
        if (typeof (arg) === 'function') {
            return stateObs.pipe(map(arg), distinctUntilChanged());
        } else if (typeof (arg) === 'string') {
            return stateObs.pipe(map(s => s[arg]), distinctUntilChanged());
        }
        return stateObs.pipe(distinctUntilChanged());
    }

    public update(state: Partial<TState>) {
        this.setNewState({ ...this.getValue(), ...state });
    }

    public reset(): void;
    public reset(key: keyof TState): void;
    public reset(...key: (keyof TState)[]): void;
    public reset(keys: (keyof TState)[]): void;
    public reset(arg?: keyof TState | (keyof TState)[]) {
        if (typeof (arg) === 'string') {
            arg = [arg];
        }

        if (Array.isArray(arg)) {
            const partialInitial: Partial<TState> = {};
            arg.forEach(prop => {
                partialInitial[prop] = this.initialState[prop];
            });
            const newState = Object.assign({}, this.getValue(), partialInitial);
            this.setNewState(newState);
        } else {
            this.setNewState(Object.assign({}, this.initialState));
        }
    }

    public fixation(): void;
    public fixation(key: keyof TState): void;
    public fixation(...key: (keyof TState)[]): void;
    public fixation(keys: (keyof TState)[]): void;
    public fixation(arg?: keyof TState | (keyof TState)[]) {
        if (typeof (arg) === 'string') {
            arg = [arg];
        }

        if (Array.isArray(arg)) {
            const partialState: Partial<TState> = {};
            arg.forEach(prop => {
                partialState[prop] = this.getValue()[prop];
            });
            this.initialState = Object.assign({}, this.initialState, partialState);
        } else {
            this.initialState = Object.assign({}, this.getValue());
        }
    }
}

export interface ISpStateOptions {
    isDev: boolean;
}
