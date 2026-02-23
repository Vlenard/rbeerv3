import { computed, Injectable, signal } from '@angular/core';
import { authClient } from '../core/better-auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // --- STATE ---
  private _user = signal<any | null>(null);
  private _loading = signal<boolean>(false);

  user = computed(() => this._user());
  isAuthenticated = computed(() => !!this._user());
  isLoading = computed(() => this._loading());

  constructor() {
    this.loadSession();
  }

  // --- SESSION ---
  async loadSession(): Promise<void> {
    try {
      this._loading.set(true);

      const session = await authClient.getSession();

      this._user.set(session?.data?.user ?? null);
    } catch (error) {
      console.error('Session load error:', error);
      this._user.set(null);
    } finally {
      this._loading.set(false);
    }
  }

  // --- REGISTER ---
  async sign_up(email: string, password: string): Promise<void> {
    try {
      this._loading.set(true);

      await authClient.signUp.email({
        email,
        password,
        name: ''
      });

      await this.loadSession();
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      this._loading.set(false);
    }
  }

  // --- LOGIN ---
  async sign_in(email: string, password: string): Promise<void> {
    try {
      this._loading.set(true);

      await authClient.signIn.email({
        email,
        password,
      });

      await this.loadSession();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      this._loading.set(false);
    }
  }

  // --- LOGOUT ---
  async sign_out(): Promise<void> {
    try {
      this._loading.set(true);

      await authClient.signOut();

      this._user.set(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      this._loading.set(false);
    }
  }
}
