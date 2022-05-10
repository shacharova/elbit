export interface IEnvironment {
    production: boolean;
    contactsApiBaseUrl: string;
}

export interface IContact {
    id: string | number;
    firstName: string;
    lastName: string;
    birthDate: Date;
}