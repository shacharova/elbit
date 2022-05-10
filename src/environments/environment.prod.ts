import { IEnvironment } from "src/app/app-interfaces";

export const environment: IEnvironment = {
  production: true,
  contactsApiBaseUrl: '',
  firebaseConfig: {
    apiKey: '<<your data>>',
    authDomain: '<<your data>>',
    projectId: '<<your data>>',
    storageBucket: '<<your data>>',
    messagingSenderId: '<<your data>>',
    appId: '<<your data>>'
  }
};
