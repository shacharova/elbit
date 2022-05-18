import { Injectable } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { IContact } from 'src/app/services/states/contact.state';
import { Timestamp } from 'firebase/firestore';




@Injectable({ providedIn: 'root' })
export class ContactsApiService {
  private mockedContacts: IContact[] = [
    { id: '1', firstName: 'שחר', lastName: 'עובדיה', birthDate: new Date(1987, 7, 15), created: new Date() },
    { id: '2', firstName: 'רוני', lastName: 'מקרוני', birthDate: new Date(1997, 3, 3), created: new Date() },
    { id: '3', firstName: 'דויד', lastName: 'המלך', birthDate: new Date(1986, 2, 23), created: new Date() }
  ];

  constructor(private firestore: AngularFirestore) {
  }


  private parseContacts(docs: QueryDocumentSnapshot<Partial<IContactDM>>[]): IContact[] {
    return docs.map((doc) => this.parseContact(doc.id, doc.data()));
  }
  
  private parseContact(contactId: string, contactDM?: Partial<IContactDM>): IContact {
    return {
      id: contactId,
      firstName: contactDM?.firstName,
      lastName: contactDM?.lastName,
      birthDate: contactDM?.birthDate?.toDate(),
      created: contactDM?.created?.toDate()
    };
  }
  private parseContactDM(contact: IContact): Partial<IContactDM> {
    const contactDM: Partial<IContactDM> = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      birthDate: contact.birthDate ? Timestamp.fromDate(contact.birthDate) : undefined,
      created: Timestamp.fromDate(contact.created || new Date())
    };
    return contactDM;
  }



  public readContacts(): Observable<IContact[]> {
    // return of(this.mockedContacts);
    return this.firestore.collection<Partial<IContactDM>>('contacts').get().pipe(
      map((snap) => this.parseContacts(snap.docs))
    );
  }

  public upsertContact(contact: Partial<IContact>): Observable<string> {
    const contactDM = this.parseContactDM(contact);

    const docRef = this.firestore.collection<Partial<IContactDM>>('contacts').ref.doc(contact.id); // {merge: true, mergeFields: true}
    return from(docRef.set(contactDM/** , { merge: true } */)).pipe(
      map<void, string>(() => docRef.id)
    );

    // const createdContact: IContact = { id: '1', firstName: 'יובל', lastName: 'המבולבל', birthDate: new Date(1927, 2, 22) };
    // return of(createdContact);
  }
  public readContact(contactId: string) {
    // const contact = this.mockedContacts.find(c => c.id === contactId);
    // return of(contact);
    return this.firestore.collection<Partial<IContactDM>>('contacts').doc(contactId).get().pipe(
      map((doc) => this.parseContact(doc.id, doc.data()) )
    );
  }
  public deleteContact(contactId: string): Observable<string> {
    return of(contactId);
  }
}





export interface IContactDM {
  firstName: string;
  lastName: string;
  birthDate: Timestamp;
  created: Timestamp;
}