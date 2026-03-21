import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from './user';

interface AuthResponse {
  token: string;
}

interface SignUpCredentials {
  name: string;
  password: string;
  email: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private router = inject(Router);
  private userService = inject(User);
  private readonly TOKEN_KEY = 'auth_token';
  private readonly API_URL = 'http://localhost:3000/api/auth';

  currentUserToken = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));

  isAuthenticated = signal<boolean>(!!this.currentUserToken());

  signUp(credentials: SignUpCredentials) {
    return this.http.post<AuthResponse>(`${this.API_URL}/sign-up`, credentials).pipe(
      tap((response) => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        this.currentUserToken.set(response.token);
        this.userService.fetchUser();
      }),
    );
  }

  signIn(credentials: SignInCredentials) {
    return this.http.post<AuthResponse>(`${this.API_URL}/sign-in`, credentials).pipe(
      tap((response) => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        this.currentUserToken.set(response.token);
        this.userService.fetchUser();
      }),
    );
  }

  signOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserToken.set(null);
    this.userService.clearUser();
    this.router.navigate(['/']);
  }

  checkAutoSignIn(): boolean {
      const token = localStorage.getItem(this.TOKEN_KEY);
      if (token) {
        this.currentUserToken.set(token);
        this.isAuthenticated.set(true);
        return true;
      }
      return false;
    }
}
