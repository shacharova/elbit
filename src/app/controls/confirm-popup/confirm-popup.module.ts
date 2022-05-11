import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule, DxPopupModule } from 'devextreme-angular';
import { ConfirmPopupComponent } from 'src/app/controls/confirm-popup/confirm-popup.component';



@NgModule({
  declarations: [
    ConfirmPopupComponent
  ],
  imports: [
    CommonModule,
    DxPopupModule,
    DxButtonModule
  ],
  exports: [ConfirmPopupComponent]
})
export class ConfirmPopupModule { }
