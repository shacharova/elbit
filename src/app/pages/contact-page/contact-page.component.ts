import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';
import { ContactQuery } from 'src/app/services/states/contact.state';
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
  public contact$ = this.state.select(s => s.contact);



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

}
