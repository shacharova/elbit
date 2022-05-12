// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IEnvironment } from "src/app/app-interfaces";

export const environment: IEnvironment = {
  production: false,
  firebase: {
    projectId: 'elbit-5013d',
    appId: '1:238811088680:web:78789c23392c02a66f321d',
    databaseURL: 'https://elbit-5013d-default-rtdb.firebaseio.com',
    storageBucket: 'elbit-5013d.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyCOLw_AvBsve5d8DuGO7r30NJq6KJNsy4Q',
    authDomain: 'elbit-5013d.firebaseapp.com',
    messagingSenderId: '238811088680',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
