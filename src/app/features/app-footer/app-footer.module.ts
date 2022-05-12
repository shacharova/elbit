import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFooterComponent } from 'src/app/features/app-footer/app-footer.component';



@NgModule({
  declarations: [
    AppFooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppFooterComponent
  ]
})
export class AppFooterModule { }
