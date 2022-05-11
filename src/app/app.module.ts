import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './features/app-header/app-header.component';
import { AppFooterComponent } from './features/app-footer/app-footer.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppQuery, AppStore } from 'src/app/services/states/app.state';
import { ContactQuery, ContactStore } from 'src/app/services/states/contact.state';
import { ContactsQuery, ContactsStore } from 'src/app/services/states/contacts.state';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [
    AppStore,
    AppQuery,
    ContactQuery,
    ContactStore,
    ContactsQuery,
    ContactsStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
