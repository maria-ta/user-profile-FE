import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LoginService } from '../../../root/services/login.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

const PASSWORD_MIN_LENGTH = 8;

interface SignUpData {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  formData: FormGroup;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) { }

  get passwordMismatch(): boolean {
    return this.formData.get(['passwords', 'password']).value !== this.formData.get(['passwords', 'confirmPassword']).value;
  }

  get passwordChanged(): boolean {
    return this.formData.get(['passwords', 'confirmPassword']).value != null;
  }

  ngOnInit(): void{
    this.initForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initForm(): void{
    this.formData = this.fb.group({
      username: [
        null,
        [ Validators.required, Validators.minLength(4) ],
      ],
      email: [
        null,
        [ Validators.required, Validators.email ],
      ],
      passwords: this.fb.group({
        password: [
          null,
          [ Validators.required ],
        ],
        confirmPassword: [
          null,
          [ Validators.required ],
        ],
      }, {
        validator: this.confirmPasswordsValidator,
      }),
    });
  }

  private confirmPasswordsValidator(control: AbstractControl): { invalid: boolean } {
    if (control.get('password').value !== control.get('confirmPassword').value) {
      return {invalid: true};
    }
  }

  onFormSubmit(): void {
    if (this.formData.valid) {
      this.loginService.createUser(
        this.formData.value.username,
        this.formData.value.email,
        this.formData.value.passwords.password
      )
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(() => {
          this.router.navigate(['profile']);
        });
    }
  }
}
