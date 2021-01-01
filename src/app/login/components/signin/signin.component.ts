import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../root/services/login.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MessageType } from '../../../shared/components/icon-message/icon-message.component';

export interface SignInData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
  formData: FormGroup;

  isFormatError = false;
  isWrongDataError = false;
  isUnknownError = false;

  showErrorMessages = false;

  messagesType = MessageType.Error;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.formData.statusChanges
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.showErrorMessages = false;
        this.isFormatError = false;
        this.isWrongDataError = false;
        this.isUnknownError = false;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onFormSubmit(): void {
    this.formData.markAllAsTouched();
    this.showErrorMessages = true;

    if (this.formData.valid) {
      const value = this.formData.value;
      this.loginService.login(value.username, value.password)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(
          () => {
            this.router.navigate(['profile']);
          }, (error) => {
            if (error.status === 404) {
              this.isWrongDataError = true;
            } else {
              this.isUnknownError = true;
            }
            this.formData.markAsPristine();
          }
        );
    }
    else {
      this.isFormatError = true;
    }
  }

  private initForm(): void {
    this.formData = this.fb.group({
      username: [
        null,
        [ Validators.required ],
      ],
      password: [null],
    });
  }
}
