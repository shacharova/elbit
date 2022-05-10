import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IContact } from 'src/app/app-interfaces';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactsApiService {
  private baseUrl: string;
  
  constructor(private http: HttpClient) {
    this.baseUrl = environment.contactsApiBaseUrl;
  }

  public readContacts(): Observable<IContact[]> {
    return of([{ id: 1, firstName: 'שחר', lastName: 'עובדיה', birthDate: new Date(1987, 7, 15) }]);
  }

  public createContact(contact: IContact): Observable<IContact> {
    const createdContact: IContact = { id: 1, firstName: 'Shachar', lastName: 'Ovadya', birthDate: new Date(1987, 7, 15) };
    return of(createdContact);
  }
  public readContact(contactId: number): Observable<IContact> {
    const contact: IContact = { id: 1, firstName: 'Shachar', lastName: 'Ovadya', birthDate: new Date(1987, 7, 15) };
    return of(contact);
  }
  public updateContact(contact: IContact): Observable<IContact> {
    const updatedContact: IContact = { id: 1, firstName: 'Shachar', lastName: 'Ovadya', birthDate: new Date(1987, 7, 15) };
    return of(updatedContact);
  }
  public deleteContact(contactId: number): Observable<number> {
    return of(1);
  }
}
