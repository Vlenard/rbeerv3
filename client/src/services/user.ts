import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class User {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/user';

  #user = signal<User | null>(null);

  readonly user = this.#user.asReadonly();

  fetchUser(): void {
    this.http.get<User>(this.apiUrl).subscribe({
      next: (userData) => {
        this.#user.set(userData);
      },
      error: (err) => {
        console.error('Failed to load user', err);
        this.#user.set(null);
      },
    });
  }

  updateUser(updateData: Partial<User>): void {
    this.http.patch<User>(`${this.apiUrl}/update`, updateData).subscribe({
      next: (updatedUser) => {
        this.#user.set(updatedUser);
      },
      error: (err) => console.error('Update failed', err),
    });
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.http.delete(`${this.apiUrl}/delete`).subscribe({
        next: () => {
          this.#user.set(null);
        },
        error: (err) => console.error('Delete failed', err),
      });
    }
  }

  clearUser(): void {
    this.#user.set(null);
    console.log("User cleared");
  }
}
