import { Injectable } from '@angular/core';
import { StateEntity } from 'src/app/services/states/state-entity';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public isRTL = new StateEntity<boolean>(true);
  
  constructor() { }
}
