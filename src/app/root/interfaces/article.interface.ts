import { IUser } from './user.interface';
import { ITag } from './tag.interface';

export interface IArticle {
  id: string;
  title: string;
  text: string;
  author: IUser;
  tags: ITag[];
}
