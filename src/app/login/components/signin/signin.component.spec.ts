import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../../../root/services/login.service';
import * as moment from 'moment';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';

const USER_MOCK = {
  id: '1',
  username: 'username',
  email: 'email',
  firstname: 'firstname',
  lastname: 'lastname',
  birthdate: moment('1990-01-01')
};

const VALID_FORM_VALUE = {
  username: 'username',
  password: 'password'
};

const INVALID_FORM_VALUE = {
  username: null,
  password: null
};

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  let routerMock: Partial<Router>;
  let loginServiceMock: any;

  beforeEach(async(() => {
    loginServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(of(USER_MOCK))
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve())
    };

    TestBed.configureTestingModule({
      declarations: [ SigninComponent ],
      imports: [
        SharedModule,
        MatCardModule,
      ],
      providers: [
        FormBuilder,
        { provide: LoginService, useValue: loginServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should init formData', () => {
      component.formData = null;

      component.ngOnInit();

      expect(component.formData as FormGroup).toBeTruthy();
    });
  });

  describe('onFormSubmit', () => {
    describe('if form is valid', () => {
      beforeEach(() => {
        component.formData.setValue(VALID_FORM_VALUE);
      });

      describe('if login was successful', () => {
        beforeEach(() => {
          loginServiceMock.login.and.returnValue(of(USER_MOCK));
        });

        it('should call login with username and password', fakeAsync(() => {
          component.onFormSubmit();
          expect(loginServiceMock.login)
            .toHaveBeenCalledWith(VALID_FORM_VALUE.username, VALID_FORM_VALUE.password);
        }));

        it('should redirect to personal profile', fakeAsync(() => {
          component.onFormSubmit();
          flushMicrotasks();
          expect(routerMock.navigate).toHaveBeenCalledWith(['profile']);
        }));
      });

      describe('if login was not successful', () => {
        beforeEach(() => {
          loginServiceMock.login.and.returnValue(throwError({ status: 404 }));
        });

        it('should set wrong data error if error status is 404', fakeAsync(() => {
          component.onFormSubmit();
          flushMicrotasks();

          expect(component.isWrongDataError).toBe(true);
        }));

        it('should set unknown error if error status is not 404', fakeAsync(() => {
          loginServiceMock.login.and.returnValue(throwError({ status: 500 }));
          component.onFormSubmit();
          flushMicrotasks();

          expect(component.isUnknownError).toBe(true);
        }));

        it('should not redirect to personal profile', fakeAsync(() => {
          component.onFormSubmit();
          flushMicrotasks();
          expect(routerMock.navigate).not.toHaveBeenCalled();
        }));
      });
    });

    describe('if form is invalid', () => {
      beforeEach(() => {
        component.formData.setValue(INVALID_FORM_VALUE);
      });

      it('should not call login with username and password', fakeAsync(() => {
        component.onFormSubmit();
        expect(loginServiceMock.login).not.toHaveBeenCalled();
      }));

      it('should set format error message', fakeAsync(() => {
        component.onFormSubmit();
        expect(component.isFormatError).toBe(true);
      }));
    });
  });
});
