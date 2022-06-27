import { BehaviorSubject, distinctUntilChanged, map, Observable } from "rxjs";

export class SpState<TState = any> {
    private initialState: TState;
    private state: BehaviorSubject<Readonly<TState>>;
    private options?: Partial<ISpStateOptions>;

    constructor(initialState: TState, options?: Partial<ISpStateOptions>) {
        this.initialState = initialState;
        this.options = options;

        if (this.options?.isDev) {
            this.deepFreeze(this.initialState);
        }
        this.state = new BehaviorSubject(initialState);
    }

    private deepFreeze(obj: any) {
        Object.keys(obj)?.forEach(prop => {
            if (typeof obj[prop] === 'object') {
                this.deepFreeze(obj[prop]);
            }
        });
        return Object.freeze(obj);
    };

    public getValue(): Readonly<TState> {
        return this.state.getValue();
    }

    public select(): Observable<Readonly<TState>>;
    public select<K extends keyof TState>(key: K): Observable<Readonly<TState[K]>>;
    public select<R>(arg: (store: TState) => R): Observable<Readonly<R>>;
    public select<R>(arg?: keyof TState | ((store: TState) => Readonly<R>)) {
        const stateObs = this.state.asObservable().pipe(distinctUntilChanged());
        if (typeof (arg) === 'function') {
            return stateObs.pipe(map(arg));
        } else if (typeof (arg) === 'string') {
            return stateObs.pipe(map(s => s[arg]));
        }
        return stateObs;
    }

    public update(state: Partial<TState>) {
        const newState = { ...this.getValue(), ...state };
        if (this.options?.isDev) {
            this.deepFreeze(this.initialState);
        }
        this.state.next(newState);
    }

    public reset() {
        const newState = Object.assign({}, this.initialState);
        if (this.options?.isDev) {
            this.deepFreeze(this.initialState);
        }
        this.state.next(newState);
    }
}

export interface ISpStateOptions {
    isDev: boolean;
}
