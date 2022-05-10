import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'contacts', loadChildren: () => import('./pages/contacts-page/contacts-page.module').then(m => m.ContactsPageModule) },
  { path: 'contact/:id', loadChildren: () => import('./pages/contact-page/contact-page.module').then(m => m.ContactPageModule) },
  { path: '**', redirectTo: 'contacts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
