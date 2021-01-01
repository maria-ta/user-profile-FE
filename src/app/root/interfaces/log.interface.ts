import { Moment } from 'moment';

export interface ILog {
  id: string;
  key: string;
  userId: string;
  entityId: string;
  datetime: Moment;
}
