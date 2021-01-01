import moduleMetadata from '../../moduleMetadata.helper';
import {IconMessageComponent} from './icon-message.component';

export default { title: 'Icon Message' };

export const error = () => ({
  moduleMetadata,
  component: IconMessageComponent,
  props: {
    type: 'error',
    text: 'Passwords are not equal!',
  }
});

export const confirmation = () => ({
  moduleMetadata,
  component: IconMessageComponent,
  props: {
    type: 'confirmation',
    text: 'Passwords are equal!',
  }
});

export const noTypeAndCustomIcon = () => ({
  moduleMetadata,
  component: IconMessageComponent,
  props: {
    text: 'App has been downloaded!',
    icon: 'get_app',
  }
});

export const customColorAndIcon = () => ({
  moduleMetadata,
  component: IconMessageComponent,
  props: {
    text: 'App has been downloaded!',
    icon: 'get_app',
    color: 'blue',
  }
});
