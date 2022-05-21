import { ChangeDetectionStrategy, Component, HostListener, NgZone, OnInit, Renderer2 } from '@angular/core';
import { akitaDevtools } from '@datorama/akita';
import { distinctUntilChanged } from 'rxjs';
import { AppQuery } from 'src/app/services/states/app.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public isRTL$ = this.state.select(s => s.isRTL);
  public toast$ = this.state.select(s => s.toast);

  @HostListener('window:resize') onWindowResize() {
    this.state.notifyWindowSizeChanged();
  }

  public constructor(private state: AppQuery, private renderer: Renderer2, private ngZone: NgZone) {
    if (!environment.production) {
      akitaDevtools(this.ngZone);
    }
  }

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
