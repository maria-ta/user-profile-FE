import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from './root/services/login.service';
import {Subject} from 'rxjs';
import {catchError, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'user-profile';

  isLoaded = false;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const token = this.loginService.getTokenFromLocalStorage();

    if (token) {
      this.loginService.loginWithToken(token)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(() => {
          this.isLoaded = true;
        }, () => {
          this.loginService.logoutLocal();
          this.isLoaded = true;
        });
    } else {
      this.isLoaded = true;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
