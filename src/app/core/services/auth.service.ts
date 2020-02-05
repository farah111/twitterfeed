import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AUTH} from '../../../apiMap';
import {environment} from '../../../environments/environment';
import {UserCredentials} from '../models/user-credentials';
import {catchError, map, tap} from 'rxjs/operators';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(protected http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
  }

  login(credentials: UserCredentials) {
    const httpParams = new HttpParams().set('key', environment.key);
    const body = {
      email: credentials.email,
      password: credentials.password,
      returnSecureToken: true
    };
    return this.http.post(AUTH, body, {
      params: httpParams
    }).pipe(
      map(userData => {
        return {
          authdata: userData['idToken'],
          email: userData['email']
        };
      }),
      tap( (user: any) => {
        this.currentUserSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        }
      )
    );
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.clear();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
}
