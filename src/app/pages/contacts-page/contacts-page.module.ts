import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsPageRoutingModule } from './contacts-page-routing.module';
import { ContactsComponent } from './contacts-page.component';


@NgModule({
  declarations: [
    ContactsComponent
  ],
  imports: [
    CommonModule,
    ContactsPageRoutingModule
  ]
})
export class ContactsPageModule { }
