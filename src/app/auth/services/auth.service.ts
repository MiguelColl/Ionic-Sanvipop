import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Observable, catchError, from, map, of, switchMap } from 'rxjs';
import { ExternalLogin, UserLogin, UserRegister } from '../interfaces/auth';
import { User } from 'src/app/profile/interfaces/user';
import { TokenResponse } from '../interfaces/responses';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #logged = signal(false);
  #userUrl = 'auth';
  #http = inject(HttpClient);

  get logged() {
    return this.#logged.asReadonly();
  }

  login(
    user: UserLogin
    //firebaseToken?: string // For push notifications
  ): Observable<void> {
    return this.#http.post<TokenResponse>(`${this.#userUrl}/login`, user).pipe(
      // SwitchMap allows to return a value inside an Observable or a Promise (this case -> async)
      switchMap(async (r) => {
        try {
          await Preferences.set({ key: 'fs-token', value: r.accessToken });
          this.#logged.set(true);
        } catch (e) {
          throw new Error("Can't save authentication token in storage!");
        }
      })
    );
  }

  googleLogin(
    data: ExternalLogin
    //firebaseToken?: string // For push notifications
  ): Observable<void> {
    return this.#http.post<TokenResponse>(`${this.#userUrl}/google`, data).pipe(
      // SwitchMap allows to return a value inside an Observable or a Promise (this case -> async)
      switchMap(async (r) => {
        try {
          await Preferences.set({ key: 'fs-token', value: r.accessToken });
          this.#logged.set(true);
        } catch (e) {
          throw new Error("Can't save authentication token in storage!");
        }
      })
    );
  }

  facebookLogin(
    data: ExternalLogin
    //firebaseToken?: string // For push notifications
  ): Observable<void> {
    return this.#http.post<TokenResponse>(`${this.#userUrl}/facebook`, data).pipe(
      // SwitchMap allows to return a value inside an Observable or a Promise (this case -> async)
      switchMap(async (r) => {
        try {
          await Preferences.set({ key: 'fs-token', value: r.accessToken });
          this.#logged.set(true);
        } catch (e) {
          throw new Error("Can't save authentication token in storage!");
        }
      })
    );
  }

  register(user: UserRegister): Observable<void> {
    return this.#http.post<void>(`${this.#userUrl}/register`, user);
  }

  async logout(): Promise<void> {
    await Preferences.remove({ key: 'fs-token' });
    this.#logged.set(false);
  }

  isLogged(): Observable<boolean> {
    if (this.#logged()) {
      // User is logged
      return of(true);
    }
    // from transforms a Promise into an Observable
    return from(Preferences.get({ key: 'fs-token' })).pipe(
      switchMap((token) => {
        if (!token.value) {
          // No token
          return of(false);
        }

        return this.#http.get(`${this.#userUrl}/validate`).pipe(
          map(() => {
            this.#logged.set(true);
            return true;
          }),
          catchError(() => of(false)) // Token not valid!
        );
      }),
      catchError(() => of(false)) // No value in Preferences
    );
  }

  // TODO: CAMBIAR A PROFILE SERVICE
  getProfile(): Observable<User> {
    return this.#http.get<User>('users/me').pipe(map((user) => user));
  }
}
