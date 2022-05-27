import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Query } from '@datorama/akita';
import { tap } from 'rxjs';
import { ContactsApiService } from 'src/app/services/apis/contacts-api.service';
import { AppQuery } from 'src/app/services/states/app.state';
import { ContactsQuery } from 'src/app/services/states/contacts.state';

export interface IContact {
    id?: string;
    firstName?: string;
    lastName?: string;
    birthDate?: Date;
    created?: Date
    pictureSrc?: string;
}

export interface ContactState {
    isEditing: boolean,
    isChanged: boolean,
    contact: IContact
}

@StoreConfig({ name: 'contact' })
export class ContactStore extends Store<ContactState> {
    constructor() {
        const initState: ContactState = {
            isEditing: false,
            isChanged: false,
            contact: {}
        };
        super(initState);
    }
}

@Injectable()
export class ContactQuery extends Query<ContactState> {
    constructor(protected override store: ContactStore,
        private contactsState: ContactsQuery,
        private contactsApi: ContactsApiService,
        private appState: AppQuery
    ) {
        super(store);
    }

    public setContact(newContact: IContact) {
        this.store.update({ contact: newContact });
    }

    public loadContact(contactId: string) {
        this.store.setLoading(true);
        this.contactsApi.readContact(contactId).subscribe({
            next: (contact) => this.store.update({ contact: contact }),
            error: this.store.setError,
            complete: () => this.store.setLoading(false)
        });
    }
    public saveContact(contact: Partial<IContact>) {
        this.store.setLoading(true);
        return this.contactsApi.upsertContact(contact).pipe(
            tap({
                next: (savedContactId) => {
                    if (contact.id === savedContactId) {
                        this.store.update({ contact: contact });
                        this.appState.setToast('איש הקשר עודכן בהצלחה', 'success');
                    } else {
                        if (contact.id) {
                            this.contactsState.removeContact(contact.id);
                        }
                        this.contactsState.addContact({ ...contact, id: savedContactId });
                        this.appState.setToast('איש הקשר נוצר בהצלחה', 'success');
                    }
                },
                error: this.store.setError,
                complete: () => {
                    this.store.setLoading(false);
                    this.setIsEditing(false);
                    this.setIsChanged(false);
                }
            })
        );
    }

    public setIsEditing(isEditing: boolean) {
        this.store.update({ isEditing: isEditing });
    }

    public setIsChanged(isChanged: boolean) {
        this.store.update({ isChanged: isChanged });
    }

}