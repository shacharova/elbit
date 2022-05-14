import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterQuery } from '@datorama/akita-ng-router-store';
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
  public isChanged$ = this.state.select(s => s.isChanged);
  public error$ = this.state.selectError();
  public editableContact?: Partial<IContact>;
  public contact$ = this.state.select(s => s.contact).pipe(
    tap(contact => { this.editableContact = { ...contact }; })
  );



  constructor(private state: ContactQuery,
    private contactsState: ContactsQuery,
    private activatedRoute: ActivatedRoute,
    private routerQuery: RouterQuery) {
  }
  ngOnInit(): void {
    this.routerQuery.selectQueryParams('edit').pipe(takeUntil(this.destroySubject$))
      .subscribe((isEditing) => {
        this.state.setIsEditing(isEditing ? true : false);
      });

    this.paramContactId$.pipe(takeUntil(this.destroySubject$))
      .subscribe((paramContactId) => {
        this.setContactById(paramContactId);
      });
  }
  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.unsubscribe();
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
    this.state.setIsChanged(true);
    // const formContact = event.component.instance().option('formData') as IContact;
  }

  public onSaveClicked(event: DevExpress.ui.dxButton.ClickEvent) {
    if (this.editableContact) {
      const currentState = this.state.getValue();
      if (currentState.isChanged && currentState.isEditing) {
        this.state.saveContact(this.editableContact);
      }
    }
  }

  public onEditClicked(event: DevExpress.ui.dxButton.ClickEvent) {
    this.state.setIsEditing(true);
    this.state.setIsChanged(false);
  }

}
