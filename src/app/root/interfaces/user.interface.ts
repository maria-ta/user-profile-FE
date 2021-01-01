import { EGender } from '../enums/gender.enum';
import { Moment } from 'moment';

export interface IUser {
  id: string;
  username: string;
  email: string;
  firstname?: string;
  lastname?: string;
  birthdate?: Moment;
  gender?: EGender;
  image?: string;
}

export interface IUserStringDate {
  id: string;
  username: string;
  email: string;
  firstname?: string;
  lastname?: string;
  birthdate?: string;
  gender?: EGender;
  image?: string;
}
