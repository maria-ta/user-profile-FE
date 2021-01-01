import { IUser } from '../../interfaces/user.interface';

export interface UserState {
  user: IUser;
}

export const initialUserState: UserState = {
  user: null,
  // user: {
  //   id: '1',
  //   username: 'Johnny',
  //   firstname: 'John',
  //   lastname: 'Doe',
  //   email: 'email@test.email',
  //   image: 'https://i.pinimg.com/564x/89/11/d5/8911d56f9c84aa31cc560646511a44f5.jpg'
  // }
};
