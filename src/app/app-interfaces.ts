export interface IEnvironment {
    production: boolean;
    contactsApiBaseUrl: string;
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

export interface IContact {
    id: string | number;
    firstName: string;
    lastName: string;
    birthDate?: Date;
    created?: Date
}