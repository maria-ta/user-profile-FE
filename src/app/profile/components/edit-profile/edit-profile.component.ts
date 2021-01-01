import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { IUser } from '../../../root/interfaces/user.interface';
import { UserService } from '../../../root/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { EGender } from '../../../root/enums/gender.enum';
import { LoginService } from '../../../root/services/login.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  user: IUser;
  formData: FormGroup;

  genderOptions = [
    {
      label: 'Female',
      value: EGender.F
    },
    {
      label: 'Male',
      value: EGender.M
    },
    {
      label: 'Other',
      value: EGender.O
    }
  ];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(user => {
        this.user = { ...user};
        if (user.birthdate) {
          this.user.birthdate = moment(user.birthdate.format('YYYY-MM-DD'));
        }
        this.formData = this.createForm();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onFormSubmit(): void {
    if (this.formData.valid) {
      this.loginService.updateUser(this.formData.value)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(user => {
          this.router.navigate(['profile']);
        });
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      username: [
        {
          value: this.user.username,
          disabled: true
        },
        [ Validators.required ]
      ],
      email: [
        this.user.email,
        [ Validators.required, Validators.email ]
      ],
      firstname: [
        this.user.firstname,
        [ ]
      ],
      lastname: [
        this.user.lastname,
        [ ]
      ],
      gender: [
        this.user.gender,
        [ ]
      ],
      birthdate: [
        // this.user.birthdate,
        // null,
        moment(),
        [ ]
      ],
      image: [
        this.user.image,
        [ ]
      ]
    });
  }

}
