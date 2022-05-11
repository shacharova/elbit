import { Timestamp } from '@firebase/firestore-types';

export type MyTimestamp = Timestamp;
export interface IContactDM {
    birthDate: Timestamp;
    created: Timestamp;
    firstName: string;
    lastName: string;
}