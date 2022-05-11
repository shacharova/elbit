import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Query } from '@datorama/akita';
import { ContactsApiService } from 'src/app/services/apis/contacts-api.service';

export interface IContact {
    id?: string;
    firstName: string;
    lastName?: string;
    birthDate?: Date;
    created?: Date
    pictureSrc?: string;
}

export interface ContactState {
    isLoading: boolean,
    isEditing: boolean,
    contact?: IContact
}

@StoreConfig({ name: 'contact' })
export class ContactStore extends Store<ContactState> {
    constructor() {
        const initState: ContactState = {
            isLoading: false,
            isEditing: false
        };
        super(initState);
    }
}

@Injectable()
export class ContactQuery extends Query<ContactState> {
    public allState$ = this.select();
    public isLoading$ = this.select(state => state.isLoading);
    public contact$ = this.select(state => state.contact);

    constructor(protected override store: ContactStore, private contactsApi: ContactsApiService) {
        super(store);
    }

    public update(newContact: IContact) {
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

    
}