import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore';
import { IContactDM } from 'src/app/services/apis/contacts-api-dm.interfaces';
import { IContact } from 'src/app/services/states/contact.state';




@Injectable({ providedIn: 'root' })
export class ContactsApiService {
  private mockedContacts: IContact[] = [
    {id: '1', firstName: 'שחר', lastName: 'עובדיה', birthDate: new Date(1987, 7, 15), created: new Date()},
    {id: '2', firstName: 'רוני', lastName: 'מקרוני', birthDate: new Date(1997, 3, 3), created: new Date()},
    {id: '3', firstName: 'דויד', lastName: 'המלך', birthDate: new Date(1986, 2, 23), created: new Date()}
  ];

  constructor(private firestore: AngularFirestore) {
  }


  private parseContacts(snap: QuerySnapshot<IContactDM>): IContact[] {
    return snap.docs.map((doc) => {
      const contactDM: IContactDM = doc.data();
      const created = contactDM.created.toDate();
      const birthDate = contactDM.birthDate.toDate();
      const contact: IContact = { ...contactDM, id: doc.id, created, birthDate };
      return contact;
    });
  }

  public readContacts(): Observable<IContact[]> {
    return of(this.mockedContacts);
    // return this.firestore.collection<IContactDM>('contacts').get().pipe(map(this.parseContacts));
  }

  public createContact(contact: IContact): Observable<IContact> {
    const createdContact: IContact = { id: '1', firstName: 'יובל', lastName: 'המבולבל', birthDate: new Date(1927, 2, 22) };
    return of(createdContact);
  }
  public readContact(contactId: string): Observable<IContact | undefined> {
    const contact = this.mockedContacts.find(c => c.id === contactId);
    return of(contact);
    // return this.firestore.collection<IContactDM>('contacts').get().pipe(map(this.parseContacts));
  }
  public updateContact(contact: IContact): Observable<IContact> {
    const updatedContact: IContact = { id: '1', firstName: 'Shachar', lastName: 'Ovadya', birthDate: new Date(1987, 7, 15) };
    return of(updatedContact);
  }
  public deleteContact(contactId: string): Observable<string> {
    return of(contactId);
  }
}


