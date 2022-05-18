import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact-page.component';

const routes: Routes = [
  { path: '', component: ContactComponent },
  { path: ':id', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactPageRoutingModule { }
