import { BehaviorSubject, distinctUntilChanged, map, Observable } from "rxjs";

export class SpState<TState = any> {
    private initialState: TState;
    private state: BehaviorSubject<Readonly<TState>>;

    constructor(initialState: TState) {
        this.initialState = initialState;
        this.state = new BehaviorSubject(initialState);
    }

    public getValue(): TState {
        return this.state.getValue();
    }

    public select(): Observable<TState>;
    public select<K extends keyof TState>(key: K): Observable<TState[K]>;
    public select<R>(arg: (store: TState) => R): Observable<R>;
    public select<R>(arg?: keyof TState | ((store: TState) => R)) {
        const stateObs = this.state.asObservable().pipe(distinctUntilChanged());
        if (typeof (arg) === 'function') {
            return stateObs.pipe(map(arg));
        } else if (typeof (arg) === 'string') {
            return stateObs.pipe(map(s => s[arg]));
        }
        return stateObs;
    }

    public update(state: Partial<TState>) {
        this.state.next({ ...this.getValue(), ...state });
    }

    public reset() {
        this.state.next(Object.assign({}, this.initialState));
    }
}
