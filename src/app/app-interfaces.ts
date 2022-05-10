export interface IEnvironment {
    production: boolean;
    contactsApiBaseUrl: string;
    firebaseConfig: IFirebaseConfig;
}
export interface IFirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

export interface IContact {
    id: string | number;
    firstName: string;
    lastName: string;
    birthDate?: Date;
    created?: Date
}