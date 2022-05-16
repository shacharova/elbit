import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsPageRoutingModule } from './contacts-page-routing.module';
import { ContactsComponent } from './contacts-page.component';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { ConfirmPopupModule } from 'src/app/controls/confirm-popup/confirm-popup.module';


@NgModule({
  declarations: [
    ContactsComponent
  ],
  imports: [
    CommonModule,
    ContactsPageRoutingModule,
    DxButtonModule,
    DxDataGridModule,
    ConfirmPopupModule
  ],
  providers: [ ]
})
export class ContactsPageModule { }
