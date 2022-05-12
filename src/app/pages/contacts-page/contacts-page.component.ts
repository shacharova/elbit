import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import DevExpress from 'devextreme';
import { IContact } from 'src/app/services/states/contact.state';
import { ContactsQuery } from 'src/app/services/states/contacts.state';

@Component({
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent implements OnInit {
  private selectedContactId?: string;

  public isShowDeleteConfirm: boolean = false;

  public contacts$ = this.state.select(s => s.contacts)

  constructor(private state: ContactsQuery, private router: Router) { }

  ngOnInit(): void {
    this.state.loadContacts();
  }

  public onTrashClick(contactId: string, dxEvent: DevExpress.ui.dxButton.ClickEvent) {
    dxEvent?.event?.stopPropagation()
    this.selectedContactId = contactId;
    this.isShowDeleteConfirm = true;
  }
  public onDeleteContactConfirmed() {
    if (this.selectedContactId) {
      this.isShowDeleteConfirm = false;
      this.state.deleteContact(this.selectedContactId);
      this.selectedContactId = undefined;
    }
  }

  public calcNameColumnValue(contact: IContact) {
    return [contact.firstName, contact.lastName].join(' ');
  }

  public onRowClick(event: DevExpress.ui.dxDataGrid.RowClickEvent) {
    const cotnact = event.data as IContact;
    this.router.navigate([`/contact/${cotnact.id}`]);
  }
}
