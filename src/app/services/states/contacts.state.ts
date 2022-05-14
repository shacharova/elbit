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

    /** Read contacts from database and then set them into state */
    public loadContacts() {
        this.store.setLoading(true);
        this.contactsApi.readContacts().subscribe({
            next: (newContacts) => this.store.update({ contacts: newContacts }),
            error: this.store.setError,
            complete: () => this.store.setLoading(false)
        });
    }

    /** Delete a contact from database. If deleted successfully then remove him from state. */
    public deleteContact(contectId: string) {
        this.store.setLoading(true);
        this.contactsApi.deleteContact(contectId).subscribe({
            next: (deletedId) => {
                this.removeContact(deletedId);
            },
            error: this.store.setError,
            complete: () => this.store.setLoading(false)
        });
    }



    /** Get contact (by id) from state or undefined if NOT exists */
    public getContact(contactId: string): IContact | undefined {
        const contacts = this.getValue().contacts;
        return contacts.find(c => c.id === contactId);
    }

    /** Remove contact (if exists by id) from state */
    public removeContact(contactId: string) {
        const contacts = Array.from(this.store.getValue().contacts);
        const index = contacts.findIndex(c => c.id === contactId);
        if (index >= 0) {
            contacts.splice(index, 1);
            this.store.update({contacts: contacts});
        }
    }
    /** Add new contact (if NOT exists by id) to state */
    public addContact(contact: IContact) {
        const contacts = Array.from(this.store.getValue().contacts);
        const index = contacts.findIndex(c => c.id === contact.id);
        if (index === -1) {
            contacts.unshift(contact);
            this.store.update({contacts: contacts});
        }
    }
    
}