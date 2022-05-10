import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ContactsStateService } from 'src/app/services/states/contacts-state.service';

@Component({
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent implements OnInit {
  public contacts$ = this.state.contants.value$;

  constructor(private state: ContactsStateService) { }

  ngOnInit(): void {
    
  }

}
