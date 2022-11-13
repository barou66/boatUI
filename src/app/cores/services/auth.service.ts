import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { CURRENT_USER, TOKEN } from './constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CacheService } from './cache.service';
import { Injectable } from '@angular/core';
import { JwtResponse } from 'src/api/model/models';
import { LOGIN } from '../routes.const';
import { NavigationService } from './navigation.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>;
  readonly currentUser$: BehaviorSubject<JwtResponse>;
  login(email: string, password: string): Observable<JwtResponse>;
  logout(): void;
  getToken(): string
}

export interface IAuthStatus {
  isAuthenticated: boolean;
  role: JwtResponse.RoleEnum
}

export interface IServerAuthResponse {
  accessToken: string;
}

export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  role: JwtResponse.RoleEnum.Admin,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService extends CacheService implements IAuthService {
  authStatus$ = new BehaviorSubject<IAuthStatus>(defaultAuthStatus);
  currentUser$ = new BehaviorSubject<JwtResponse>({ username:'',role:'ADMIN',token:''});

  constructor(private http: HttpClient,private navigationService: NavigationService,) {
    super();
  }
  getToken(): string {
    const token = this.getItem<string>(TOKEN);
    return (token !== null) ? token : "";
  }

  login(name: string, password: string): Observable<JwtResponse> {
    const authData = btoa(`${name}:${password}`);
    const headers = new HttpHeaders().append(
      'Authorization',
      'Basic ' + authData
    );
    const loginResponse$ = this.http
      .get<JwtResponse>(environment.baseUrl + '/api/v1/basicAuth/JwtResponse', {
        headers: headers
      })
      .pipe(
        map((value) => {
          this.currentUser$.next(value);
          this.setItem(CURRENT_USER, value);
          this.setItem(TOKEN, value.token);
          return value;
        })
      );

    loginResponse$.subscribe({
      error: (err) => {
        this.logout();
        return throwError(()=>err);
      },
    });

    return loginResponse$;
  }

  checkIfAlreadyAuthenticated() {
    let user = this.getItem<JwtResponse>(CURRENT_USER);
    if (user != null) {
      this.authStatus$.next({
        isAuthenticated: true,
        role: user.role,
      });
    }
  }

  logout() {
    setTimeout(() => {
      this.clear();
      this.authStatus$.next(defaultAuthStatus);
      this.navigationService.routeToPath(LOGIN);
    }, 0);
  }

  getRole(): JwtResponse.RoleEnum {
    let user = this.getItem<JwtResponse>(CURRENT_USER);
    return (user) ? user.role : 'ADMIN';
  }
}
