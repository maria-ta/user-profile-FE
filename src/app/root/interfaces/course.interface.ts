import { IUser } from './user.interface';

export interface ICourse {
  id: string;
  title: string;
  description: string;
  author?: IUser;
  finished?: number;
  planned?: number;
  isStarted?: boolean;
}
