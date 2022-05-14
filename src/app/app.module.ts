import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppQuery, AppStore } from 'src/app/services/states/app.state';
import { ContactQuery, ContactStore } from 'src/app/services/states/contact.state';
import { ContactsQuery, ContactsStore } from 'src/app/services/states/contacts.state';
import { AppFooterModule } from 'src/app/features/app-footer/app-footer.module';
import { AppHeaderModule } from 'src/app/features/app-header/app-header.module';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { DxToastModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AkitaNgRouterStoreModule,
    AppHeaderModule,
    AppFooterModule,
    DxToastModule
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
