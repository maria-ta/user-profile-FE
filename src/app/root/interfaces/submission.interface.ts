import { IUser } from './user.interface';
import { Moment } from 'moment';
import { ITask } from './task.interface';

export interface ISubmission {
  id: string;
  student: IUser;
  task: ITask;
  startedDateTime: Moment;
  finishedDateTime?: Moment;
  comment?: string;
  mark?: number;
}
