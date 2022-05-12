import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from 'src/app/features/app-header/app-header.component';
import { DxButtonModule } from 'devextreme-angular';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    AppHeaderComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    DxButtonModule
  ],
  exports: [
    AppHeaderComponent
  ]
})
export class AppHeaderModule { }
