import {Component, OnDestroy, OnInit} from '@angular/core';
import { UserService } from '../../../root/services/user.service';
import {Subject} from 'rxjs';
import {IUser} from '../../../root/interfaces/user.interface';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  user: IUser;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(user => {
        this.user = user;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
