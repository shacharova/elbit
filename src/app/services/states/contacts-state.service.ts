import { Injectable } from '@angular/core';
import { IContact } from 'src/app/app-interfaces';
import { ContactsApiService } from 'src/app/services/apis/contacts-api.service';
import { StateArray } from 'src/app/services/states/state-entity';

@Injectable({ providedIn: 'root' })
export class ContactsStateService {
  public contants = new StateArray<IContact>([], (v1: IContact, v2: IContact) => v1.id === v2.id);

  constructor(private api: ContactsApiService) { }

  public loadContacts() {
    this.api.readContacts().subscribe((contacts) => {
      this.contants.update(contacts);
    });
  }

  public setContact(contact: IContact) {
    const obs = contact.id ? this.api.updateContact(contact) : this.api.createContact(contact);

    obs.subscribe((updatedContact) => {
      this.contants.set(updatedContact);
    });
  }
}




