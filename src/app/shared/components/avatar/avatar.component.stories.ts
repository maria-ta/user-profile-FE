import moduleMetadata from '../../moduleMetadata.helper';
import {AvatarComponent} from './avatar.component';

export default { title: 'Avatar' };

export const withDefaultProps = () => ({
  moduleMetadata,
  component: AvatarComponent,
  props: {},
});

export const withImage = () => ({
  moduleMetadata,
  component: AvatarComponent,
  props: {
    link: 'https://i.pinimg.com/originals/5c/0f/43/5c0f4384660808280e5c4c4253d9b08c.png',
    size: '5'
  }
});

export const withUsername = () => ({
  moduleMetadata,
  component: AvatarComponent,
  props: {
    username: 'Mozart',
    size: '5',
  }
});
