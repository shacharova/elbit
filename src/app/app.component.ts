import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppStateService } from 'src/app/services/states/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public isRTL$ = this.state.isRTL.value$;

  public constructor(private state: AppStateService) {
    
  }
}
