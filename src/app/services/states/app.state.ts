import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Query } from '@datorama/akita';

export interface AppState {
    isRTL: boolean;
    toast?: IToast
}
export interface IToast {
    message: string;
    type: 'info' | 'success' | 'error';
}

@StoreConfig({ name: 'app' })
export class AppStore extends Store<AppState> {
    constructor() {
        const initState: AppState = { isRTL: true };
        super(initState);
    }
}

@Injectable({ providedIn: 'root' })
export class AppQuery extends Query<AppState> {
    private toastId?: ReturnType<typeof setTimeout>;

    constructor(protected override store: AppStore) {
        super(store);
    }

    public setToast(message: string, type: 'info' | 'success' | 'error', duration: number = NaN) {
        if (this.toastId) {
            clearTimeout(this.toastId);
        }
        const currentState = this.store.getValue();

        this.store.update({ ...currentState, toast: { message, type } })

        if (duration > 0) {
            this.toastId = setTimeout(() => {
                this.store.update({ ...currentState, toast: undefined })
            }, duration);
        }
    }
}