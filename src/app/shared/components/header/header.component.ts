import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '../../../root/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() user: IUser;

  constructor() { }

  ngOnInit(): void {
  }

}
