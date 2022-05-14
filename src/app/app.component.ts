import { ChangeDetectionStrategy, Component, OnInit, Renderer2 } from '@angular/core';
import { distinctUntilChanged } from 'rxjs';
import { AppQuery } from 'src/app/services/states/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public isRTL$ = this.state.select(s => s.isRTL);
  public toast$ = this.state.select(s => s.toast);
  
  public constructor(private state: AppQuery, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.handleIsRTLChanged();
  }

  private handleIsRTLChanged() {
    this.isRTL$.pipe(distinctUntilChanged()).subscribe((isRTL) => {
      if (isRTL) {
        this.renderer.addClass(document.querySelector('html'), 'dx-rtl');
      } else {
        this.renderer.removeClass(document.querySelector('html'), 'dx-rtl');
      }
    });
  }
}
