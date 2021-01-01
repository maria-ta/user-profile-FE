import { fakeAsync, TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { initialAppState } from '../store/state/app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import * as moment from 'moment';

import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { removeToken, setToken } from '../store/actions/token.actions';
import { IUserStringDate } from '../interfaces/user.interface';
import { removeUser, setUser } from '../store/actions/user.actions';
import { Router } from '@angular/router';

const loginUrl = `${environment.server}authenticate`;
const logoutUrl = `${environment.server}api/user/logout`;
const currentUserUrl = `${environment.server}api/user/current`;
const userApiUrl = `${environment.server}api/user`;

const userStringDate: IUserStringDate = {
  id: '1',
  username: 'username',
  email: 'email',
  firstname: 'firstname',
  lastname: 'lastname',
  birthdate: '1990-01-01',
};

describe('LoginService', () => {
  let service: LoginService;

  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  let store: MockStore;
  const initialState = initialAppState;

  let routerMock: any;

  beforeEach(() => {

    routerMock = {
      navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve({}))
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useValue: routerMock }
      ]
    });
    service = TestBed.inject(LoginService);
    store = TestBed.inject(MockStore);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    const username = 'username';
    const password = 'password';
    const token = 'token';

    describe('request token', () => {
      it('should make POST request', fakeAsync(() => {
        service.login(username, password).subscribe(() => {});

        const tokenReq = httpMock.expectOne(loginUrl);
        tokenReq.flush({ token });

        const userReq = httpMock.expectOne(currentUserUrl);
        userReq.flush(userStringDate);

        expect(tokenReq.request.method).toBe('POST');
      }));

      it('should make request with proper params', fakeAsync(() => {
        service.login(username, password).subscribe(() => {});

        const tokenReq = httpMock.expectOne(loginUrl);
        tokenReq.flush({ token });

        const userReq = httpMock.expectOne(currentUserUrl);
        userReq.flush(userStringDate);

        expect(tokenReq.request.body).toEqual({ username, password });
      }));
    });

    it('should set received token to store', fakeAsync(() => {
      const dispatchSpy = spyOn(store, 'dispatch');

      service.login(username, password).subscribe(() => {

        expect(dispatchSpy).toHaveBeenCalledWith(setToken({ token }));
      });

      const tokenReq = httpMock.expectOne(loginUrl);
      tokenReq.flush({ token });

      const userReq = httpMock.expectOne(currentUserUrl);
      userReq.flush(userStringDate);
    }));

    it('should set received token to local storage', fakeAsync(() => {
      const storageSpy = spyOn((service as any).localStorage, 'setItem');

      service.login(username, password).subscribe(() => {

        expect(storageSpy).toHaveBeenCalledWith('token', token);
      });

      const tokenReq = httpMock.expectOne(loginUrl);
      tokenReq.flush({ token });

      const userReq = httpMock.expectOne(currentUserUrl);
      userReq.flush(userStringDate);
    }));

    describe('request user data', () => {
      it('should make GET request', fakeAsync(() => {
        service.login(username, password).subscribe(() => {});

        const tokenReq = httpMock.expectOne(loginUrl);
        tokenReq.flush({ token });

        const userReq = httpMock.expectOne(currentUserUrl);
        userReq.flush(userStringDate);

        expect(userReq.request.method).toBe('GET');
      }));
    });

    it('should set mapped user data to store', () => {
      const dispatchSpy = spyOn(store, 'dispatch');
      const expectedUserData = {
        ...userStringDate,
        birthdate: moment(userStringDate.birthdate)
      };

      service.login(username, password).subscribe(() => {

        expect(dispatchSpy).toHaveBeenCalledWith(setUser({ user: expectedUserData }));
      });

      const tokenReq = httpMock.expectOne(loginUrl);
      tokenReq.flush({ token });

      const userReq = httpMock.expectOne(currentUserUrl);
      userReq.flush(userStringDate);
    });
  });

  describe('logout', () => {
    it('should make GET request', fakeAsync(() => {
      service.logout().subscribe(() => {});

      const logoutReq = httpMock.expectOne(logoutUrl);
      logoutReq.flush({});

      expect(logoutReq.request.method).toBe('GET');
    }));

    it('should remove token from local storage', () => {
      const storageSpy = spyOn((service as any).localStorage, 'removeItem');
      service.logout().subscribe(() => {});

      const logoutReq = httpMock.expectOne(logoutUrl);
      logoutReq.flush({});

      expect(storageSpy).toHaveBeenCalledWith('token');
    });

    it('should remove token from store', () => {
      const dispatchSpy = spyOn(store, 'dispatch');
      service.logout().subscribe(() => {});

      const logoutReq = httpMock.expectOne(logoutUrl);
      logoutReq.flush({});

      expect(dispatchSpy).toHaveBeenCalledWith(removeToken());
    });

    it('should remove token from local storage', () => {
      const dispatchSpy = spyOn(store, 'dispatch');
      service.logout().subscribe(() => {});

      const logoutReq = httpMock.expectOne(logoutUrl);
      logoutReq.flush({});

      expect(dispatchSpy).toHaveBeenCalledWith(removeUser());
    });
  });

  describe('logoutLocal', () => {

    it('should remove token from local storage', () => {
      const storageSpy = spyOn((service as any).localStorage, 'removeItem');
      service.logoutLocal();

      expect(storageSpy).toHaveBeenCalledWith('token');
    });

    it('should remove token from store', () => {
      const dispatchSpy = spyOn(store, 'dispatch');
      service.logoutLocal();

      expect(dispatchSpy).toHaveBeenCalledWith(removeToken());
    });

    it('should remove token from local storage', () => {
      const dispatchSpy = spyOn(store, 'dispatch');
      service.logoutLocal();

      expect(dispatchSpy).toHaveBeenCalledWith(removeUser());
    });
  });
});
