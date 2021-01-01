import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {

  @Input() link: string;
  @Input() username = 'User';
  @Input() size = 2;

  get hasImage(): boolean {
    return !!this.link;
  }

  get stringSize(): string {
    return this.size + 'rem';
  }

}
