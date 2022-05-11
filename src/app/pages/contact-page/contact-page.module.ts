import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactPageRoutingModule } from './contact-page-routing.module';
import { ContactComponent } from './contact-page.component';
import { DxButtonModule } from 'devextreme-angular';



@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactPageRoutingModule,
    DxButtonModule
  ],
  providers: [

  ]
})
export class ContactPageModule { }
