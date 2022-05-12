import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import DevExpress from 'devextreme';
import { distinctUntilChanged, map, Subject, takeUntil, tap } from 'rxjs';
import { ContactQuery, IContact } from 'src/app/services/states/contact.state';
import { ContactsQuery } from 'src/app/services/states/contacts.state';

@Component({
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit, OnDestroy {
  private destroySubject$ = new Subject<void>();
  private paramContactId$ = this.activatedRoute.params.pipe(
    map<Params, string>(params => params['id']),
    distinctUntilChanged()
  );


  public isLoading$ = this.state.selectLoading();
  public isEditing$ = this.state.select(s => s.isEditing);
  public error$ = this.state.selectError();
  public editableContact?: Partial<IContact>;
  public contact$ = this.state.select(s => s.contact).pipe(
    tap(contact => { this.editableContact = this.parseEditableContact(contact); })
  );



  constructor(private state: ContactQuery,
    private contactsState: ContactsQuery,
    private activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.paramContactId$.pipe(takeUntil(this.destroySubject$))
      .subscribe((paramContactId) => {
        this.setContactById(paramContactId);
      });
  }
  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.unsubscribe();
  }

  private parseEditableContact(contact?: IContact): Partial<IContact> | undefined {
    if (contact) {
      return { 
        firstName: contact.firstName,
        lastName: contact.lastName,
        birthDate: contact.birthDate 
      };
    }
    return undefined
  }
  private setContactById(newContactId: string) {
    const contactId = this.state.getValue().contact?.id;
    if (!contactId || contactId !== newContactId) {
      const contact = this.contactsState.getContact(newContactId);

      if (contact) {
        this.state.update(contact);
      } else {
        this.state.loadContact(newContactId);
      }
    }
  }


  public onContactFieldChanged(event: DevExpress.ui.dxForm.FieldDataChangedEvent) {
    debugger;
  }

  public onSaveClicked(event: DevExpress.ui.dxButton.ClickEvent) {
    debugger;
  }

}
