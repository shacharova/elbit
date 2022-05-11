import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Query } from '@datorama/akita';

export interface AppState {
    isRTL: boolean;
}

@StoreConfig({ name: 'app' })
export class AppStore extends Store<AppState> {
    constructor() {
        const initState: AppState = { isRTL: true };
        super(initState);
    }
}

@Injectable({providedIn: 'root'})
export class AppQuery extends Query<AppState> {
    allState$ = this.select();
    isRTL$ = this.select(state => state.isRTL);

    constructor(protected override store: AppStore) {
        super(store);
    }
}