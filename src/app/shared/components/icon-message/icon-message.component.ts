import { Component, Input } from '@angular/core';

export enum MessageType {
  Custom = 'custom',
  Error = 'error',
  Confirmation = 'confirmation',
}

export const IconType = {
  error: 'error',
  confirmation: 'check_circle',
};

@Component({
  selector: 'app-icon-message',
  templateUrl: './icon-message.component.html',
  styleUrls: ['./icon-message.component.scss']
})
export class IconMessageComponent {

  @Input() type: MessageType;
  @Input() text: string;
  @Input() icon: string;
  @Input() color: string;

  get isCustom(): boolean {
    return !this.type || this.type === MessageType.Custom;
  }

  getIcon(): string {
    return this.icon || IconType[this.type];
  }

}
