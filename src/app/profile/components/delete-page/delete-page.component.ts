import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginService } from '../../../root/services/login.service';

@Component({
  selector: 'app-delete-page',
  templateUrl: './delete-page.component.html',
  styleUrls: ['./delete-page.component.scss']
})
export class DeletePageComponent implements OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private loginService: LoginService
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  deleteProfile(): void {
    this.loginService.deleteUser()
  }
}
