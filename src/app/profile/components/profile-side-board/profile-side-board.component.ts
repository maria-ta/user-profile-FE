import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../../root/interfaces/user.interface';
import { LoginService } from '../../../root/services/login.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-side-board',
  templateUrl: './profile-side-board.component.html',
  styleUrls: ['./profile-side-board.component.scss']
})
export class ProfileSideBoardComponent implements OnDestroy {
  @Input() user: IUser;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  logout(): void {
    this.loginService.logout()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.router.navigate(['login']);
      });
  }

}
