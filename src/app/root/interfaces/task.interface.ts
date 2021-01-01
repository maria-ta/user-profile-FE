import { Moment } from 'moment';

export interface ITask {
  id: string;
  title: string;
  description: string;
  deadline?: Moment;
  duration?: number;
  courseId: string;
  order: number;
  isStarted?: boolean;
}
