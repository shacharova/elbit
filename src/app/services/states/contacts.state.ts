import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Query } from '@datorama/akita';
import { ContactsApiService } from 'src/app/services/apis/contacts-api.service';
import { IContact } from 'src/app/services/states/contact.state';


export interface ContactsState {
    contacts: IContact[];
}

@StoreConfig({ name: 'contacts' })
export class ContactsStore extends Store<ContactsState> {
    constructor() {
        const initState: ContactsState = {
            contacts: []
        };
        super(initState);
    }
}

@Injectable({ providedIn: 'root' })
export class ContactsQuery extends Query<ContactsState> {

    constructor(protected override store: ContactsStore, private contactsApi: ContactsApiService) {
        super(store);
    }

    public loadContacts() {
        this.store.setLoading(true);
        this.contactsApi.readContacts().subscribe({
            next: (newContacts) => this.store.update({ contacts: newContacts }),
            error: this.store.setError,
            complete: () => this.store.setLoading(false)
        });
    }

    public getContact(contactId: string): IContact | undefined {
        const contacts = this.getValue().contacts;
        return contacts.find(c => c.id === contactId);
    }

    public deleteContact(contectId: string) {
        this.store.setLoading(true);
        this.contactsApi.deleteContact(contectId).subscribe({
            next: (deletedId) => {
                const contacts = Array.from(this.store.getValue().contacts);
                const index = contacts.findIndex(c => c.id === deletedId);
                if (index >= 0) {
                    contacts.splice(index, 1);
                    this.store.update({contacts: contacts});
                }
            },
            error: this.store.setError,
            complete: () => this.store.setLoading(false)
        });
    }
}