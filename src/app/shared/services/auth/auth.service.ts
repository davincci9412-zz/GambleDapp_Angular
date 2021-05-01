import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, EMPTY } from 'rxjs';
import { tap, pluck } from 'rxjs/operators';

import { User } from '@app/shared/interfaces';

import { TokenStorage } from './token.storage';

interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {}
/*
  login(email: string, password: string): Observable<User> {
    return this.http
      .post<AuthResponse>('/api/auth/login', { email, password })
      .pipe(
        tap(({ token, user }) => {
          this.setUser(user);
          this.tokenStorage.saveToken(token);
        }),
        pluck('user')
      );
  }

  register(
    fullname: string,
    email: string,
    password: string,
    repeatPassword: string
  ): Observable<User> {
    return this.http
      .post<AuthResponse>('/api/auth/register', {
        fullname,
        email,
        password,
        repeatPassword,
      })
      .pipe(
        tap(({ token, user }) => {
          this.setUser(user);
          this.tokenStorage.saveToken(token);
        }),
        pluck('user')
      );
  }
  setUser(user: User | null): void {
    if (user) {
      user.isAdmin = user.roles.includes('admin');
    }

    this.user$.next(user);
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  me(): Observable<User> {
    const token: string | null = this.tokenStorage.getToken();

    if (token === null) {
      return EMPTY;
    }

    return this.http.get<AuthResponse>('/api/auth/me').pipe(
      tap(({ user }) => this.setUser(user)),
      pluck('user')
    );
  }

  signOut(): void {
    this.tokenStorage.signOut();
    this.setUser(null);
  }

  getAuthorizationHeaders() {
    const token: string | null = this.tokenStorage.getToken() || '';
    return { Authorization: `Bearer ${token}` };
  }

  //Let's try to get user's information if he was logged in previously, thus we can ensure that the user is able to access the `/` (home) page.

  checkTheUserOnTheFirstLoad(): Promise<User> {
    return this.me().toPromise();
  }
*/

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<AuthResponse>('/api/auth/login', { email, password })
      .pipe(
        tap(({ token , user}) => {
          
          //this.tokenStorage.saveToken(token);          
          this.setUser(user);
        }),
        pluck('user')
      );
  }

  signOut(): void {
    this.tokenStorage.signOut();
    this.setUser(null);
    sessionStorage.setItem('_id', '')
    sessionStorage.setItem('fullname', '')
    sessionStorage.setItem('email', '')
    sessionStorage.setItem('roles', '')
    sessionStorage.setItem('user', '') 
    localStorage.setItem('currentUser', '');
    localStorage.setItem('rememberCurrentUser', 'false');  
    
    sessionStorage.setItem('address','');
    sessionStorage.setItem('chainID','');
    sessionStorage.setItem('hash','');
    
    //this.router.navigateByUrl('/auth/login');
  }

  register(fullname: string, email: string, password: string): Observable<User> {
    return this.http
      .post<AuthResponse>('/api/auth/register', {
        fullname,
        email,
        password
      })
      .pipe(
        tap(({token, user }) => {
          //this.tokenStorage.saveToken(token);
        }),
        pluck('user')
      );
  }

  forgot(email: string): Observable<User> {
    return this.http
      .post<AuthResponse>('/api/auth/forgot', { email})
      .pipe(
        tap(({ token , user}) => {
          
          //this.tokenStorage.saveToken(token);          
          this.setUser(user);
        }),
        pluck('user')
      );
  }

  setting(password: string, _id:string): Observable<User> {
    return this.http
      .post<AuthResponse>('/api/auth/setting', { password, _id})
      .pipe(
        tap(({ token , user}) => {
          //this.tokenStorage.saveToken(token);          
          this.setUser(user);
        }),
        pluck('user')
      );
  }

  metaUserProfile(username: string, bio: string, email: string, address:string, hash:string, signStatus:string): Observable<User> {
    return this.http
      .post<AuthResponse>('/api/auth/metaUserProfile', {
        username,
        bio,
        email,
        address,
        hash,
        signStatus
      })
      .pipe(
        tap(({token, user }) => {
          
          //this.tokenStorage.saveToken(token);
          this.setUser(user);
        }),
        pluck('user')
      );
  }

  userProfile(email: string, address:string): Observable<User> {
    return this.http
      .post<AuthResponse>('/api/auth/userProfile', {
        email,
        address,
      })
      .pipe(
        tap(({token, user }) => {
          
          //this.tokenStorage.saveToken(token);
          this.setUser(user);
        }),
        pluck('user')
      );
  }

  metaUserNotification(email:string, address:string, item: string, bid: string, price: string, auction:string, outbid:string, referral:string, asset:string, purchase:string, newsletter:string, ethvalue:string, exchange:string): Observable<User> {
    return this.http
      .post<AuthResponse>('/api/auth/metaUserNotification', {
        email,
        address,
        item,
        bid,
        price,
        auction,
        outbid,
        referral,
        asset,
        purchase,
        newsletter,
        ethvalue,
        exchange
      })
      .pipe(
        tap(({token, user }) => {
          
          //this.tokenStorage.saveToken(token);
          this.setUser(user);
        }),
        pluck('user')
      );
  }

  general(username: string, bio: string, email: string): Observable<User> {
    return this.http
      .post<AuthResponse>('/api/auth/register', {
        username,
        bio,
        email
      })
      .pipe(
        tap(({token, user }) => {
          //this.tokenStorage.saveToken(token);
        }),
        pluck('user')
      );
  }


  setUser(user: User | null): void {
    if (user && user.roles) {
      user.isAdmin = user.roles.includes('admin');
    }
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  me(): Observable<User> {
    const token: string | null = this.tokenStorage.getToken();

    if (token === null) {
      return EMPTY;
    }

    return this.http.get<AuthResponse>('/api/auth/me').pipe(
      tap(({ user }) => this.setUser(user)),
      pluck('user')
    );
  }

  

  getAuthorizationHeaders() {
    const token: string | null = this.tokenStorage.getToken() || '';
    return { Authorization: `Bearer ${token}` };
  }

  //Let's try to get user's information if he was logged in previously, thus we can ensure that the user is able to access the `/` (home) page.

  checkTheUserOnTheFirstLoad(): Promise<User> {
    return this.me().toPromise();
  }

}
