export interface IEnvironment {
    production: boolean;
    firebase: IFirebaseConfig;
}
export interface IFirebaseConfig {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    locationId: string;
}

